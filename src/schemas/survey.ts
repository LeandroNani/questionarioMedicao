import { z } from "zod/v4";

export const section1Schema = z.object({
  entryYear: z.number({ error: "Selecione o ano de entrada" }),
  entrySemester: z.number({ error: "Selecione o semestre" }),
  shift: z.string().min(1, "Selecione o turno"),
  currentPeriod: z.number({ error: "Selecione o período" }),
  academicStatus: z.string().min(1, "Selecione a situação acadêmica"),
});

export const section2Schema = z.object({
  hardestSubjects: z.array(z.string()).max(3),
  leastInterestingSubjects: z.array(z.string()).max(3),
  mostRelevantSubjects: z.array(z.string()).max(3),
});

export const section3Schema = z.object({
  aiTool: z.string().min(1, "Selecione uma opção"),
  aiToolOther: z.string(),
  mainLanguage: z.string().min(1, "Selecione uma linguagem"),
  mainLanguageOther: z.string(),
  comfortableLanguages: z.array(z.string()),
  comfortableLanguagesOther: z.string(),
}).refine(
  (d) => d.aiTool !== "Outra" || d.aiToolOther.trim().length > 0,
  { message: "Especifique qual IA", path: ["aiToolOther"] },
).refine(
  (d) => d.mainLanguage !== "Outra" || d.mainLanguageOther.trim().length > 0,
  { message: "Especifique qual linguagem", path: ["mainLanguageOther"] },
);

export const section4Schema = z.object({
  professionalLevel: z.string().min(1, "Selecione o nível profissional"),
  professionalLevelOther: z.string(),
  workArea: z.string(),
  workAreaOther: z.string(),
  timeInTech: z.string().min(1, "Selecione o tempo na área"),
  timeWorkingGeneral: z.string().min(1, "Selecione o tempo de trabalho"),
  companySize: z.string(),
}).refine(
  (d) => d.professionalLevel !== "Outro" || d.professionalLevelOther.trim().length > 0,
  { message: "Especifique o nível", path: ["professionalLevelOther"] },
).refine(
  (d) => d.professionalLevel === "Não trabalho na área" || d.workArea.length > 0,
  { message: "Selecione a área de atuação", path: ["workArea"] },
).refine(
  (d) => d.workArea !== "Outra" || d.workAreaOther.trim().length > 0,
  { message: "Especifique a área", path: ["workAreaOther"] },
).refine(
  (d) => d.professionalLevel === "Não trabalho na área" || d.companySize.length > 0,
  { message: "Selecione o porte da empresa", path: ["companySize"] },
);

export const section5Schema = z.object({
  salaryAfterGraduation: z.string().min(1, "Selecione uma faixa"),
  salary5Years: z.string().min(1, "Selecione uma faixa"),
  salary10Years: z.string().min(1, "Selecione uma faixa"),
});

export const section6Schema = z.object({
  careerIntention: z.string().min(1, "Selecione uma opção"),
});

export const sectionSchemas = [
  section1Schema,
  section2Schema,
  section3Schema,
  section4Schema,
  section5Schema,
  section6Schema,
] as const;
