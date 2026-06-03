"use client";

import { SurveyData, TOTAL_QUESTIONS, ESTIMATED_MINUTES } from "@/types/survey";
import { ENTRY_YEARS, SHIFT_OPTIONS, PERIOD_OPTIONS, ACADEMIC_STATUS_OPTIONS } from "@/constants/options";
import SelectField from "@/components/fields/SelectField";
import RadioGroup from "@/components/fields/RadioGroup";
import InfoBox from "@/components/fields/InfoBox";

interface Section1Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
  errors: Record<string, string>;
  isFirstView: boolean;
}

export default function Section1({ data, onChange, errors, isFirstView }: Section1Props) {
  return (
    <div className="flex flex-col gap-6">
      {isFirstView && (
        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
          <div className="flex items-center gap-3 text-sm text-blue-700">
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>{TOTAL_QUESTIONS} perguntas</strong> · Tempo estimado: <strong>~{ESTIMATED_MINUTES} minutos</strong>
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          id="entry-year"
          label="Ano de entrada"
          value={data.entryYear}
          onChange={(v) => onChange({ entryYear: Number(v) })}
          options={ENTRY_YEARS.map((y) => ({ label: String(y), value: y }))}
          placeholder="Ano"
          required
          error={errors.entryYear}
        />
        <SelectField
          id="current-period"
          label="Período mais próximo que você está"
          value={data.currentPeriod}
          onChange={(v) => onChange({ currentPeriod: Number(v) })}
          options={PERIOD_OPTIONS.map((p) => ({ label: `${p}º`, value: p }))}
          placeholder="Período"
          required
          error={errors.currentPeriod}
        />
      </div>

      <RadioGroup
        id="entry-semester"
        label="Semestre de entrada"
        value={data.entrySemester === 1 ? "1º Semestre" : data.entrySemester === 2 ? "2º Semestre" : ""}
        onChange={(v) => onChange({ entrySemester: v === "1º Semestre" ? 1 : 2 })}
        options={["1º Semestre", "2º Semestre"]}
        columns={2}
        required
        error={errors.entrySemester}
      />

      <RadioGroup
        id="shift"
        label="Turno atual"
        value={data.shift}
        onChange={(v) => onChange({ shift: v })}
        options={SHIFT_OPTIONS}
        columns={2}
        required
        error={errors.shift}
      />

      <div className="flex flex-col gap-3">
        <RadioGroup
          id="academic-status"
          label="Situação acadêmica"
          value={data.academicStatus}
          onChange={(v) => onChange({ academicStatus: v })}
          options={ACADEMIC_STATUS_OPTIONS}
          columns={2}
          required
          error={errors.academicStatus}
        />
        <InfoBox>
          <em>
            Você é considerado irregular se há disciplinas obrigatórias que
            deveriam ter sido concluídas até o semestre atual no seu fluxo
            curricular, mas que ainda não foram concluídas.
          </em>
        </InfoBox>
      </div>
    </div>
  );
}
