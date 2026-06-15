import streamlit as st
import pandas as pd
from data.loader import load_data
from utils.charts import horizontal_bar, stacked_bar_100, grouped_bar
from utils.stats import mann_whitney_test, chi_square_test
from utils.constants import (
    PALETTE_CATEGORICAL,
    SALARY_EXPECTATION_ORDER,
    SALARY_EXPECTATION_MIDPOINTS,
    CAREER_INTENTION_LABELS,
    PERIOD_GROUP_ORDER,
)

df = load_data()

st.header("🚀 Expectativas e Carreira")
st.caption("RQ10 — Expectativas salariais diferem entre quem trabalha e quem não trabalha?")
st.caption("RQ11 — Alunos no início do curso têm expectativas diferentes dos do final?")
st.caption("RQ12 — Qual destino profissional é mais desejado?")

st.divider()

# --- Expectativas Salariais (3 horizontes) ---
st.subheader("Expectativas Salariais — 3 Horizontes")

salary_cols = {
    "salary_after_graduation": "Pós-formatura",
    "salary_5_years": "5 anos",
    "salary_10_years": "10 anos",
}

valid_order = [s for s in SALARY_EXPECTATION_ORDER if s != "Prefiro não responder"]

rows = []
for col, label in salary_cols.items():
    counts = df[col].value_counts()
    for faixa in valid_order:
        rows.append({"Horizonte": label, "Faixa": faixa, "Contagem": counts.get(faixa, 0)})

df_salary = pd.DataFrame(rows)

fig = grouped_bar(
    df_salary,
    x_col="Faixa",
    group_col="Horizonte",
    value_col="Contagem",
    title="",
    x_order=valid_order,
)
fig.update_layout(height=450, xaxis_tickangle=-30)
st.plotly_chart(fig, use_container_width=True)

st.divider()

# --- Mann-Whitney: trabalha vs não trabalha (RQ10) ---
st.subheader("📊 Trabalha na Área × Expectativa Salarial")

df_test = df.copy()
df_test["works"] = df_test["professional_level"] != "Não trabalho na área"

for col, label in salary_cols.items():
    df_test[f"{col}_mid"] = df_test[col].map(SALARY_EXPECTATION_MIDPOINTS)

st.markdown("#### Mann-Whitney U: quem trabalha vs. quem não trabalha")

tabs = st.tabs(list(salary_cols.values()))

for tab, (col, label) in zip(tabs, salary_cols.items()):
    with tab:
        mid_col = f"{col}_mid"
        group_works = df_test.loc[df_test["works"], mid_col].dropna()
        group_not = df_test.loc[~df_test["works"], mid_col].dropna()
        result = mann_whitney_test(group_works, group_not, "Trabalha", "Não trabalha")
        col1, col2, col3 = st.columns(3)
        col1.metric("U", result["U"])
        col2.metric("p-valor", result["p_value"])
        col3.metric("n", f"{result['n_a']} + {result['n_b']}")
        st.info(result["interpretation"])

st.divider()

# --- Início vs Fim do curso (RQ11) ---
st.subheader("📊 Início vs. Fim do Curso — Expectativa Salarial")

df_inicio = df[df["period_group"] == "Início (P1-P2)"].copy()
df_fim = df[df["period_group"] == "Fim (P6-P8)"].copy()

st.markdown(f"**Início (P1-P2):** {len(df_inicio)} respondentes | **Fim (P6-P8):** {len(df_fim)} respondentes")

tabs = st.tabs(list(salary_cols.values()))

for tab, (col, label) in zip(tabs, salary_cols.items()):
    with tab:
        inicio_mid = df_inicio[col].map(SALARY_EXPECTATION_MIDPOINTS).dropna()
        fim_mid = df_fim[col].map(SALARY_EXPECTATION_MIDPOINTS).dropna()
        result = mann_whitney_test(inicio_mid, fim_mid, "Início (P1-P2)", "Fim (P6-P8)")
        col1, col2, col3 = st.columns(3)
        col1.metric("U", result["U"])
        col2.metric("p-valor", result["p_value"])
        col3.metric("n", f"{result['n_a']} + {result['n_b']}")
        st.info(result["interpretation"])

st.divider()

# --- Intenção de Carreira (RQ12) ---
st.subheader("Intenção de Carreira Pós-Formatura")

col1, col2 = st.columns([1, 1])

with col1:
    df_career = df.copy()
    df_career["career_short"] = df_career["career_intention"].map(CAREER_INTENTION_LABELS).fillna(df_career["career_intention"])

    fig = horizontal_bar(df_career["career_short"], "", color=PALETTE_CATEGORICAL[1], sort=True)
    fig.update_layout(height=380)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    total = len(df)
    exterior = (df["career_intention"] == "Mercado privado no exterior").sum()
    empreender = (df["career_intention"] == "Empreender / abrir minha própria empresa").sum()
    indefinido = (df["career_intention"] == "Ainda não sei / não tenho plano definido").sum()

    st.metric("Mercado Exterior", f"{exterior / total * 100:.0f}%", f"{exterior} de {total}")
    st.metric("Empreender", f"{empreender / total * 100:.0f}%", f"{empreender} de {total}")
    st.metric("Indefinidos", f"{indefinido / total * 100:.0f}%", f"{indefinido} de {total}")

# --- Carreira × Período (Chi²) ---
st.divider()
st.subheader("📊 Intenção de Carreira × Grupo de Período")

df_chi = df.dropna(subset=["period_group"]).copy()
df_chi["career_short"] = df_chi["career_intention"].map(CAREER_INTENTION_LABELS).fillna(df_chi["career_intention"])

fig = stacked_bar_100(
    df_chi,
    group_col="period_group",
    segment_col="career_short",
    title="",
    group_order=PERIOD_GROUP_ORDER,
)
fig.update_layout(height=400)
st.plotly_chart(fig, use_container_width=True)

st.markdown("#### Teste Qui-Quadrado")
result = chi_square_test(df_chi, "period_group", "career_short")
col1, col2, col3 = st.columns(3)
col1.metric("χ²", result["chi2"])
col2.metric("p-valor", result["p_value"])
col3.metric("gl", result["dof"])
st.info(result["interpretation"])
