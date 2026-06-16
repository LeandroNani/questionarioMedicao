import streamlit as st
import pandas as pd
from data.loader import load_data
from utils.charts import donut_chart, horizontal_bar
from utils.constants import PALETTE_CATEGORICAL

df = load_data()

st.header("📊 Visão Geral da Amostra")
st.caption("RQ1 - Como se distribui a amostra por período, turno e situação acadêmica?")

st.divider()

# --- KPI Cards ---
col1, col2, col3, col4 = st.columns(4)
col1.metric("Total de Respostas", len(df))
col2.metric("☀️ Manhã", len(df[df["shift"] == "Manhã"]))
col3.metric("🌙 Noite", len(df[df["shift"] == "Noite"]))
col4.metric("✅ Regulares", f"{len(df[df['academic_status'] == 'Regular'])}/{len(df)}")

st.divider()

# --- Respondentes por Período ---
col_left, col_right = st.columns(2)

with col_left:
    st.subheader("Respondentes por Período")
    period_labels = df["current_period"].apply(lambda x: f"P{int(x)}")
    fig = donut_chart(period_labels, "")
    fig.update_layout(height=450)
    st.plotly_chart(fig, use_container_width=True)

with col_right:
    st.subheader("Distribuição por Ano de Entrada")
    year_labels = df["entry_year"].astype(str)
    fig = horizontal_bar(year_labels, "", color=PALETTE_CATEGORICAL[1])
    fig.update_layout(height=450)
    st.plotly_chart(fig, use_container_width=True)

# --- Tabela resumo ---
st.subheader("Resumo por Período")
summary = (
    df.groupby("current_period")
    .agg(
        total=("id", "count"),
        manhã=("shift", lambda x: (x == "Manhã").sum()),
        noite=("shift", lambda x: (x == "Noite").sum()),
        regulares=("academic_status", lambda x: (x == "Regular").sum()),
        irregulares=("academic_status", lambda x: (x == "Irregular").sum()),
    )
    .reset_index()
)
summary.columns = ["Período", "Total", "Manhã", "Noite", "Regulares", "Irregulares"]
summary["Período"] = summary["Período"].apply(lambda x: f"P{int(x)}")
summary["% Irregular"] = (summary["Irregulares"] / summary["Total"] * 100).round(1).astype(str) + "%"
st.dataframe(summary, use_container_width=True, hide_index=True)
