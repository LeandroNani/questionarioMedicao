export const ENTRY_YEARS = Array.from({ length: 11 }, (_, i) => 2016 + i);

export const SHIFT_OPTIONS = ["Manhã", "Noite"] as const;

export const PERIOD_OPTIONS = Array.from({ length: 8 }, (_, i) => i + 1);

export const ACADEMIC_STATUS_OPTIONS = ["Regular", "Irregular"] as const;

export const AI_TOOL_OPTIONS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Copilot",
  "Perplexity",
  "Grok",
  "Não uso nenhuma",
  "Outra",
] as const;

export const LANGUAGE_OPTIONS = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C",
  "C++",
  "C#",
  "Kotlin",
  "Swift",
  "Go",
  "Rust",
  "Dart / Flutter",
  "Não estou programando atualmente",
  "Outra",
] as const;

export const COMFORTABLE_LANGUAGE_OPTIONS = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C",
  "C++",
  "C#",
  "Kotlin",
  "Swift",
  "Go",
  "Rust",
  "Dart / Flutter",
] as const;

export const MAIN_LANGUAGES_OPTIONS = [
  ...COMFORTABLE_LANGUAGE_OPTIONS,
  "Outra",
] as const;

export const PROFESSIONAL_LEVEL_OPTIONS = [
  "Não trabalho na área",
  "Jovem Aprendiz",
  "Estagiário",
  "Trainee",
  "Auxiliar / Assistente",
  "Analista / Desenvolvedor Júnior",
  "Desenvolvedor Pleno",
  "Desenvolvedor Sênior",
  "Outro",
] as const;

export const WORK_AREA_OPTIONS = [
  { group: "Desenvolvimento", options: [
    "Backend",
    "Frontend",
    "Full Stack",
    "Mobile",
    "Dados / Data Science",
    "Machine Learning / IA",
    "Embarcados / Hardware",
  ]},
  { group: "Infraestrutura e Operações", options: [
    "DevOps / SRE",
    "Cloud / Infraestrutura",
    "Segurança da Informação",
    "Redes",
  ]},
  { group: "Qualidade e Processos", options: [
    "QA / Testes",
    "Scrum Master / Agile Coach",
  ]},
  { group: "Gestão e Produto", options: [
    "Product Owner / Product Manager",
    "Tech Lead",
    "Gerente de TI",
  ]},
  { group: "Suporte e outros", options: [
    "Suporte Técnico / Help Desk",
    "Análise de Sistemas",
    "Consultoria em TI",
  ]},
] as const;

export const WORK_AREA_FLAT_OPTIONS = [
  ...WORK_AREA_OPTIONS.flatMap(g => g.options),
  "Outra",
] as const;

export const TIME_OPTIONS = [
  "Não trabalho na área",
  "Menos de 6 meses",
  "6 meses a 1 ano",
  "1 a 2 anos",
  "2 a 4 anos",
  "Mais de 4 anos",
] as const;

export const COMPANY_SIZE_OPTIONS = [
  "Startup / empresa early-stage (independente do tamanho)",
  "Pequena empresa (até 49 funcionários)",
  "Média empresa (50 a 499 funcionários)",
  "Grande empresa / corporação (500 ou mais funcionários)",
  "Multinacional (sede fora do Brasil)",
  "Prefiro não responder",
] as const;

export const ENGLISH_LEVEL_OPTIONS = [
  "Nenhum",
  "Básico",
  "Intermediário",
  "Avançado",
  "Fluente",
] as const;

export const CURRENT_SALARY_OPTIONS = [
  "Até R$ 500",
  "R$ 500 – R$ 1.000",
  "R$ 1.000 – R$ 2.000",
  "R$ 2.000 – R$ 4.000",
  "R$ 4.000 – R$ 6.000",
  "Acima de R$ 6.000",
  "Prefiro não responder",
] as const;

export const SALARY_OPTIONS = [
  "Até R$ 3.000",
  "R$ 3.000 – R$ 5.000",
  "R$ 5.000 – R$ 8.000",
  "R$ 8.000 – R$ 12.000",
  "R$ 12.000 – R$ 18.000",
  "Acima de R$ 18.000",
  "Prefiro não responder",
] as const;

export const CAREER_INTENTION_OPTIONS = [
  "Mercado privado no Brasil (CLT ou PJ)",
  "Mercado privado no exterior",
  "Empreender / abrir minha própria empresa",
  "Concurso público",
  "Carreira acadêmica / ser professor",
  "Ainda não sei / não tenho plano definido",
] as const;

export const SHARE_TEXT =
  "Ei! Participei de uma pesquisa acadêmica do curso de Engenharia de Software da PUC Minas, da matéria Medição e Experimentação. São em média 6 minutos pra responder e ajuda muito o nosso trabalho. Responde aqui: https://questionario-medicao.vercel.app/";
