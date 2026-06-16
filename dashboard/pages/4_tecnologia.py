import streamlit as st
import pandas as pd
from data.loader import load_data
from utils.charts import donut_chart, horizontal_bar, box_plot, explode_list_col
from utils.stats import spearman_test
from utils.constants import PALETTE_CATEGORICAL, PERIOD_GROUP_ORDER

df = load_data()

st.header("🛠️ Ferramentas e Linguagens")
st.caption("RQ5 - Qual é o panorama de adoção de IA?")
st.caption("RQ6 - Quais linguagens dominam e o repertório cresce com o curso?")

st.divider()

# --- IA mais usada (RQ5) ---
st.subheader("Ferramenta de IA Mais Utilizada")

col1, col2 = st.columns([1, 1])

with col1:
    fig = donut_chart(df["ai_tool"], "")
    fig.update_layout(height=420)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    total = len(df)
    uses_ai = len(df[df["ai_tool"] != "Não uso nenhuma"])
    st.metric("Taxa de Uso de IA", f"{uses_ai / total * 100:.0f}%", f"{uses_ai} de {total}")
    st.markdown("---")
    top3 = df["ai_tool"].value_counts().head(3)
    for i, (tool, count) in enumerate(top3.items()):
        st.metric(f"#{i+1}", tool, f"{count} respostas ({count/total*100:.0f}%)")

st.divider()

# --- Linguagens utilizadas (RQ6) ---
st.subheader("Linguagens de Programação Utilizadas")

col1, col2 = st.columns(2)

with col1:
    st.markdown("#### Linguagens que utilizam atualmente")
    lang_counter = explode_list_col(df, "main_languages")
    lang_counter.pop("Outra", None)
    s = pd.Series(dict(lang_counter.most_common(12)))
    fig = horizontal_bar(s, "", color=PALETTE_CATEGORICAL[0], sort=True, precounted=True)
    fig.update_layout(height=450)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    st.markdown("#### Linguagens que se sentem confortáveis")
    comfort_counter = explode_list_col(df, "comfortable_languages")
    s = pd.Series(dict(comfort_counter.most_common(12)))
    fig = horizontal_bar(s, "", color=PALETTE_CATEGORICAL[2], sort=True, precounted=True)
    fig.update_layout(height=450)
    st.plotly_chart(fig, use_container_width=True)

st.divider()

# --- Repertório por período (RQ6 - cruzamento) ---
st.subheader("Repertório de Linguagens por Grupo de Período")

fig = box_plot(
    df,
    x_col="period_group",
    y_col="n_comfortable_langs",
    title="",
    category_order=PERIOD_GROUP_ORDER,
)
fig.update_layout(
    height=380,
    xaxis_title="Grupo de Período",
    yaxis_title="Nº de Linguagens Confortáveis",
)
st.plotly_chart(fig, use_container_width=True)

# --- Spearman: período × repertório ---
st.subheader("📊 Teste de Correlação - Período × Repertório")

result = spearman_test(df["current_period"], df["n_comfortable_langs"])
col1, col2, col3 = st.columns(3)
col1.metric("ρ (Spearman)", result["rho"])
col2.metric("p-valor", result["p_value"])
col3.metric("n", result["n"])
st.info(result["interpretation"])
