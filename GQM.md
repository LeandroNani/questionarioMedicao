# GQM - Questionário de Medição: Engenharia de Software PUC Minas

> **Paradigma GQM (Goal-Question-Metric)** aplicado ao questionário de medição e experimentação sobre o perfil acadêmico, tecnológico e profissional dos estudantes de Engenharia de Software da PUC Minas.

--

## Visão Geral

O GQM organiza os objetivos de medição em três níveis hierárquicos:

| Nível | Descrição |
|--|--|
| **Goal (Objetivo)** | O que se quer entender ou melhorar, e por quê |
| **Question (Questão)** | Perguntas que precisam ser respondidas para atingir o objetivo |
| **Metric (Métrica)** | Dados coletados para responder cada questão |

Este documento cobre **6 objetivos** derivados das 6 seções do formulário.

--

## Goal 1 - Caracterizar o Perfil Acadêmico dos Estudantes

**Objeto:** Estudantes de Engenharia de Software da PUC Minas  
**Propósito:** Caracterizar  
**Foco:** Perfil de entrada, progressão e situação acadêmica  
**Ponto de vista:** Coordenadores e professores do curso  

**Declaração do objetivo:**
> Caracterizar o perfil acadêmico dos estudantes de Engenharia de Software, identificando a distribuição por coorte de entrada, período atual, turno e situação acadêmica, a fim de compreender o ritmo de progressão e a taxa de regularidade da turma.

### Questões

| ID | Questão | Questão do formulário |
|--|--|--|
| Q1.1 | Qual é a distribuição dos estudantes por ano e semestre de entrada no curso? | Ano de entrada / Semestre de entrada |
| Q1.2 | Em que período letivo a maioria dos estudantes se encontra? | Período mais próximo que você está |
| Q1.3 | Qual é a proporção de estudantes por turno? | Turno atual |
| Q1.4 | Qual é a taxa de regularidade acadêmica da turma? | Situação acadêmica |
| Q1.5 | Existe correlação entre o ano de entrada e a situação de regularidade? | Ano de entrada + Situação acadêmica |

### Métricas

| ID | Métrica | Tipo | Coleta |
|--|--|--|--|
| M1.1 | Distribuição percentual de respondentes por ano de entrada | Ordinal | Frequência relativa por opção |
| M1.2 | Distribuição percentual por semestre de entrada (1º / 2º) | Nominal | Frequência relativa por opção |
| M1.3 | Distribuição percentual por período cursado (1º ao 8º) | Ordinal | Frequência relativa por opção |
| M1.4 | Percentual de estudantes por turno (Manhã / Noite) | Nominal | Frequência relativa por opção |
| M1.5 | Taxa de regularidade acadêmica: `(# regulares / total) × 100` | Razão | Contagem de status = "Regular" |
| M1.6 | Índice de defasagem: proporção de irregulares por coorte de entrada | Razão | Cruzamento ano de entrada × situação |

--

## Goal 2 - Avaliar a Percepção dos Estudantes sobre o Currículo

**Objeto:** Disciplinas do curso de Engenharia de Software  
**Propósito:** Avaliar  
**Foco:** Dificuldade, interesse e relevância percebidos  
**Ponto de vista:** Estudantes e coordenadores pedagógicos  

**Declaração do objetivo:**
> Avaliar a percepção dos estudantes em relação às disciplinas do curso, identificando quais são consideradas mais difíceis, menos interessantes e mais relevantes, a fim de subsidiar revisões curriculares e estratégias de apoio pedagógico.

### Questões

| ID | Questão | Questão do formulário |
|--|--|--|
| Q2.1 | Quais disciplinas são percebidas como mais difíceis pelos estudantes? | Matérias mais difíceis (até 3) |
| Q2.2 | Quais disciplinas são percebidas como menos interessantes? | Matérias menos interessantes (até 3) |
| Q2.3 | Quais disciplinas são consideradas mais relevantes e interessantes? | Matérias mais relevantes e interessantes (até 3) |
| Q2.4 | Há sobreposição entre disciplinas difíceis e disciplinas desinteressantes? | Cruzamento Q2.1 × Q2.2 |
| Q2.5 | A percepção de dificuldade varia conforme o período acadêmico? | Q2.1 × Período atual |

### Métricas

| ID | Métrica | Tipo | Coleta |
|--|--|--|--|
| M2.1 | Ranking das 10 disciplinas mais citadas como difíceis (frequência de menção) | Ordinal | Contagem por disciplina, posições 1–3 ponderadas |
| M2.2 | Ranking das 10 disciplinas mais citadas como menos interessantes | Ordinal | Contagem por disciplina, posições 1–3 ponderadas |
| M2.3 | Ranking das 10 disciplinas mais citadas como relevantes/interessantes | Ordinal | Contagem por disciplina, posições 1–3 ponderadas |
| M2.4 | Índice de sobreposição dificuldade–desinteresse: `(# disciplinas em M2.1 ∩ M2.2) / 10` | Razão | Cruzamento dos rankings M2.1 e M2.2 |
| M2.5 | Variação percentual de menção das top-5 difíceis por período | Intervalo | Segmentação de M2.1 por período atual |

> **Nota sobre ponderação:** Sendo "1ª opção" = 3 pts, "2ª opção" = 2 pts e "3ª opção" = 1 pt, o score ponderado reflete a intensidade da percepção, não apenas a frequência.

--

## Goal 3 - Caracterizar o Perfil Tecnológico dos Estudantes

**Objeto:** Repertório tecnológico dos estudantes (IA, linguagens, inglês)  
**Propósito:** Caracterizar  
**Foco:** Adoção de ferramentas, proficiência em linguagens e nível de inglês  
**Ponto de vista:** Professores, mercado empregador e coordenadores  

**Declaração do objetivo:**
> Caracterizar o perfil tecnológico dos estudantes de Engenharia de Software, identificando as ferramentas de IA adotadas, as linguagens de programação dominadas e o nível de proficiência em inglês, a fim de alinhar o currículo com as demandas do mercado.

### Questões

| ID | Questão | Questão do formulário |
|--|--|--|
| Q3.1 | Quais ferramentas de IA são mais utilizadas no dia a dia dos estudantes? | Qual IA você mais utiliza? |
| Q3.2 | Qual linguagem de programação é a principal no uso cotidiano? | Qual linguagem você mais utiliza atualmente? |
| Q3.3 | Qual é o repertório médio de linguagens com que os estudantes se sentem confortáveis? | Com quais linguagens você se sente confortável? |
| Q3.4 | Qual é a distribuição do nível de inglês nos estudantes? | Qual é o seu nível de inglês? |
| Q3.5 | Há correlação entre período acadêmico e amplitude do repertório tecnológico? | Q3.3 × Período atual |

### Métricas

| ID | Métrica | Tipo | Coleta |
|--|--|--|--|
| M3.1 | Distribuição percentual de uso por ferramenta de IA (ChatGPT, Claude, Gemini…) | Nominal | Frequência relativa por opção |
| M3.2 | Frequência relativa da linguagem principal (Python, JS, Java…) | Nominal | Frequência relativa por opção |
| M3.3 | Número médio de linguagens confortáveis por estudante | Razão | `sum(# linguagens selecionadas) / # respondentes` |
| M3.4 | Distribuição percentual por nível de inglês | Ordinal | Frequência relativa por opção |
| M3.5 | Coeficiente de correlação de Spearman entre período e nº de linguagens confortáveis | Intervalo | Cruzamento período × M3.3 |
| M3.6 | Taxa de uso de IA: `(# que usam alguma IA / total) × 100` | Razão | Contagem de respondentes que não selecionaram "Não uso nenhuma" |

--

## Goal 4 - Compreender a Inserção Profissional no Mercado de TI

**Objeto:** Situação profissional atual dos estudantes  
**Propósito:** Compreender  
**Foco:** Nível profissional, área de atuação, experiência, porte da empresa e remuneração  
**Ponto de vista:** Coordenadores do curso e mercado empregador  

**Declaração do objetivo:**
> Compreender o grau de inserção dos estudantes no mercado de trabalho de tecnologia, caracterizando seu nível profissional, área de atuação, tempo de experiência, tipo de empresa e faixa salarial atual, para mapear o alinhamento entre formação acadêmica e empregabilidade.

### Questões

| ID | Questão | Questão do formulário |
|--|--|--|
| Q4.1 | Qual é a taxa de empregabilidade dos estudantes na área de TI? | Nível profissional atual |
| Q4.2 | Em que níveis profissionais os estudantes estão concentrados? | Nível profissional atual |
| Q4.3 | Em quais áreas de atuação os estudantes estão inseridos? | Em qual área você atua atualmente? |
| Q4.4 | Qual é o tempo médio de experiência dos estudantes na área? | Há quanto tempo você trabalha na área de TI? |
| Q4.5 | Que tipo e porte de empresa emprega os estudantes? | Porte da empresa |
| Q4.6 | Qual é a faixa salarial atual dos estudantes empregados na área? | Faixa salarial atual |
| Q4.7 | Existe correlação entre período acadêmico e nível profissional? | Q4.2 × Período atual |

### Métricas

| ID | Métrica | Tipo | Coleta |
|--|--|--|--|
| M4.1 | Taxa de empregabilidade na área de TI: `(# que trabalham na área / total) × 100` | Razão | Respondentes com nível ≠ "Não trabalho na área" |
| M4.2 | Distribuição percentual por nível profissional | Ordinal | Frequência relativa por opção |
| M4.3 | Distribuição percentual por área de atuação (agrupada por categoria) | Nominal | Frequência relativa por opção |
| M4.4 | Distribuição por faixa de tempo de experiência em TI | Ordinal | Frequência relativa por opção |
| M4.5 | Distribuição percentual por porte de empresa | Ordinal | Frequência relativa por opção |
| M4.6 | Distribuição por faixa salarial atual | Ordinal | Frequência relativa por opção |
| M4.7 | Coeficiente de correlação de Spearman entre período cursado e nível profissional | Intervalo | Cruzamento período × nível profissional (codificado ordinalmente) |

--

## Goal 5 - Analisar as Expectativas Salariais dos Estudantes

**Objeto:** Expectativas financeiras dos estudantes em diferentes horizontes de carreira  
**Propósito:** Analisar  
**Foco:** Expectativa salarial pós-formatura, em 5 anos e em 10 anos  
**Ponto de vista:** Estudantes, coordenadores e mercado empregador  

**Declaração do objetivo:**
> Analisar as expectativas salariais dos estudantes em três horizontes temporais distintos (recém-formado, 5 anos e 10 anos), identificando a percepção sobre o retorno financeiro da carreira e comparando entre perfis com e sem experiência profissional atual.

### Questões

| ID | Questão | Questão do formulário |
|--|--|--|
| Q5.1 | Qual é a faixa salarial esperada logo após a formatura? | Expectativa salarial pós-formatura |
| Q5.2 | Qual é a faixa salarial esperada 5 anos após a formatura? | Expectativa salarial 5 anos após formatura |
| Q5.3 | Qual é a faixa salarial esperada 10 anos após a formatura? | Expectativa salarial 10 anos após formatura |
| Q5.4 | As expectativas crescem de forma consistente ao longo do tempo? | Cruzamento Q5.1 × Q5.2 × Q5.3 |
| Q5.5 | Estudantes que já trabalham na área têm expectativas salariais diferentes dos que não trabalham? | Q5.1–Q5.3 × M4.1 |

### Métricas

| ID | Métrica | Tipo | Coleta |
|--|--|--|--|
| M5.1 | Distribuição percentual por faixa salarial esperada pós-formatura | Ordinal | Frequência relativa por opção |
| M5.2 | Distribuição percentual por faixa salarial esperada (5 anos) | Ordinal | Frequência relativa por opção |
| M5.3 | Distribuição percentual por faixa salarial esperada (10 anos) | Ordinal | Frequência relativa por opção |
| M5.4 | Mediana da faixa de expectativa salarial em cada horizonte (usando ponto médio da faixa) | Intervalo | Cálculo sobre distribuição de M5.1, M5.2, M5.3 |
| M5.5 | Delta de expectativa: diferença mediana entre horizonte pós-formatura e 10 anos | Intervalo | `mediana(M5.3) − mediana(M5.1)` |
| M5.6 | Comparação de medianas de expectativa: empregados na área vs. não empregados | Intervalo | Segmentação de M5.1–M5.3 por M4.1 |

--

## Goal 6 - Identificar os Planos de Carreira Pós-Graduação

**Objeto:** Intenções e aspirações profissionais dos estudantes após a conclusão do curso  
**Propósito:** Identificar  
**Foco:** Trajetória profissional pretendida (mercado nacional/internacional, empreendedorismo, carreira pública/acadêmica)  
**Ponto de vista:** Coordenadores do curso e empregadores  

**Declaração do objetivo:**
> Identificar as trajetórias profissionais pretendidas pelos estudantes após a graduação em Engenharia de Software, mapeando a distribuição entre mercado privado nacional e internacional, empreendedorismo, carreira pública e carreira acadêmica, bem como a taxa de indefinição.

### Questões

| ID | Questão | Questão do formulário |
|--|--|--|
| Q6.1 | Qual é o destino profissional preferido pela maioria dos estudantes? | Com o que você pretende trabalhar ao se formar? |
| Q6.2 | Qual é a proporção entre intenção de mercado nacional e internacional? | Q6.1 segmentado |
| Q6.3 | Qual é a taxa de intenção empreendedora? | Q6.1 - opção "Empreender" |
| Q6.4 | Qual é a proporção de estudantes que pretende seguir carreira pública ou acadêmica? | Q6.1 - opções "Concurso público" e "Carreira acadêmica" |
| Q6.5 | Qual é a taxa de estudantes sem plano de carreira definido? | Q6.1 - opção "Ainda não sei" |

### Métricas

| ID | Métrica | Tipo | Coleta |
|--|--|--|--|
| M6.1 | Distribuição percentual por destino profissional pretendido | Nominal | Frequência relativa por opção |
| M6.2 | Razão mercado nacional / internacional: `(# mercado BR) / (# mercado exterior)` | Razão | Contagem por opção |
| M6.3 | Taxa de intenção empreendedora: `(# empreender / total) × 100` | Razão | Contagem da opção "Empreender" |
| M6.4 | Taxa de carreira pública/acadêmica: `(# concurso + # acadêmica) / total × 100` | Razão | Contagem das opções correspondentes |
| M6.5 | Taxa de indefinição: `(# "Ainda não sei" / total) × 100` | Razão | Contagem da opção "Ainda não sei" |

--

## Goal 7 - Comparar o Perfil dos Estudantes com o Mercado Brasileiro de TI

**Objeto:** Perfil tecnológico e profissional dos estudantes de ES da PUC Minas  
**Propósito:** Comparar  
**Foco:** Convergências e divergências em relação ao mercado nacional de desenvolvimento de software  
**Ponto de vista:** Pesquisadores, coordenadores do curso e mercado empregador  
**Fonte de referência:** Pesquisa Código Fonte 2024 (n=15.049 profissionais brasileiros de TI)

**Declaração do objetivo:**
> Comparar o perfil tecnológico e profissional dos estudantes de Engenharia de Software da PUC Minas com o mercado nacional de desenvolvimento de software, utilizando a Pesquisa Código Fonte 2024 como baseline de indústria, a fim de identificar convergências, lacunas de expectativa e tendências emergentes no perfil discente.

### Questões

| ID | Questão | Dimensão comparada |
|--|--|--|
| Q7.1 | A taxa de adoção de IA dos estudantes difere significativamente do mercado? | Adoção de IA |
| Q7.2 | A distribuição do nível de inglês dos estudantes é similar à do mercado? | Proficiência em inglês |
| Q7.3 | As expectativas salariais dos estudantes estão calibradas com os salários reais praticados no mercado? | Expectativa × realidade salarial |
| Q7.4 | O ranking de linguagens de programação dos estudantes converge com o do mercado? | Preferência tecnológica |
| Q7.5 | A intenção de trabalhar no exterior dos estudantes difere da proporção de profissionais que pretendem migrar? | Internacionalização da carreira |
| Q7.6 | A distribuição por área de atuação dos estudantes que trabalham converge com a do mercado? | Especialização profissional |

### Métricas

| ID | Métrica | Tipo | Teste Estatístico |
|--|--|--|--|
| M7.1 | Taxa de adoção de IA: `(# usa IA / total) × 100` comparada ao baseline do mercado (83,61%) | Razão | z-test de uma proporção (H₀: p = 0,8361) |
| M7.2 | Distribuição percentual de nível de inglês por categoria (Nenhum / Básico / Intermediário / Avançado) | Ordinal | χ² de aderência (proporções do mercado como esperadas) |
| M7.3 | Gap salarial: `mediana(expectativa estudantes) − salário_real_mercado(nível)` por horizonte temporal | Intervalo | Análise descritiva de gap (sem teste formal — comparação entre surveys distintos) |
| M7.4 | Correlação de Spearman entre o ranking de popularidade de linguagens dos estudantes e do mercado | Ordinal | Spearman ρ entre os dois rankings (linguagens comuns) |
| M7.5 | Proporção de estudantes com intenção de trabalhar no exterior comparada ao baseline do mercado (26,58%) | Razão | z-test de uma proporção (H₀: p = 0,2658) |
| M7.6 | Diferença percentual por área de atuação (Full Stack, Backend, Frontend, Mobile, Dados) entre estudantes e mercado | Nominal | Análise descritiva comparativa (gap percentual por categoria) |

> **Nota metodológica:** Os testes de proporção (z-test) e de aderência (χ²) permitem avaliar se as diferenças observadas são estatisticamente significativas, mesmo sem acesso aos microdados da pesquisa de referência. A análise de gap salarial é descritiva, pois compara medianas de perguntas com escalas diferentes entre os dois surveys.

--

## Mapa de Rastreabilidade

A tabela abaixo mapeia cada questão do formulário ao seu objetivo GQM e às métricas correspondentes.

| Seção | Questão do formulário | Goal | Questions GQM | Métricas |
|--|--|--|--|--|
| 1 | Ano de entrada | G1 | Q1.1 | M1.1, M1.6 |
| 1 | Semestre de entrada | G1 | Q1.1 | M1.2 |
| 1 | Período atual | G1 | Q1.2 | M1.3 |
| 1 | Turno atual | G1 | Q1.3 | M1.4 |
| 1 | Situação acadêmica | G1 | Q1.4, Q1.5 | M1.5, M1.6 |
| 2 | Matérias mais difíceis | G2 | Q2.1, Q2.4, Q2.5 | M2.1, M2.4, M2.5 |
| 2 | Matérias menos interessantes | G2 | Q2.2, Q2.4 | M2.2, M2.4 |
| 2 | Matérias mais relevantes/interessantes | G2 | Q2.3 | M2.3 |
| 3 | IA mais utilizada | G3 | Q3.1 | M3.1, M3.6 |
| 3 | Linguagem principal | G3 | Q3.2 | M3.2 |
| 3 | Linguagens confortáveis | G3 | Q3.3, Q3.5 | M3.3, M3.5 |
| 3 | Nível de inglês | G3 | Q3.4 | M3.4 |
| 4 | Nível profissional atual | G4 | Q4.1, Q4.2, Q4.7 | M4.1, M4.2, M4.7 |
| 4 | Área de atuação | G4 | Q4.3 | M4.3 |
| 4 | Tempo na área de TI | G4 | Q4.4 | M4.4 |
| 4 | Tempo de trabalho em geral | G4 | Q4.4 | M4.4 |
| 4 | Porte da empresa | G4 | Q4.5 | M4.5 |
| 4 | Faixa salarial atual | G4 | Q4.6 | M4.6 |
| 5 | Expectativa salarial pós-formatura | G5 | Q5.1, Q5.4, Q5.5 | M5.1, M5.4, M5.6 |
| 5 | Expectativa salarial 5 anos | G5 | Q5.2, Q5.4, Q5.5 | M5.2, M5.4, M5.6 |
| 5 | Expectativa salarial 10 anos | G5 | Q5.3, Q5.4, Q5.5 | M5.3, M5.4, M5.5, M5.6 |
| 6 | Planos de carreira pós-formatura | G6 | Q6.1–Q6.5 | M6.1–M6.5 |
| — | Comparação com mercado (RQ-C1) | G7 | Q7.1 | M7.1 |
| — | Comparação com mercado (RQ-C2) | G7 | Q7.2 | M7.2 |
| — | Comparação com mercado (RQ-C3) | G7 | Q7.3 | M7.3 |
| — | Comparação com mercado (RQ-C4) | G7 | Q7.4 | M7.4 |
| — | Comparação com mercado (RQ-C5) | G7 | Q7.5 | M7.5 |
| — | Comparação com mercado (RQ-C6) | G7 | Q7.6 | M7.6 |

--

## Resumo dos Objetivos

| ID | Objetivo | Questões | Métricas |
|--|--|--|--|
| G1 | Caracterizar o perfil acadêmico dos estudantes | Q1.1–Q1.5 | M1.1–M1.6 |
| G2 | Avaliar a percepção sobre o currículo | Q2.1–Q2.5 | M2.1–M2.5 |
| G3 | Caracterizar o perfil tecnológico dos estudantes | Q3.1–Q3.5 | M3.1–M3.6 |
| G4 | Compreender a inserção profissional no mercado de TI | Q4.1–Q4.7 | M4.1–M4.7 |
| G5 | Analisar as expectativas salariais | Q5.1–Q5.5 | M5.1–M5.6 |
| G6 | Identificar os planos de carreira pós-graduação | Q6.1–Q6.5 | M6.1–M6.5 |
| G7 | Comparar o perfil dos estudantes com o mercado brasileiro de TI | Q7.1–Q7.6 | M7.1–M7.6 |

**Total: 7 objetivos · 38 questões de medição · 40 métricas**
