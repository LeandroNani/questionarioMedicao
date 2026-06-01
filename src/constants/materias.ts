import { CURRICULO_3, CURRICULO_4 } from "@/constants/curriculos";

const todasAsMaterias = new Set([
  ...Object.values(CURRICULO_3).flat(),
  ...Object.values(CURRICULO_4).flat(),
]);

export const MATERIAS: string[] = Array.from(todasAsMaterias).sort();
