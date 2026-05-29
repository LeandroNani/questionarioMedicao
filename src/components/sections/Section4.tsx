"use client";

import { SurveyData } from "@/types/survey";
import {
  PROFESSIONAL_LEVEL_OPTIONS,
  WORK_AREA_FLAT_OPTIONS,
  TIME_OPTIONS,
  COMPANY_SIZE_OPTIONS,
} from "@/constants/options";
import RadioGroup from "@/components/fields/RadioGroup";
import TextInput from "@/components/fields/TextInput";
import ConditionalField from "@/components/fields/ConditionalField";

interface Section4Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
  errors: Record<string, string>;
}

export default function Section4({ data, onChange, errors }: Section4Props) {
  const worksInArea = data.professionalLevel !== "Não trabalho na área";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <RadioGroup
          id="professional-level"
          label="Qual é o seu nível profissional atual na área de tecnologia?"
          value={data.professionalLevel}
          onChange={(v) => {
            const updates: Partial<SurveyData> = {
              professionalLevel: v,
              professionalLevelOther: v === "Outro" ? data.professionalLevelOther : "",
            };
            if (v === "Não trabalho na área") {
              updates.workArea = "";
              updates.workAreaOther = "";
              updates.companySize = "";
            }
            onChange(updates);
          }}
          options={PROFESSIONAL_LEVEL_OPTIONS}
          error={errors.professionalLevel}
        />
        <ConditionalField visible={data.professionalLevel === "Outro"}>
          <TextInput
            id="professional-level-other"
            label="Qual nível?"
            value={data.professionalLevelOther}
            onChange={(v) => onChange({ professionalLevelOther: v })}
            placeholder="Descreva seu nível profissional..."
            error={errors.professionalLevelOther}
          />
        </ConditionalField>
      </div>

      <ConditionalField visible={worksInArea}>
        <RadioGroup
          id="work-area"
          label="Em qual área você atua atualmente?"
          value={data.workArea}
          onChange={(v) => {
            onChange({ workArea: v, workAreaOther: v === "Outra" ? data.workAreaOther : "" });
          }}
          options={WORK_AREA_FLAT_OPTIONS}
          error={errors.workArea}
        />
        <ConditionalField visible={data.workArea === "Outra"}>
          <TextInput
            id="work-area-other"
            label="Qual área?"
            value={data.workAreaOther}
            onChange={(v) => onChange({ workAreaOther: v })}
            placeholder="Descreva sua área de atuação..."
            error={errors.workAreaOther}
          />
        </ConditionalField>
      </ConditionalField>

      <RadioGroup
        id="time-in-tech"
        label="Há quanto tempo você trabalha na área de tecnologia / Engenharia de Software?"
        value={data.timeInTech}
        onChange={(v) => onChange({ timeInTech: v })}
        options={TIME_OPTIONS}
        error={errors.timeInTech}
      />

      <RadioGroup
        id="time-working-general"
        label="Há quanto tempo você trabalha de forma geral (em qualquer área)?"
        value={data.timeWorkingGeneral}
        onChange={(v) => onChange({ timeWorkingGeneral: v })}
        options={TIME_OPTIONS}
        error={errors.timeWorkingGeneral}
      />

      <ConditionalField visible={worksInArea}>
        <RadioGroup
          id="company-size"
          label="Qual é o porte da empresa onde você trabalha atualmente?"
          value={data.companySize}
          onChange={(v) => onChange({ companySize: v })}
          options={COMPANY_SIZE_OPTIONS}
          error={errors.companySize}
        />
      </ConditionalField>
    </div>
  );
}
