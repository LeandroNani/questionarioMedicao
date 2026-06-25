import streamlit as st
import pandas as pd
import plotly.graph_objects as go
from data.loader import load_data
from utils.charts import explode_list_col, apply_defaults
from utils.stats import proportion_z_test, chi2_goodness_of_fit, spearman_rank_correlation
from utils.constants import PALETTE_CATEGORICAL, ENGLISH_LEVEL_ORDER, SALARY_EXPECTATION_MIDPOINTS

df = load_data()

# ── Dados do mercado (Pesquisa Código Fonte 2024, n=15.049) ─────────────────
MARKET_N = 15049
MARKET_SOURCE = "Pesquisa Código Fonte 2024 (n=15.049)"

MARKET_AI = {
    "ChatGPT": 66.65,
    "GitHub Copilot": 13.51,
    "Nenhuma": 10.90,
    "Microsoft Copilot": 2.00,
    "Google Gemini": 1.51,
    "Outras": 5.43,
}

MARKET_ENGLISH = {
    "Nenhum": 1.87,
    "Básico": 29.02,
    "Intermediário": 38.87,
    "Avançado": 30.24,
}

MARKET_AREAS = {
    "Full Stack": 34.77,
    "Back-End": 30.91,
    "Front-End": 11.91,
    "Mobile": 5.63,
    "Dados / Data Science": 4.98,
    "Outras": 12.80,
}

MARKET_CAREER_ABROAD_PCT = 26.58  # "pretende migrar nos próximos 5 anos"
MARKET_AI_ADOPTION_PCT = 83.61   # usa alguma IA no trabalho

# Salários reais por nível (mercado 2024)
MARKET_SALARY_BY_LEVEL = {
    "Estagiário": 1748.97,
    "Júnior": 4079.01,
    "Pleno": 7850.47,
    "Sênior": 15050.46,
    "Especialista / Tech Lead": 18202.92,
}

# Ranking de linguagens no mercado (por nº de participantes)
MARKET_LANG_RANK = {
    "JavaScript": 1, "C#": 2, "Java": 3, "TypeScript": 4,
    "Python": 5, "PHP": 6, "Dart": 7, "Go": 8,
}

# ── Cabeçalho ────────────────────────────────────────────────────────────────
st.header("🌐 Benchmarking: PUC Minas × Mercado Brasileiro")
st.caption(f"Comparação com a {MARKET_SOURCE}")

st.info(
    "**Contexto metodológico:** Este módulo compara o perfil dos estudantes de ES da PUC Minas "
    "(survey interno, jun/2026, n=99) com os dados da Pesquisa Código Fonte 2024 "
    "(n=15.049 profissionais de TI do Brasil). "
    "Testes de proporção (z-test) e aderência (χ²) são usados para identificar divergências estatisticamente significativas."
)

st.divider()

# ══════════════════════════════════════════════════════════════════════════════
# RQ-C1 — Adoção de IA
# ══════════════════════════════════════════════════════════════════════════════
st.subheader("🤖 RQ-C1 — Adoção e Preferência de Ferramentas de IA")

total = len(df)
uses_ai = (df["ai_tool"] != "Não uso nenhuma").sum()
pct_students = uses_ai / total * 100

col1, col2, col3 = st.columns(3)
col1.metric("Taxa de uso (PUC Minas)", f"{pct_students:.1f}%", f"{uses_ai}/{total}")
col2.metric("Taxa de uso (Mercado)", f"{MARKET_AI_ADOPTION_PCT:.1f}%", f"n={MARKET_N:,}")
col3.metric("Diferença", f"+{pct_students - MARKET_AI_ADOPTION_PCT:.1f} p.p.")

result_ai = proportion_z_test(uses_ai, total, MARKET_AI_ADOPTION_PCT / 100)
st.info(f"**Teste z (proporção):** {result_ai['interpretation']}")

# Gráfico comparativo de ferramentas
ai_students = df["ai_tool"].value_counts(normalize=True).mul(100)

# Mapeamento de nomes para alinhar as categorias
ai_map = {
    "ChatGPT": "ChatGPT",
    "Claude": "Claude",
    "Gemini": "Google Gemini",
    "Copilot": "GitHub Copilot",
    "Não uso nenhuma": "Nenhuma",
}
ai_students_mapped = ai_students.rename(ai_map)

all_tools = sorted(set(list(ai_students_mapped.index) + list(MARKET_AI.keys())))
puc_vals = [ai_students_mapped.get(t, 0) for t in all_tools]
mkt_vals = [MARKET_AI.get(t, 0) for t in all_tools]

fig_ai = go.Figure()
fig_ai.add_trace(go.Bar(name="PUC Minas (2026)", x=all_tools, y=puc_vals,
                         marker_color=PALETTE_CATEGORICAL[0],
                         text=[f"{v:.1f}%" for v in puc_vals], textposition="outside"))
fig_ai.add_trace(go.Bar(name=MARKET_SOURCE, x=all_tools, y=mkt_vals,
                         marker_color=PALETTE_CATEGORICAL[1],
                         text=[f"{v:.1f}%" for v in mkt_vals], textposition="outside"))
fig_ai.update_layout(barmode="group", yaxis_title="%", xaxis_title="Ferramenta",
                      height=420, legend=dict(orientation="h", y=1.1))
apply_defaults(fig_ai, "")
st.plotly_chart(fig_ai, use_container_width=True)

st.caption(
    "**Destaque:** Claude lidera entre estudantes (38,4%) mas é inexpressivo no mercado, onde ChatGPT domina com 66,7%. "
    "O mercado ainda usa GitHub Copilot como 2ª opção (13,5%) — praticamente ausente entre os estudantes."
)

st.divider()

# ══════════════════════════════════════════════════════════════════════════════
# RQ-C2 — Nível de inglês
# ══════════════════════════════════════════════════════════════════════════════
st.subheader("🇬🇧 RQ-C2 — Distribuição do Nível de Inglês")

# Estudantes: unir Avançado+Fluente para comparar com o mercado (que não tem "Fluente" separado)
eng_counts_raw = df["english_level"].value_counts()
eng_students_merged = {
    "Nenhum": int(eng_counts_raw.get("Nenhum", 0)),
    "Básico": int(eng_counts_raw.get("Básico", 0)),
    "Intermediário": int(eng_counts_raw.get("Intermediário", 0)),
    "Avançado": int(eng_counts_raw.get("Avançado", 0)) + int(eng_counts_raw.get("Fluente", 0)),
}
eng_total = sum(eng_students_merged.values())
eng_students_pct = {k: v / eng_total * 100 for k, v in eng_students_merged.items()}

levels = ["Nenhum", "Básico", "Intermediário", "Avançado"]
puc_eng = [eng_students_pct[l] for l in levels]
mkt_eng = [MARKET_ENGLISH[l] for l in levels]

col1, col2 = st.columns(2)

with col1:
    fig_eng = go.Figure()
    fig_eng.add_trace(go.Bar(name="PUC Minas (Avançado inclui Fluente)", x=levels, y=puc_eng,
                              marker_color=PALETTE_CATEGORICAL[0],
                              text=[f"{v:.1f}%" for v in puc_eng], textposition="outside"))
    fig_eng.add_trace(go.Bar(name=MARKET_SOURCE, x=levels, y=mkt_eng,
                              marker_color=PALETTE_CATEGORICAL[1],
                              text=[f"{v:.1f}%" for v in mkt_eng], textposition="outside"))
    fig_eng.update_layout(barmode="group", yaxis_title="%", height=400,
                           legend=dict(orientation="h", y=1.1))
    apply_defaults(fig_eng, "")
    st.plotly_chart(fig_eng, use_container_width=True)

with col2:
    result_eng = chi2_goodness_of_fit(eng_students_merged, MARKET_ENGLISH)
    st.markdown("#### Teste χ² de Aderência")
    st.metric("χ²", result_eng["chi2"])
    st.metric("p-valor", result_eng["p_value"])
    st.metric("gl", result_eng["dof"])
    st.info(result_eng["interpretation"])

st.caption(
    "**Interpretação:** Os estudantes têm perfil de inglês mais avançado que o mercado: "
    "48,5% estão em nível Avançado ou Fluente vs. 30,2% no mercado. "
    "O nível Básico é proporcionalmente menor entre os estudantes (18,2% vs. 29,0%)."
)

st.divider()

# ══════════════════════════════════════════════════════════════════════════════
# RQ-C3 — Expectativa salarial × realidade do mercado
# ══════════════════════════════════════════════════════════════════════════════
st.subheader("💰 RQ-C3 — Expectativa Salarial × Realidade do Mercado")

st.markdown("Comparação entre as expectativas salariais dos estudantes e os salários reais praticados pelo mercado em 2024, por nível de carreira.")

# Tabela de comparação
comp_data = {
    "Nível": ["Estagiário / Pós-formatura", "Pleno (~5 anos)", "Sênior (~10 anos)"],
    "Expectativa PUC Minas (mediana)": ["R$ 6.500", "R$ 15.000", "R$ 22.000"],
    "Salário Real Mercado 2024": ["R$ 4.079 (Júnior)", "R$ 7.850 (Pleno)", "R$ 15.050 (Sênior)"],
    "Gap (expectativa − real)": ["+R$ 2.421 (+59%)", "+R$ 7.150 (+91%)", "+R$ 6.950 (+46%)"],
}
df_comp = pd.DataFrame(comp_data)
st.dataframe(df_comp, use_container_width=True, hide_index=True)

# Gráfico de barras comparando expectativa vs. realidade
horizons = ["Pós-formatura\n(Júnior)", "5 anos\n(Pleno)", "10 anos\n(Sênior)"]
expectativa = [6500, 15000, 22000]
real = [4079, 7850, 15050]

fig_sal = go.Figure()
fig_sal.add_trace(go.Bar(name="Expectativa PUC Minas (mediana)", x=horizons, y=expectativa,
                          marker_color=PALETTE_CATEGORICAL[0],
                          text=[f"R$ {v:,.0f}" for v in expectativa], textposition="outside"))
fig_sal.add_trace(go.Bar(name="Salário Real – Mercado 2024", x=horizons, y=real,
                          marker_color=PALETTE_CATEGORICAL[3],
                          text=[f"R$ {v:,.0f}" for v in real], textposition="outside"))
fig_sal.update_layout(barmode="group", yaxis_title="R$", height=420,
                       legend=dict(orientation="h", y=1.1),
                       yaxis=dict(tickformat=",.0f", tickprefix="R$ "))
apply_defaults(fig_sal, "")
st.plotly_chart(fig_sal, use_container_width=True)

st.caption(
    "**Insight:** Os estudantes superestimam consistentemente os salários em todos os horizontes. "
    "O maior gap relativo ocorre no horizonte de 5 anos (+91%), onde se espera o dobro do salário médio de um Pleno no mercado. "
    "No horizonte pós-formatura, a expectativa de R$6.500 está 59% acima do salário médio real de um Júnior (R$4.079)."
)

st.divider()

# ══════════════════════════════════════════════════════════════════════════════
# RQ-C4 — Ranking de linguagens
# ══════════════════════════════════════════════════════════════════════════════
st.subheader("💻 RQ-C4 — Ranking de Linguagens de Programação")

lang_counter = explode_list_col(df, "main_languages")
lang_counter.pop("Outra", None)
lang_series = pd.Series(dict(lang_counter.most_common(10)))

# Rank dos estudantes
student_lang_rank = {lang: rank + 1 for rank, (lang, _) in enumerate(lang_series.items())}

# Linguagens comuns entre estudantes e mercado
common_langs = sorted(set(student_lang_rank.keys()) & set(MARKET_LANG_RANK.keys()))

result_lang = spearman_rank_correlation(student_lang_rank, MARKET_LANG_RANK)

col1, col2 = st.columns(2)

with col1:
    st.markdown("#### Linguagens mais usadas")
    top8_langs = list(lang_series.index[:8])
    student_ranks = [student_lang_rank.get(l, "-") for l in top8_langs]
    market_ranks = [MARKET_LANG_RANK.get(l, "-") for l in top8_langs]
    menções = [lang_series[l] for l in top8_langs]

    df_rank = pd.DataFrame({
        "Linguagem": top8_langs,
        "Rank PUC Minas": student_ranks,
        "Rank Mercado": market_ranks,
        "Menções (PUC)": menções,
    })
    st.dataframe(df_rank, use_container_width=True, hide_index=True)

with col2:
    st.markdown("#### Comparativo de menções vs. mercado")
    mkt_pct = {
        "JavaScript": 2638 / 15049 * 100, "C#": 2379 / 15049 * 100,
        "Java": 2270 / 15049 * 100, "TypeScript": 1640 / 15049 * 100,
        "Python": 1458 / 15049 * 100, "Dart": 421 / 15049 * 100,
        "Go": 271 / 15049 * 100,
    }
    puc_pct = {l: lang_series.get(l, 0) / total * 100 for l in mkt_pct}
    langs_plot = list(mkt_pct.keys())

    fig_lang = go.Figure()
    fig_lang.add_trace(go.Bar(name="PUC Minas (% respondentes)", x=langs_plot,
                               y=[puc_pct[l] for l in langs_plot],
                               marker_color=PALETTE_CATEGORICAL[0],
                               text=[f"{puc_pct[l]:.1f}%" for l in langs_plot],
                               textposition="outside"))
    fig_lang.add_trace(go.Bar(name="Mercado 2024 (% participantes)", x=langs_plot,
                               y=[mkt_pct[l] for l in langs_plot],
                               marker_color=PALETTE_CATEGORICAL[1],
                               text=[f"{mkt_pct[l]:.1f}%" for l in langs_plot],
                               textposition="outside"))
    fig_lang.update_layout(barmode="group", yaxis_title="%", height=380,
                            legend=dict(orientation="h", y=1.1))
    apply_defaults(fig_lang, "")
    st.plotly_chart(fig_lang, use_container_width=True)

st.markdown("#### Correlação de Spearman entre Rankings")
col1, col2, col3 = st.columns(3)
col1.metric("ρ (Spearman)", result_lang["rho"])
col2.metric("p-valor", result_lang["p_value"])
col3.metric("n (linguagens comuns)", result_lang["n"])
st.info(result_lang["interpretation"])

st.caption(
    "**Destaque:** Python é a linguagem dominante entre estudantes (76,8% das menções) mas ocupa apenas a 5ª posição no mercado. "
    "O mercado é liderado por JavaScript e C# — reflexo da demanda por desenvolvimento web corporativo e .NET. "
    "Java mantém a 3ª posição em ambos os contextos."
)

st.divider()

# ══════════════════════════════════════════════════════════════════════════════
# RQ-C5 — Intenção de trabalhar no exterior
# ══════════════════════════════════════════════════════════════════════════════
st.subheader("✈️ RQ-C5 — Intenção de Trabalhar no Exterior")

career_abroad = (df["career_intention"] == "Mercado privado no exterior").sum()
pct_abroad_students = career_abroad / total * 100

col1, col2, col3 = st.columns(3)
col1.metric("PUC Minas (exterior como 1ª opção)", f"{pct_abroad_students:.1f}%", f"{career_abroad}/{total}")
col2.metric("Mercado (pretende migrar em ≤5 anos)", f"{MARKET_CAREER_ABROAD_PCT:.1f}%")
col3.metric("Diferença", f"+{pct_abroad_students - MARKET_CAREER_ABROAD_PCT:.1f} p.p.")

result_career = proportion_z_test(career_abroad, total, MARKET_CAREER_ABROAD_PCT / 100)
st.info(f"**Teste z (proporção):** {result_career['interpretation']}")

# Gráfico comparativo de intenção
labels_career = ["Exterior", "Outros destinos"]
puc_career = [pct_abroad_students, 100 - pct_abroad_students]
mkt_career = [MARKET_CAREER_ABROAD_PCT, 100 - MARKET_CAREER_ABROAD_PCT]

fig_career = go.Figure()
fig_career.add_trace(go.Bar(name="PUC Minas", x=labels_career, y=puc_career,
                             marker_color=PALETTE_CATEGORICAL[0],
                             text=[f"{v:.1f}%" for v in puc_career], textposition="outside"))
fig_career.add_trace(go.Bar(name=MARKET_SOURCE, x=labels_career, y=mkt_career,
                             marker_color=PALETTE_CATEGORICAL[1],
                             text=[f"{v:.1f}%" for v in mkt_career], textposition="outside"))
fig_career.update_layout(barmode="group", yaxis_title="%", height=380,
                          legend=dict(orientation="h", y=1.1))
apply_defaults(fig_career, "")
st.plotly_chart(fig_career, use_container_width=True)

st.caption(
    "**Nota:** A comparação aproxima 'intenção de trabalhar no exterior como 1ª opção' (estudantes) "
    "com 'pretende migrar nos próximos 5 anos' (mercado). "
    "Os estudantes demonstram intenção quase o dobro da média nacional, sugerindo maior abertura à internacionalização."
)

st.divider()

# ══════════════════════════════════════════════════════════════════════════════
# RQ-C6 — Áreas de atuação
# ══════════════════════════════════════════════════════════════════════════════
st.subheader("🗂️ RQ-C6 — Distribuição por Área de Atuação")

df_workers = df[df["professional_level"] != "Não trabalho na área"].copy()
area_pct_students = df_workers["work_area"].value_counts(normalize=True).mul(100)

# Mapeamento de nomes para alinhar com mercado
area_map = {
    "Full Stack": "Full Stack",
    "Backend": "Back-End",
    "Frontend": "Front-End",
    "Machine Learning / IA": "Machine Learning / IA",
    "Dados / Data Science": "Dados / Data Science",
    "Mobile": "Mobile",
}

areas_plot = ["Full Stack", "Back-End", "Front-End", "Mobile", "Dados / Data Science"]
puc_areas = [area_pct_students.get(k.replace("Back-End", "Backend").replace("Front-End", "Frontend"), 0) for k in areas_plot]
# Ajuste manual para nomes do survey
puc_area_vals = []
for a in areas_plot:
    survey_name = a.replace("Back-End", "Backend").replace("Front-End", "Frontend")
    puc_area_vals.append(area_pct_students.get(survey_name, 0))

mkt_area_vals = [MARKET_AREAS.get(a, 0) for a in areas_plot]

fig_area = go.Figure()
fig_area.add_trace(go.Bar(name="PUC Minas (% dos que trabalham)", x=areas_plot, y=puc_area_vals,
                           marker_color=PALETTE_CATEGORICAL[0],
                           text=[f"{v:.1f}%" for v in puc_area_vals], textposition="outside"))
fig_area.add_trace(go.Bar(name=MARKET_SOURCE, x=areas_plot, y=mkt_area_vals,
                           marker_color=PALETTE_CATEGORICAL[1],
                           text=[f"{v:.1f}%" for v in mkt_area_vals], textposition="outside"))
fig_area.update_layout(barmode="group", yaxis_title="%", height=420,
                        legend=dict(orientation="h", y=1.1))
apply_defaults(fig_area, "")
st.plotly_chart(fig_area, use_container_width=True)

st.caption(
    "**Convergência em Full Stack:** A distribuição para Full Stack é praticamente idêntica entre estudantes (34,7%) "
    "e mercado (34,8%) — uma convergência notável. Back-End está sub-representado entre estudantes (14,3% vs. 30,9%), "
    "possivelmente porque os estágios e vagas júnior tendem a ser Full Stack."
)

st.divider()

# ══════════════════════════════════════════════════════════════════════════════
# Síntese
# ══════════════════════════════════════════════════════════════════════════════
st.subheader("📋 Síntese dos Testes Comparativos")

summary = [
    {"RQ": "RQ-C1 (IA)", "Teste": "z-test (proporção)", "Resultado": f"z={result_ai['z']}", "p": result_ai['p_value'], "Significativo": "✅ Sim" if result_ai['p_value'] < 0.05 else "❌ Não"},
    {"RQ": "RQ-C2 (Inglês)", "Teste": "χ² de aderência", "Resultado": f"χ²={result_eng['chi2']}", "p": result_eng['p_value'], "Significativo": "✅ Sim" if result_eng['p_value'] < 0.05 else "❌ Não"},
    {"RQ": "RQ-C4 (Linguagens)", "Teste": "Spearman (ranking)", "Resultado": f"ρ={result_lang['rho']}", "p": result_lang['p_value'], "Significativo": "✅ Sim" if (result_lang['p_value'] or 1) < 0.05 else "❌ Não"},
    {"RQ": "RQ-C5 (Exterior)", "Teste": "z-test (proporção)", "Resultado": f"z={result_career['z']}", "p": result_career['p_value'], "Significativo": "✅ Sim" if result_career['p_value'] < 0.05 else "❌ Não"},
]
st.dataframe(pd.DataFrame(summary), use_container_width=True, hide_index=True)

st.caption(f"Fonte de referência: {MARKET_SOURCE} — pesquisa.codigofonte.com.br/2024")
