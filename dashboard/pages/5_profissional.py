import streamlit as st
import pandas as pd
from data.loader import load_data
from utils.charts import horizontal_bar, donut_chart, treemap_chart, heatmap_chart
from utils.stats import spearman_test
from utils.constants import (
    PALETTE_CATEGORICAL,
    ENGLISH_LEVEL_ORDER,
    ENGLISH_LEVEL_MAP,
    PROFESSIONAL_LEVEL_ORDER,
    PROFESSIONAL_LEVEL_MAP,
    TIME_ORDER,
    COMPANY_SIZE_ORDER,
    SALARY_CURRENT_ORDER,
    SALARY_CURRENT_MIDPOINTS,
)

df = load_data()

st.header("💼 Perfil Profissional")
st.caption("RQ7 - Nível de inglês está associado a cargos e salários melhores?")
st.caption("RQ8 - Qual é o perfil profissional dos que trabalham na área?")
st.caption("RQ9 - Existe correlação entre período acadêmico e nível profissional?")

st.divider()

# -- Nível Profissional (RQ8) --
st.subheader("Nível Profissional")

col1, col2 = st.columns([1, 1])

with col1:
    total = len(df)
    works = len(df[df["professional_level"] != "Não trabalho na área"])
    st.metric("Taxa de Empregabilidade na Área", f"{works / total * 100:.0f}%", f"{works} de {total}")

with col2:
    fig = horizontal_bar(
        df["professional_level"],
        "",
        color=PALETTE_CATEGORICAL[0],
        sort=True,
    )
    fig.update_layout(height=380)
    st.plotly_chart(fig, use_container_width=True)

st.divider()

# -- Quem trabalha na área: detalhes --
df_workers = df[df["professional_level"] != "Não trabalho na área"].copy()

if len(df_workers) > 0:
    st.subheader(f"Detalhes dos que Trabalham na Área ({len(df_workers)} respondentes)")

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### Área de Atuação")
        fig = treemap_chart(df_workers["work_area"].dropna(), "")
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.markdown("#### Tempo na Área de TI")
        time_order_workers = [t for t in TIME_ORDER if t != "Não trabalho na área"]
        fig = horizontal_bar(
            df_workers["time_in_tech"],
            "",
            color=PALETTE_CATEGORICAL[5],
            sort=False,
            category_order=time_order_workers,
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### Porte da Empresa")
        fig = donut_chart(df_workers["company_size"].dropna(), "")
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.markdown("#### Faixa Salarial Atual")
        salary_data = df_workers["current_salary"].dropna()
        salary_data = salary_data[salary_data != "Prefiro não responder"]
        if len(salary_data) > 0:
            fig = horizontal_bar(
                salary_data,
                "",
                color=PALETTE_CATEGORICAL[2],
                sort=False,
                category_order=[s for s in SALARY_CURRENT_ORDER if s != "Prefiro não responder"],
            )
            fig.update_layout(height=400)
            st.plotly_chart(fig, use_container_width=True)

st.divider()

# -- Nível de Inglês (RQ7) --
st.subheader("Nível de Inglês")

col1, col2 = st.columns(2)

with col1:
    fig = horizontal_bar(
        df["english_level"],
        "",
        color=PALETTE_CATEGORICAL[1],
        sort=False,
        category_order=ENGLISH_LEVEL_ORDER,
    )
    fig.update_layout(height=350)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    st.markdown("#### Inglês × Nível Profissional")
    prof_order = [p for p in PROFESSIONAL_LEVEL_ORDER if p != "Não trabalho na área"]
    df_cross = df[df["professional_level"].isin(prof_order)].copy()
    if len(df_cross) > 0:
        ct = pd.crosstab(df_cross["english_level"], df_cross["professional_level"])
        ct = ct.reindex(index=[e for e in ENGLISH_LEVEL_ORDER if e in ct.index])
        ct = ct.reindex(columns=[p for p in prof_order if p in ct.columns])
        fig = heatmap_chart(ct, "", x_label="Nível Profissional", y_label="Inglês")
        fig.update_layout(height=350)
        st.plotly_chart(fig, use_container_width=True)

# -- Spearman: inglês × salário (RQ7) --
st.subheader("📊 Correlação - Inglês × Salário Atual")

df_salary_test = df_workers.copy()
df_salary_test["english_ordinal"] = df_salary_test["english_level"].map(ENGLISH_LEVEL_MAP)
df_salary_test["salary_midpoint"] = df_salary_test["current_salary"].map(SALARY_CURRENT_MIDPOINTS)
df_salary_test = df_salary_test.dropna(subset=["english_ordinal", "salary_midpoint"])

if len(df_salary_test) >= 5:
    result = spearman_test(df_salary_test["english_ordinal"], df_salary_test["salary_midpoint"])
    col1, col2, col3 = st.columns(3)
    col1.metric("ρ (Spearman)", result["rho"])
    col2.metric("p-valor", result["p_value"])
    col3.metric("n", result["n"])
    st.info(result["interpretation"])
else:
    st.warning("Amostra insuficiente para o teste (mínimo 5 com ambos os dados preenchidos).")

st.divider()

# -- Spearman: período × nível profissional (RQ9) --
st.subheader("📊 Correlação - Período Acadêmico × Nível Profissional")

df_prof_test = df.copy()
df_prof_test["prof_ordinal"] = df_prof_test["professional_level"].map(PROFESSIONAL_LEVEL_MAP)
df_prof_test = df_prof_test.dropna(subset=["current_period", "prof_ordinal"])

if len(df_prof_test) >= 5:
    result = spearman_test(df_prof_test["current_period"], df_prof_test["prof_ordinal"])
    col1, col2, col3 = st.columns(3)
    col1.metric("ρ (Spearman)", result["rho"])
    col2.metric("p-valor", result["p_value"])
    col3.metric("n", result["n"])
    st.info(result["interpretation"])

    st.markdown("#### Distribuição Cruzada")
    ct_period_prof = pd.crosstab(
        df_prof_test["current_period"].apply(lambda x: f"P{int(x)}"),
        df_prof_test["professional_level"],
    )
    period_order_labels = [f"P{i}" for i in sorted(df["current_period"].unique())]
    ct_period_prof = ct_period_prof.reindex(index=[p for p in period_order_labels if p in ct_period_prof.index])
    ct_period_prof = ct_period_prof.reindex(columns=[p for p in PROFESSIONAL_LEVEL_ORDER if p in ct_period_prof.columns])
    fig = heatmap_chart(ct_period_prof, "", x_label="Nível Profissional", y_label="Período")
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)
