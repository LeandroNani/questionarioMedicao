import streamlit as st

st.set_page_config(
    page_title="Análise - Eng. Software PUC Minas",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded",
)

pages = {
    "📊 Visão Geral": [
        st.Page("pages/1_visao_geral.py", title="Visão Geral", icon="📊"),
    ],
    "🎓 Acadêmico": [
        st.Page("pages/2_regularidade.py", title="Regularidade Acadêmica", icon="📈"),
        st.Page("pages/3_curriculo.py", title="Percepção Curricular", icon="📚"),
    ],
    "💻 Tecnologia": [
        st.Page("pages/4_tecnologia.py", title="Ferramentas e Linguagens", icon="🛠️"),
    ],
    "💼 Profissional": [
        st.Page("pages/5_profissional.py", title="Perfil Profissional", icon="💼"),
    ],
    "🚀 Carreira": [
        st.Page("pages/6_expectativas.py", title="Expectativas e Carreira", icon="🚀"),
    ],
}

nav = st.navigation(pages)
nav.run()
