"use client";

import { SurveyData } from "@/types/survey";
import { MATERIAS } from "@/constants/materias";
import AutocompleteChips from "@/components/fields/AutocompleteChips";

interface Section2Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
  errors: Record<string, string>;
}

export default function Section2({ data, onChange, errors }: Section2Props) {
  return (
    <div className="flex flex-col gap-8">
      <AutocompleteChips
        id="hardest-subjects"
        label="Quais foram as matérias mais difíceis que você cursou até agora? (Selecione até 3, em ordem)"
        options={MATERIAS}
        selected={data.hardestSubjects}
        onChange={(v) => onChange({ hardestSubjects: v })}
        error={errors.hardestSubjects}
      />

      <AutocompleteChips
        id="least-interesting-subjects"
        label="Quais matérias você considera menos interessantes de estudar? (Selecione até 3, em ordem - desconsidere matérias obrigatórias da PUC como Filosofia e Cultura Religiosa)"
        options={MATERIAS}
        selected={data.leastInterestingSubjects}
        onChange={(v) => onChange({ leastInterestingSubjects: v })}
        error={errors.leastInterestingSubjects}
      />

      <AutocompleteChips
        id="most-relevant-subjects"
        label="Quais matérias você considera mais relevantes E mais interessantes para sua formação? (Selecione até 3, em ordem)"
        options={MATERIAS}
        selected={data.mostRelevantSubjects}
        onChange={(v) => onChange({ mostRelevantSubjects: v })}
        error={errors.mostRelevantSubjects}
      />
    </div>
  );
}
