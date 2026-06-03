"use client";

import { SurveyData } from "@/types/survey";
import {
  AI_TOOL_OPTIONS,
  LANGUAGE_OPTIONS,
  COMFORTABLE_LANGUAGE_OPTIONS,
  ENGLISH_LEVEL_OPTIONS,
} from "@/constants/options";
import RadioGroup from "@/components/fields/RadioGroup";
import CheckboxGroup from "@/components/fields/CheckboxGroup";
import TextInput from "@/components/fields/TextInput";
import ConditionalField from "@/components/fields/ConditionalField";

interface Section3Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
  errors: Record<string, string>;
}

export default function Section3({ data, onChange, errors }: Section3Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <RadioGroup
          id="ai-tool"
          label="Qual IA você mais utiliza no dia a dia?"
          value={data.aiTool}
          onChange={(v) => {
            onChange({ aiTool: v, aiToolOther: v === "Outra" ? data.aiToolOther : "" });
          }}
          options={AI_TOOL_OPTIONS}
          columns={2}
          required
          error={errors.aiTool}
        />
        <ConditionalField visible={data.aiTool === "Outra"}>
          <TextInput
            id="ai-tool-other"
            label="Qual IA?"
            value={data.aiToolOther}
            onChange={(v) => onChange({ aiToolOther: v })}
            placeholder="Digite o nome da IA..."
            error={errors.aiToolOther}
          />
        </ConditionalField>
      </div>

      <div className="flex flex-col gap-3">
        <RadioGroup
          id="main-language"
          label="Qual linguagem de programação você mais utiliza atualmente?"
          value={data.mainLanguage}
          onChange={(v) => {
            onChange({ mainLanguage: v, mainLanguageOther: v === "Outra" ? data.mainLanguageOther : "" });
          }}
          options={LANGUAGE_OPTIONS}
          columns={2}
          required
          error={errors.mainLanguage}
        />
        <ConditionalField visible={data.mainLanguage === "Outra"}>
          <TextInput
            id="main-language-other"
            label="Qual linguagem?"
            value={data.mainLanguageOther}
            onChange={(v) => onChange({ mainLanguageOther: v })}
            placeholder="Digite o nome da linguagem..."
            error={errors.mainLanguageOther}
          />
        </ConditionalField>
      </div>

      <div className="flex flex-col gap-3">
        <CheckboxGroup
          id="comfortable-languages"
          label="Com quais linguagens de programação você se sente confortável para trabalhar?"
          selected={data.comfortableLanguages}
          onChange={(v) => onChange({ comfortableLanguages: v })}
          options={COMFORTABLE_LANGUAGE_OPTIONS}
          columns={2}
          error={errors.comfortableLanguages}
        />
        <TextInput
          id="comfortable-languages-other"
          value={data.comfortableLanguagesOther}
          onChange={(v) => onChange({ comfortableLanguagesOther: v })}
          placeholder="Outras linguagens não listadas acima..."
        />
      </div>

      <RadioGroup
        id="english-level"
        label="Qual é o seu nível de inglês?"
        value={data.englishLevel}
        onChange={(v) => onChange({ englishLevel: v })}
        options={ENGLISH_LEVEL_OPTIONS}
        columns={2}
        required
        error={errors.englishLevel}
      />
    </div>
  );
}
