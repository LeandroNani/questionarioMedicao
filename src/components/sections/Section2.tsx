"use client";

import { useState } from "react";
import { SurveyData } from "@/types/survey";
import { MATERIAS } from "@/constants/materias";
import AutocompleteChips from "@/components/fields/AutocompleteChips";
import CurriculoModal from "@/components/CurriculoModal";

interface Section2Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
  errors: Record<string, string>;
}

function CurriculoLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 transition-colors cursor-pointer font-medium"
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
      Consultar grade curricular
    </button>
  );
}

export default function Section2({ data, onChange, errors }: Section2Props) {
  const [showCurriculo, setShowCurriculo] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <span className="text-sm font-medium text-slate-700">
            Quais foram as matérias mais difíceis que você cursou até agora? (Selecione até 3, em ordem)
          </span>
          <CurriculoLink onClick={() => setShowCurriculo(true)} />
        </div>
        <AutocompleteChips
          id="hardest-subjects"
          label=""
          options={MATERIAS}
          selected={data.hardestSubjects}
          onChange={(v) => onChange({ hardestSubjects: v })}
          error={errors.hardestSubjects}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <span className="text-sm font-medium text-slate-700">
            Quais matérias você considera menos interessantes de estudar? (Selecione até 3, em ordem - desconsidere matérias obrigatórias da PUC como Filosofia e Cultura Religiosa)
          </span>
          <CurriculoLink onClick={() => setShowCurriculo(true)} />
        </div>
        <AutocompleteChips
          id="least-interesting-subjects"
          label=""
          options={MATERIAS}
          selected={data.leastInterestingSubjects}
          onChange={(v) => onChange({ leastInterestingSubjects: v })}
          error={errors.leastInterestingSubjects}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <span className="text-sm font-medium text-slate-700">
            Quais matérias você considera mais relevantes E mais interessantes para sua formação? (Selecione até 3, em ordem)
          </span>
          <CurriculoLink onClick={() => setShowCurriculo(true)} />
        </div>
        <AutocompleteChips
          id="most-relevant-subjects"
          label=""
          options={MATERIAS}
          selected={data.mostRelevantSubjects}
          onChange={(v) => onChange({ mostRelevantSubjects: v })}
          error={errors.mostRelevantSubjects}
        />
      </div>

      <CurriculoModal
        open={showCurriculo}
        onClose={() => setShowCurriculo(false)}
      />
    </div>
  );
}
