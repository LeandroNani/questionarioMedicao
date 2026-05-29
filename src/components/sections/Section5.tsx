"use client";

import { SurveyData } from "@/types/survey";
import { SALARY_OPTIONS } from "@/constants/options";
import RadioGroup from "@/components/fields/RadioGroup";
import InfoBox from "@/components/fields/InfoBox";

interface Section5Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
  errors: Record<string, string>;
}

export default function Section5({ data, onChange, errors }: Section5Props) {
  return (
    <div className="flex flex-col gap-8">
      <InfoBox>
        <em>
          As perguntas desta seção são sobre expectativas futuras, não sobre
          salário atual. Todas têm a opção &quot;Prefiro não responder&quot;.
        </em>
      </InfoBox>

      <RadioGroup
        id="salary-after-graduation"
        label="Quanto você espera ganhar logo após se formar? (Salário mensal bruto em R$)"
        value={data.salaryAfterGraduation}
        onChange={(v) => onChange({ salaryAfterGraduation: v })}
        options={SALARY_OPTIONS}
        error={errors.salaryAfterGraduation}
      />

      <RadioGroup
        id="salary-5-years"
        label="Quanto você espera ganhar 5 anos após se formar? (Salário mensal bruto em R$)"
        value={data.salary5Years}
        onChange={(v) => onChange({ salary5Years: v })}
        options={SALARY_OPTIONS}
        error={errors.salary5Years}
      />

      <RadioGroup
        id="salary-10-years"
        label="Quanto você espera ganhar 10 anos após se formar? (Salário mensal bruto em R$)"
        value={data.salary10Years}
        onChange={(v) => onChange({ salary10Years: v })}
        options={SALARY_OPTIONS}
        error={errors.salary10Years}
      />
    </div>
  );
}
