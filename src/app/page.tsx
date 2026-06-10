"use client";

export const dynamic = "force-dynamic";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SurveyData, INITIAL_SURVEY_DATA, SECTION_TITLES } from "@/types/survey";
import { sectionSchemas } from "@/schemas/survey";
import { getSupabaseClient } from "@/lib/supabase";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import NavigationButtons from "@/components/NavigationButtons";
import SuccessScreen from "@/components/SuccessScreen";
import ConsentModal from "@/components/ConsentModal";
import Section1 from "@/components/sections/Section1";
import Section2 from "@/components/sections/Section2";
import Section3 from "@/components/sections/Section3";
import Section4 from "@/components/sections/Section4";
import Section5 from "@/components/sections/Section5";
import Section6 from "@/components/sections/Section6";

const SESSION_KEY = "survey_submitted";
const STORAGE_KEY = "survey_progress";
const CONSENT_KEY = "survey_consent";

function getSectionData(data: SurveyData, sectionIndex: number): Record<string, unknown> {
  switch (sectionIndex) {
    case 0:
      return {
        entryYear: data.entryYear,
        entrySemester: data.entrySemester,
        shift: data.shift,
        currentPeriod: data.currentPeriod,
        academicStatus: data.academicStatus,
      };
    case 1:
      return {
        hardestSubjects: data.hardestSubjects,
        leastInterestingSubjects: data.leastInterestingSubjects,
        mostRelevantSubjects: data.mostRelevantSubjects,
      };
    case 2:
      return {
        aiTool: data.aiTool,
        aiToolOther: data.aiToolOther,
        mainLanguages: data.mainLanguages,
        mainLanguageOther: data.mainLanguageOther,
        comfortableLanguages: data.comfortableLanguages,
        comfortableLanguagesOther: data.comfortableLanguagesOther,
        englishLevel: data.englishLevel,
      };
    case 3:
      return {
        professionalLevel: data.professionalLevel,
        professionalLevelOther: data.professionalLevelOther,
        workArea: data.workArea,
        workAreaOther: data.workAreaOther,
        timeInTech: data.timeInTech,
        timeWorkingGeneral: data.timeWorkingGeneral,
        companySize: data.companySize,
        currentSalary: data.currentSalary,
      };
    case 4:
      return {
        salaryAfterGraduation: data.salaryAfterGraduation,
        salary5Years: data.salary5Years,
        salary10Years: data.salary10Years,
      };
    case 5:
      return {
        careerIntention: data.careerIntention,
      };
    default:
      return {};
  }
}

function buildPayload(data: SurveyData) {
  return {
    entry_year: data.entryYear,
    entry_semester: data.entrySemester,
    shift: data.shift,
    current_period: data.currentPeriod,
    academic_status: data.academicStatus,

    hardest_subject_1: data.hardestSubjects[0] ?? null,
    hardest_subject_2: data.hardestSubjects[1] ?? null,
    hardest_subject_3: data.hardestSubjects[2] ?? null,
    least_interesting_subject_1: data.leastInterestingSubjects[0] ?? null,
    least_interesting_subject_2: data.leastInterestingSubjects[1] ?? null,
    least_interesting_subject_3: data.leastInterestingSubjects[2] ?? null,
    most_relevant_subject_1: data.mostRelevantSubjects[0] ?? null,
    most_relevant_subject_2: data.mostRelevantSubjects[1] ?? null,
    most_relevant_subject_3: data.mostRelevantSubjects[2] ?? null,

    ai_tool: data.aiTool,
    ai_tool_other: data.aiTool === "Outra" ? data.aiToolOther : null,
    main_language: data.mainLanguages[0] ?? null,
    main_language_other: data.mainLanguages.includes("Outra") ? data.mainLanguageOther : null,
    main_languages: data.mainLanguages,
    comfortable_languages: data.comfortableLanguages,
    comfortable_languages_other: data.comfortableLanguagesOther || null,
    english_level: data.englishLevel,

    professional_level: data.professionalLevel,
    professional_level_other: data.professionalLevel === "Outro" ? data.professionalLevelOther : null,
    work_area: data.professionalLevel !== "Não trabalho na área" ? data.workArea : null,
    work_area_other: data.workArea === "Outra" ? data.workAreaOther : null,
    time_in_tech: data.timeInTech,
    time_working_general: data.timeWorkingGeneral,
    company_size: data.professionalLevel !== "Não trabalho na área" ? data.companySize : null,
    current_salary: data.professionalLevel !== "Não trabalho na área" ? (data.currentSalary || null) : null,

    salary_after_graduation: data.salaryAfterGraduation,
    salary_5_years: data.salary5Years,
    salary_10_years: data.salary10Years,

    career_intention: data.careerIntention,
  };
}

export default function SurveyPage() {
  const [data, setData] = useState<SurveyData>(() => {
    if (typeof window === "undefined") return INITIAL_SURVEY_DATA;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...INITIAL_SURVEY_DATA, ...JSON.parse(saved) };
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return INITIAL_SURVEY_DATA;
  });
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "true"
  );
  const [direction, setDirection] = useState(1);
  const [consentGiven, setConsentGiven] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem(CONSENT_KEY) === "true"
  );

  const handleConsent = () => {
    sessionStorage.setItem(CONSENT_KEY, "true");
    setConsentGiven(true);
  };

  const updateData = useCallback((updates: Partial<SurveyData>) => {
    setData((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch { /* quota exceeded — ignore */ }
      return next;
    });
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(updates).forEach((key) => delete next[key]);
      return next;
    });
  }, []);

  const validateCurrentSection = (): boolean => {
    const schema = sectionSchemas[currentSection];
    const sectionData = getSectionData(data, currentSection);
    const result = schema.safeParse(sectionData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const isSectionValid = (): boolean => {
    const schema = sectionSchemas[currentSection];
    const sectionData = getSectionData(data, currentSection);
    return schema.safeParse(sectionData).success;
  };

  const handleNext = () => {
    if (validateCurrentSection()) {
      setDirection(1);
      setCurrentSection((prev) => Math.min(prev + 1, SECTION_TITLES.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setErrors({});
    setDirection(-1);
    setCurrentSection((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateCurrentSection()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = buildPayload(data);
      const { error } = await getSupabaseClient().from("respostas").insert(payload);

      if (error) throw error;

      sessionStorage.setItem(SESSION_KEY, "true");
      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } catch (err) {
      console.error("Erro ao enviar:", err);
      setSubmitError(
        "Ocorreu um erro ao enviar suas respostas. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex flex-1 flex-col">
          <SuccessScreen />
        </main>
      </>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <>
      {!consentGiven && <ConsentModal onAccept={handleConsent} />}
      <div className={!consentGiven ? "pointer-events-none select-none" : undefined}>
      <Header />
      <ProgressBar currentSection={currentSection} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSection}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 text-lg font-semibold text-slate-800">
                {SECTION_TITLES[currentSection]}
              </h2>

              {currentSection === 0 && (
                <Section1 data={data} onChange={updateData} errors={errors} isFirstView={true} />
              )}
              {currentSection === 1 && (
                <Section2 data={data} onChange={updateData} errors={errors} />
              )}
              {currentSection === 2 && (
                <Section3 data={data} onChange={updateData} errors={errors} />
              )}
              {currentSection === 3 && (
                <Section4 data={data} onChange={updateData} errors={errors} />
              )}
              {currentSection === 4 && (
                <Section5 data={data} onChange={updateData} errors={errors} />
              )}
              {currentSection === 5 && (
                <Section6 data={data} onChange={updateData} errors={errors} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {submitError}
            </div>
          </motion.div>
        )}

        <NavigationButtons
          currentSection={currentSection}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          canAdvance={isSectionValid()}
        />

        <div className="mt-6 pb-8 text-center text-xs text-slate-400">
          Suas respostas são 100% anônimas
        </div>
      </main>
      </div>
    </>
  );
}
