import streamlit as st
import pandas as pd
from data.loader import load_data
from utils.charts import generate_wordcloud, explode_subjects, horizontal_bar
from utils.constants import PERIOD_GROUP_ORDER, PALETTE_CATEGORICAL

df = load_data()

st.header("📚 Percepção Curricular")
st.caption("RQ3 — Quais disciplinas são mais difíceis, menos interessantes e mais relevantes?")
st.caption("RQ4 — Existe sobreposição entre disciplinas difíceis e desinteressantes?")

st.divider()

# --- Filtro por grupo de período ---
period_filter = st.selectbox(
    "Filtrar por grupo de período:",
    ["Todos"] + PERIOD_GROUP_ORDER,
    index=0,
)

if period_filter == "Todos":
    df_filtered = df
else:
    df_filtered = df[df["period_group"] == period_filter]

st.info(f"Mostrando dados de **{len(df_filtered)}** respondentes.")

# --- Word Clouds ---
st.subheader("Nuvens de Palavras — Disciplinas")

col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("#### 🔴 Mais Difíceis")
    freq_hard = explode_subjects(df_filtered, "hardest_subject_")
    if freq_hard:
        buf = generate_wordcloud(dict(freq_hard), "")
        st.image(buf, use_container_width=True)
    else:
        st.warning("Sem dados suficientes.")

with col2:
    st.markdown("#### 🟡 Menos Interessantes")
    freq_boring = explode_subjects(df_filtered, "least_interesting_subject_")
    if freq_boring:
        buf = generate_wordcloud(dict(freq_boring), "")
        st.image(buf, use_container_width=True)
    else:
        st.warning("Sem dados suficientes.")

with col3:
    st.markdown("#### 🟢 Mais Relevantes")
    freq_relevant = explode_subjects(df_filtered, "most_relevant_subject_")
    if freq_relevant:
        buf = generate_wordcloud(dict(freq_relevant), "")
        st.image(buf, use_container_width=True)
    else:
        st.warning("Sem dados suficientes.")

st.divider()

# --- Rankings Ponderados (3-2-1) ---
st.subheader("Rankings Ponderados (1ª opção = 3pts, 2ª = 2pts, 3ª = 1pt)")

tab1, tab2, tab3 = st.tabs(["🔴 Mais Difíceis", "🟡 Menos Interessantes", "🟢 Mais Relevantes"])

with tab1:
    top_hard = freq_hard.most_common(10)
    if top_hard:
        s = pd.Series(dict(top_hard))
        fig = horizontal_bar(s, "", color=PALETTE_CATEGORICAL[4], sort=True, precounted=True)
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

with tab2:
    top_boring = freq_boring.most_common(10)
    if top_boring:
        s = pd.Series(dict(top_boring))
        fig = horizontal_bar(s, "", color=PALETTE_CATEGORICAL[3], sort=True, precounted=True)
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

with tab3:
    top_relevant = freq_relevant.most_common(10)
    if top_relevant:
        s = pd.Series(dict(top_relevant))
        fig = horizontal_bar(s, "", color=PALETTE_CATEGORICAL[2], sort=True, precounted=True)
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

# --- Sobreposição Difíceis x Desinteressantes (RQ4) ---
st.divider()
st.subheader("Sobreposição: Difíceis × Desinteressantes")

top_hard_set = set(dict(freq_hard.most_common(15)).keys())
top_boring_set = set(dict(freq_boring.most_common(15)).keys())
overlap = top_hard_set & top_boring_set
only_hard = top_hard_set - top_boring_set
only_boring = top_boring_set - top_hard_set

col1, col2, col3 = st.columns(3)
with col1:
    st.markdown("**Só Difíceis**")
    for s in sorted(only_hard):
        st.markdown(f"- {s}")
with col2:
    st.markdown("**Difíceis E Desinteressantes**")
    if overlap:
        for s in sorted(overlap):
            st.markdown(f"- 🔶 {s}")
    else:
        st.markdown("_Nenhuma sobreposição_")
with col3:
    st.markdown("**Só Desinteressantes**")
    for s in sorted(only_boring):
        st.markdown(f"- {s}")

if overlap:
    pct = len(overlap) / len(top_hard_set | top_boring_set) * 100
    st.info(
        f"**{len(overlap)}** disciplinas aparecem em ambas as listas (top 15), "
        f"representando **{pct:.0f}%** do total combinado. "
        f"Isso sugere que {'há uma associação relevante' if pct > 30 else 'as categorias são parcialmente independentes'}."
    )
