COLORS = {
    "primary": "#3B82F6",
    "secondary": "#6366F1",
    "success": "#10B981",
    "warning": "#F59E0B",
    "danger": "#EF4444",
    "info": "#06B6D4",
    "muted": "#94A3B8",
}

PALETTE_CATEGORICAL = [
    "#3B82F6", "#6366F1", "#10B981", "#F59E0B", "#EF4444",
    "#06B6D4", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316",
    "#84CC16", "#A855F7", "#0EA5E9", "#D946EF", "#22D3EE",
]

PALETTE_SEQUENTIAL = ["#DBEAFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8"]

ENGLISH_LEVEL_ORDER = ["Nenhum", "Básico", "Intermediário", "Avançado", "Fluente"]
ENGLISH_LEVEL_MAP = {v: i for i, v in enumerate(ENGLISH_LEVEL_ORDER)}

PROFESSIONAL_LEVEL_ORDER = [
    "Não trabalho na área",
    "Jovem Aprendiz",
    "Estagiário",
    "Trainee",
    "Auxiliar / Assistente",
    "Analista / Desenvolvedor Júnior",
    "Desenvolvedor Pleno",
    "Desenvolvedor Sênior",
]
PROFESSIONAL_LEVEL_MAP = {v: i for i, v in enumerate(PROFESSIONAL_LEVEL_ORDER)}

TIME_ORDER = [
    "Não trabalho na área",
    "Menos de 6 meses",
    "6 meses a 1 ano",
    "1 a 2 anos",
    "2 a 4 anos",
    "Mais de 4 anos",
]

COMPANY_SIZE_ORDER = [
    "Startup / empresa early-stage (independente do tamanho)",
    "Pequena empresa (até 49 funcionários)",
    "Média empresa (50 a 499 funcionários)",
    "Grande empresa / corporação (500 ou mais funcionários)",
    "Multinacional (sede fora do Brasil)",
    "Prefiro não responder",
]

SALARY_CURRENT_ORDER = [
    "Até R$ 500",
    "R$ 500 – R$ 1.000",
    "R$ 1.000 – R$ 2.000",
    "R$ 2.000 – R$ 4.000",
    "R$ 4.000 – R$ 6.000",
    "Acima de R$ 6.000",
    "Prefiro não responder",
]

SALARY_EXPECTATION_ORDER = [
    "Até R$ 3.000",
    "R$ 3.000 – R$ 5.000",
    "R$ 5.000 – R$ 8.000",
    "R$ 8.000 – R$ 12.000",
    "R$ 12.000 – R$ 18.000",
    "Acima de R$ 18.000",
    "Prefiro não responder",
]

SALARY_EXPECTATION_MIDPOINTS = {
    "Até R$ 3.000": 2000,
    "R$ 3.000 – R$ 5.000": 4000,
    "R$ 5.000 – R$ 8.000": 6500,
    "R$ 8.000 – R$ 12.000": 10000,
    "R$ 12.000 – R$ 18.000": 15000,
    "Acima de R$ 18.000": 22000,
    "Prefiro não responder": None,
}

SALARY_CURRENT_MIDPOINTS = {
    "Até R$ 500": 350,
    "R$ 500 – R$ 1.000": 750,
    "R$ 1.000 – R$ 2.000": 1500,
    "R$ 2.000 – R$ 4.000": 3000,
    "R$ 4.000 – R$ 6.000": 5000,
    "Acima de R$ 6.000": 8000,
    "Prefiro não responder": None,
}

CAREER_INTENTION_LABELS = {
    "Mercado privado no Brasil (CLT ou PJ)": "Mercado BR",
    "Mercado privado no exterior": "Mercado Exterior",
    "Empreender / abrir minha própria empresa": "Empreender",
    "Concurso público": "Concurso Público",
    "Carreira acadêmica / ser professor": "Carreira Acadêmica",
    "Ainda não sei / não tenho plano definido": "Indefinido",
}

PERIOD_GROUP_ORDER = ["Início (P1-P2)", "Meio (P3-P5)", "Fim (P6-P8)"]

PLOTLY_LAYOUT_DEFAULTS = dict(
    font=dict(family="Inter, sans-serif", size=13),
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
    margin=dict(l=20, r=20, t=40, b=20),
    hoverlabel=dict(font_size=12),
)
