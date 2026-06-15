import streamlit as st
import pandas as pd
from data.loader import load_data
from utils.charts import stacked_bar_100, line_chart
from utils.constants import PALETTE_CATEGORICAL

df = load_data()

st.header("📈 Regularidade Acadêmica")
st.caption("RQ2 — A partir de qual período a irregularidade se torna predominante?")

st.divider()

# --- Stacked bar 100%: Regular vs Irregular por período ---
st.subheader("Situação Acadêmica por Período")

period_order = [f"P{i}" for i in sorted(df["current_period"].unique())]
df_plot = df.copy()
df_plot["periodo_label"] = df_plot["current_period"].apply(lambda x: f"P{int(x)}")

fig = stacked_bar_100(
    df_plot,
    group_col="periodo_label",
    segment_col="academic_status",
    title="",
    group_order=period_order,
    segment_order=["Regular", "Irregular"],
    colors=[PALETTE_CATEGORICAL[2], PALETTE_CATEGORICAL[4]],
)
fig.update_layout(height=400)
st.plotly_chart(fig, use_container_width=True)

# --- Linha de tendência de irregularidade ---
st.subheader("Evolução da Taxa de Irregularidade por Período")

periods_sorted = sorted(df["current_period"].unique())
irreg_rates = []
for p in periods_sorted:
    subset = df[df["current_period"] == p]
    rate = (subset["academic_status"] == "Irregular").mean() * 100
    irreg_rates.append(rate)

fig = line_chart(
    x=[f"P{int(p)}" for p in periods_sorted],
    y=irreg_rates,
    title="",
    x_label="Período",
    y_label="% Irregulares",
)
fig.update_layout(height=380)
st.plotly_chart(fig, use_container_width=True)

# --- Análise textual ---
max_irreg_period = periods_sorted[irreg_rates.index(max(irreg_rates))]
max_irreg_rate = max(irreg_rates)

first_majority = None
for p, rate in zip(periods_sorted, irreg_rates):
    if rate >= 30 and p > 1:
        first_majority = p
        break

st.divider()
st.subheader("📋 Análise")

col1, col2 = st.columns(2)
col1.metric("Período com Maior Irregularidade", f"P{int(max_irreg_period)}", f"{max_irreg_rate:.0f}% irregulares")

if first_majority:
    col2.metric("Irregularidade Expressiva a partir de", f"P{int(first_majority)}")
    st.info(
        f"A partir do **P{int(first_majority)}**, a taxa de irregularidade ultrapassa 30%, "
        f"sugerindo que a progressão acadêmica se torna mais difícil a partir desse ponto. "
        f"No **P1**, apenas {irreg_rates[0]:.0f}% são irregulares — o salto é significativo."
    )
else:
    col2.metric("Irregularidade Expressiva a partir de", "—")

# --- Tabela detalhada ---
st.subheader("Dados Detalhados")
detail = pd.DataFrame({
    "Período": [f"P{int(p)}" for p in periods_sorted],
    "Total": [len(df[df["current_period"] == p]) for p in periods_sorted],
    "Regulares": [(df[df["current_period"] == p]["academic_status"] == "Regular").sum() for p in periods_sorted],
    "Irregulares": [(df[df["current_period"] == p]["academic_status"] == "Irregular").sum() for p in periods_sorted],
    "% Irregulares": [f"{r:.1f}%" for r in irreg_rates],
})
st.dataframe(detail, use_container_width=True, hide_index=True)
