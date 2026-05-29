"use client";

import { SurveyData } from "@/types/survey";
import { CAREER_INTENTION_OPTIONS } from "@/constants/options";
import RadioGroup from "@/components/fields/RadioGroup";

interface Section6Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
  errors: Record<string, string>;
}

export default function Section6({ data, onChange, errors }: Section6Props) {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup
        id="career-intention"
        label="Com o que você pretende trabalhar ao se formar em Engenharia de Software?"
        value={data.careerIntention}
        onChange={(v) => onChange({ careerIntention: v })}
        options={CAREER_INTENTION_OPTIONS}
        error={errors.careerIntention}
      />
    </div>
  );
}
