export interface SurveyData {
  entryYear: number | null;
  entrySemester: number | null;
  shift: string;
  currentPeriod: number | null;
  academicStatus: string;

  hardestSubjects: string[];
  leastInterestingSubjects: string[];
  mostRelevantSubjects: string[];

  aiTool: string;
  aiToolOther: string;
  mainLanguage: string;
  mainLanguageOther: string;
  comfortableLanguages: string[];
  comfortableLanguagesOther: string;
  englishLevel: string;

  professionalLevel: string;
  professionalLevelOther: string;
  workArea: string;
  workAreaOther: string;
  timeInTech: string;
  timeWorkingGeneral: string;
  companySize: string;
  currentSalary: string;

  salaryAfterGraduation: string;
  salary5Years: string;
  salary10Years: string;

  careerIntention: string;
}

export const INITIAL_SURVEY_DATA: SurveyData = {
  entryYear: null,
  entrySemester: null,
  shift: "",
  currentPeriod: null,
  academicStatus: "",

  hardestSubjects: [],
  leastInterestingSubjects: [],
  mostRelevantSubjects: [],

  aiTool: "",
  aiToolOther: "",
  mainLanguage: "",
  mainLanguageOther: "",
  comfortableLanguages: [],
  comfortableLanguagesOther: "",
  englishLevel: "",

  professionalLevel: "",
  professionalLevelOther: "",
  workArea: "",
  workAreaOther: "",
  timeInTech: "",
  timeWorkingGeneral: "",
  companySize: "",
  currentSalary: "",

  salaryAfterGraduation: "",
  salary5Years: "",
  salary10Years: "",

  careerIntention: "",
};

export const SECTION_TITLES = [
  "Identificação do Respondente",
  "Avaliação das Disciplinas",
  "Ferramentas e Tecnologia",
  "Situação de Carreira",
  "Expectativas Salariais",
  "Planos e Carreira Futura",
] as const;

export const TOTAL_SECTIONS = SECTION_TITLES.length;
export const TOTAL_QUESTIONS = 21;
export const ESTIMATED_MINUTES = 6;
