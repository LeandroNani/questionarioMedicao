# Perfil Acadêmico, Tecnológico e Profissional dos Estudantes de Engenharia de Software da PUC Minas

**Disciplina:** Medição e Experimentação em Engenharia de Software  
**Instituição:** Pontifícia Universidade Católica de Minas Gerais  
**Semestre:** 2026/1  
**Autores:** [Nomes dos integrantes do grupo]

--

## 1. Introdução

### 1.1 Contexto

Este trabalho apresenta os resultados de um survey aplicado aos estudantes do curso de Engenharia de Software da PUC Minas, com o objetivo de caracterizar o perfil acadêmico, tecnológico e profissional dos alunos. O questionário abordou seis eixos temáticos: perfil acadêmico, percepção curricular, ferramentas e tecnologias, inserção profissional, expectativas salariais e planos de carreira.

### 1.2 Metodologia

- **Instrumento:** Questionário online desenvolvido com Next.js 16 e Supabase, com 6 seções e 20+ perguntas.
- **Período de coleta:** Junho de 2026.
- **Amostra:** 90 respondentes, abrangendo os períodos P1 a P8 do curso.
- **Análise:** Estatística descritiva (frequências, medianas, distribuições) e inferencial (correlação de Spearman, teste de Mann-Whitney U, teste Qui-Quadrado).
- **Visualização:** Dashboard interativo em Streamlit com gráficos Plotly e Word Clouds.

### 1.3 Research Questions

As seguintes perguntas de pesquisa guiaram a análise:

| ID | Research Question |
|--|--|
| RQ1 | Como se distribui a amostra por período, turno e situação acadêmica? |
| RQ2 | A partir de qual período a irregularidade se torna predominante? |
| RQ3 | Quais disciplinas são percebidas como mais difíceis, menos interessantes e mais relevantes? |
| RQ4 | Existe sobreposição entre disciplinas consideradas difíceis e desinteressantes? |
| RQ5 | Qual é o panorama de adoção de ferramentas de IA entre os estudantes? |
| RQ6 | Quais linguagens dominam e o repertório se amplia com a progressão acadêmica? |
| RQ7 | O nível de inglês está associado a melhores cargos e salários? |
| RQ8 | Qual é o perfil profissional dos estudantes que trabalham na área? |
| RQ9 | Existe correlação entre período acadêmico e nível profissional? |
| RQ10 | As expectativas salariais diferem entre quem trabalha e quem não trabalha? |
| RQ11 | Alunos do início do curso têm expectativas diferentes dos do final? |
| RQ12 | Qual destino profissional é o mais desejado? |

--

## 2. Caracterização da Amostra (RQ1)

### 2.1 Visão Geral

| Métrica | Valor |
|--|--|
| Total de respondentes | 90 |
| Turno Manhã | 52 (57,8%) |
| Turno Noite | 38 (42,2%) |
| Situação Regular | 63 (70,0%) |
| Situação Irregular | 27 (30,0%) |

### 2.2 Distribuição por Período

| Período | n | % do total |
|--|--|--|
| P1 | 39 | 43,3% |
| P2 | 10 | 11,1% |
| P3 | 4 | 4,4% |
| P4 | 2 | 2,2% |
| P5 | 9 | 10,0% |
| P6 | 14 | 15,6% |
| P7 | 11 | 12,2% |
| P8 | 1 | 1,1% |

> **Gráfico:** Donut chart mostrando a proporção de respondentes por período.

A amostra concentra-se nos extremos do curso: 54,4% estão no início (P1-P2) e 28,9% estão no final (P6-P8). Os períodos intermediários (P3-P5) somam apenas 16,7%, o que pode refletir a menor quantidade de turmas nessa faixa ou dificuldade de engajamento desses alunos na pesquisa.

### 2.3 Distribuição por Ano de Entrada

A maioria dos respondentes (47,8%) ingressou em 2026, seguida por 25,6% em 2023 e 11,1% em 2025. Alunos de coortes anteriores (2019-2022) somam apenas 7,8%, indicando que a base é predominantemente composta por calouros recentes e alunos de meio de curso.

--

## 3. Regularidade Acadêmica (RQ2)

### 3.1 Evolução da Irregularidade por Período

| Período | Total | Irregulares | % Irregular |
|--|--|--|--|
| P1 | 39 | 1 | 3% |
| P2 | 10 | 3 | 30% |
| P3 | 4 | 3 | 75% |
| P4 | 2 | 1 | 50% |
| P5 | 9 | 4 | 44% |
| P6 | 14 | 10 | 71% |
| P7 | 11 | 5 | 45% |

> **Gráfico:** Stacked bar chart 100% (Regular vs. Irregular por período) + linha de tendência da taxa de irregularidade.

### 3.2 Análise

A irregularidade apresenta um **salto abrupto entre P1 e P2**: de apenas 3% para 30%. A partir do P3, a taxa ultrapassa 44% e atinge o pico de **75% no P3** e **71% no P6**. Isso sugere que:

1. O primeiro semestre funciona como um "filtro" onde quase todos ainda estão regulares.
2. A partir do segundo período, uma parcela significativa dos alunos já acumula dependências.
3. No P6, quando as disciplinas de maior carga teórica se acumulam (FPAA, Grafos, Estatística), a irregularidade é quase universal.

**Insight principal:** A progressão curricular impõe um gargalo a partir do P2, e a irregularidade se consolida como norma a partir do P3. Estratégias de apoio pedagógico deveriam focar nos períodos P2-P3 para evitar o acúmulo em cascata.

--

## 4. Percepção Curricular (RQ3, RQ4)

### 4.1 Disciplinas Mais Difíceis

Ranking ponderado (1ª opção = 3pts, 2ª = 2pts, 3ª = 1pt):

| # | Disciplina | Score |
|--|--|--|
| 1 | Computabilidade | 95 |
| 2 | Introdução à Algoritmos | 88 |
| 3 | Fund. Projeto e Análise de Algoritmos (FPAA) | 74 |
| 4 | Algoritmos e Estruturas de Dados II (AEDS II) | 57 |
| 5 | Cálculo II | 34 |
| 6 | Teoria dos Grafos e Computabilidade | 29 |
| 7 | Desenvolvimento de Interfaces Web | 22 |
| 8 | Introdução à Computação | 17 |
| 9 | Programação Modular | 16 |
| 10 | Algoritmos e Estruturas de Dados I (AEDS I) | 16 |

> **Gráfico:** Word Cloud (tamanho proporcional ao score) + bar chart horizontal.

As disciplinas com foco em **fundamentos teóricos e algorítmicos** dominam o ranking de dificuldade. Computabilidade lidera com score 95, seguida de Introdução à Algoritmos (88) e FPAA (74). As 4 primeiras posições são todas de algoritmos/teoria da computação.

### 4.2 Disciplinas Menos Interessantes

| # | Disciplina | Score |
|--|--|--|
| 1 | Computabilidade | 44 |
| 1 | Introdução à Computação | 44 |
| 3 | Desenvolvimento de Interfaces Web | 32 |
| 4 | Introdução à Pesquisa em Informática | 29 |
| 5 | Modelagem de Processos de Negócios | 28 |
| 6 | Fund. de Engenharia de Software | 20 |
| 6 | Gerência de Configuração e Evolução de Software | 20 |

> **Gráfico:** Word Cloud + bar chart horizontal.

Aqui há uma mistura: disciplinas teóricas (Computabilidade) aparecem ao lado de disciplinas percebidas como pouco práticas (Intro à Computação, Intro à Pesquisa, Modelagem de Processos).

### 4.3 Disciplinas Mais Relevantes

| # | Disciplina | Score |
|--|--|--|
| 1 | Introdução à Algoritmos | 87 |
| 2 | Fundamentos de Engenharia de Software | 55 |
| 3 | AEDS II | 32 |
| 4 | AEDS I | 29 |
| 5 | Arquitetura de Software | 27 |
| 5 | Computabilidade | 27 |
| 7 | Programação Modular | 26 |
| 8 | Desenvolvimento de Interfaces Web | 25 |

> **Gráfico:** Word Cloud + bar chart horizontal.

Introdução à Algoritmos é percebida simultaneamente como a **2ª mais difícil** e a **1ª mais relevante**, mostrando que os alunos reconhecem o valor das disciplinas fundamentais mesmo quando as consideram desafiadoras.

### 4.4 Sobreposição Dificuldade × Desinteresse (RQ4)

**5 disciplinas** aparecem tanto entre as 15 mais difíceis quanto entre as 15 menos interessantes:

- Computabilidade
- Desenvolvimento de Interfaces Web
- Introdução à Algoritmos
- Introdução à Computação
- TI: Aplicações Web

> **Gráfico:** Diagrama de sobreposição em 3 colunas (Só Difíceis / Ambas / Só Desinteressantes).

**Insight:** A sobreposição parcial sugere que dificuldade e desinteresse são categorias **parcialmente correlacionadas, mas não idênticas**. Computabilidade, por exemplo, é ao mesmo tempo a mais difícil e a mais desinteressante. Porém, disciplinas como FPAA e AEDS II são consideradas difíceis mas *não* desinteressantes - indicando que os alunos as percebem como desafiadoras mas valiosas.

--

## 5. Ferramentas de IA (RQ5)

### 5.1 Adoção

| Ferramenta | n | % |
|--|--|--|
| Claude | 35 | 38,9% |
| ChatGPT | 27 | 30,0% |
| Gemini | 23 | 25,6% |
| Copilot | 3 | 3,3% |
| Perplexity | 1 | 1,1% |
| Não uso nenhuma | 1 | 1,1% |

> **Gráfico:** Donut chart.

**Taxa de adoção de IA: 98,9%** - apenas 1 respondente declarou não utilizar nenhuma ferramenta de IA. O trio Claude-ChatGPT-Gemini concentra 94,4% do uso, com o Claude liderando com 38,9%.

**Insight:** A adoção de IA é praticamente universal entre os estudantes. A liderança do Claude é um dado relevante considerando que o ChatGPT historicamente dominou o mercado - pode indicar uma tendência emergente entre desenvolvedores.

--

## 6. Linguagens de Programação (RQ6)

### 6.1 Linguagens Utilizadas Atualmente

| Linguagem | Menções |
|--|--|
| Python | 68 |
| JavaScript | 54 |
| Java | 23 |
| TypeScript | 18 |
| C# | 11 |
| C | 9 |
| C++ | 6 |
| Dart/Flutter | 5 |
| Go | 4 |

> **Gráfico:** Bar chart horizontal.

### 6.2 Linguagens Confortáveis

| Linguagem | Menções |
|--|--|
| Python | 66 |
| JavaScript | 37 |
| Java | 19 |
| TypeScript | 17 |
| C | 12 |
| C# | 11 |
| C++ | 7 |
| Dart/Flutter | 4 |
| Go | 3 |

> **Gráfico:** Bar chart horizontal.

Python domina ambas as listas como a linguagem mais usada (68 menções) e mais confortável (66). JavaScript aparece em 2º lugar, seguido por Java - refletindo as linguagens ensinadas no currículo do curso.

### 6.3 Repertório Cresce com o Curso?

| Métrica | Valor |
|--|--|
| Média de linguagens confortáveis | 2,00 |
| Mediana | 2,0 |

**Teste de Spearman:** ρ = 0,349, p = 0,0008 (n = 90)

> **Gráfico:** Box plot de nº de linguagens confortáveis por grupo de período.

**Resultado:** Correlação **moderada positiva e estatisticamente significativa** entre período cursado e número de linguagens confortáveis. Estudantes em períodos mais avançados tendem a ter um repertório tecnológico mais amplo - o que é esperado e valida que o currículo cumpre seu papel de expandir o domínio técnico.

--

## 7. Nível de Inglês (RQ7)

### 7.1 Distribuição

| Nível | n | % |
|--|--|--|
| Intermediário | 31 | 34,4% |
| Avançado | 28 | 31,1% |
| Básico | 16 | 17,8% |
| Fluente | 13 | 14,4% |
| Nenhum | 2 | 2,2% |

> **Gráfico:** Bar chart horizontal.

A maioria dos alunos (80%) possui nível intermediário ou superior. Apenas 2 alunos declararam não ter nenhum conhecimento de inglês.

### 7.2 Inglês × Salário

**Teste de Spearman:** ρ = 0,019, p = 0,9018 (n = 43)

**Resultado:** Correlação **desprezível e não significativa** entre nível de inglês e salário atual. Isso pode ser explicado pelo fato de que a maioria dos respondentes empregados está em níveis iniciais de carreira (estagiários e juniores), onde a variação salarial é mais determinada pelo tipo de contrato do que pela proficiência em inglês.

> **Gráfico:** Heatmap cruzando nível de inglês × nível profissional.

--

## 8. Perfil Profissional (RQ8, RQ9)

### 8.1 Situação Profissional

| Nível | n | % |
|--|--|--|
| Não trabalho na área | 42 | 46,7% |
| Estagiário | 22 | 24,4% |
| Analista/Dev Júnior | 14 | 15,6% |
| Dev Pleno | 4+1 | 5,6% |
| Outros (Trainee, Assistente, etc.) | 7 | 7,8% |

> **Gráfico:** Bar chart horizontal.

**Taxa de empregabilidade na área: 53,3%** - mais da metade dos alunos já trabalham com tecnologia.

### 8.2 Áreas de Atuação

| Área | n |
|--|--|
| Full Stack | 17 |
| Backend | 6 |
| Machine Learning/IA | 4 |
| Frontend | 2 |
| Segurança da Informação | 2 |
| Product Owner/PM | 2 |
| Dados/Data Science | 2 |
| Outras | 13 |

> **Gráfico:** Treemap (tamanho proporcional à frequência).

Full Stack é a área dominante com 35,4% dos que trabalham, seguido por Backend (12,5%). A presença de Machine Learning/IA (8,3%) já como 3ª área é um dado relevante que reflete a tendência do mercado.

### 8.3 Tempo de Experiência e Porte da Empresa

- **Tempo na área:** 37,5% têm 1-2 anos, 20,8% têm 2-4 anos.
- **Porte da empresa:** Grande empresa/corporação lidera (31,3%), seguida por Startups (22,9%) e Multinacionais (20,8%).

### 8.4 Faixa Salarial Atual

| Faixa | n |
|--|--|
| R$ 2.000 – R$ 4.000 | 15 |
| R$ 1.000 – R$ 2.000 | 13 |
| R$ 4.000 – R$ 6.000 | 7 |
| Acima de R$ 6.000 | 3 |
| R$ 500 – R$ 1.000 | 3 |
| Até R$ 500 | 2 |

A concentração nas faixas R$1.000-R$4.000 é coerente com o perfil predominante de estagiários e juniores.

### 8.5 Período × Nível Profissional (RQ9)

**Teste de Spearman:** ρ = 0,722, p < 0,0001 (n = 88)

> **Gráfico:** Heatmap cruzando período × nível profissional.

**Resultado:** Correlação **forte positiva e altamente significativa**. Este é o resultado estatístico mais expressivo do survey. Estudantes em períodos avançados ocupam sistematicamente posições profissionais mais elevadas. A progressão acadêmica está **fortemente alinhada** com a progressão de carreira.

**Detalhamento:**
- P1-P2: predominância de "Não trabalho na área" (a maioria são calouros)
- P5-P6: concentração de Estagiários e Juniores
- P7-P8: presença de Plenos e até um Sênior

--

## 9. Expectativas Salariais (RQ10, RQ11)

### 9.1 Três Horizontes Temporais

| Faixa | Pós-formatura | 5 anos | 10 anos |
|--|--|--|--|
| Até R$ 3.000 | 2,2% | 1,1% | - |
| R$ 3.000 – R$ 5.000 | 27,8% | - | - |
| R$ 5.000 – R$ 8.000 | 28,9% | 8,9% | 1,1% |
| R$ 8.000 – R$ 12.000 | 22,2% | 33,3% | 5,6% |
| R$ 12.000 – R$ 18.000 | 3,3% | 27,8% | 18,9% |
| Acima de R$ 18.000 | 12,2% | 27,8% | **73,3%** |

> **Gráfico:** Grouped bar chart comparando os 3 horizontes lado a lado.

A progressão é clara: a mediana esperada sobe de **R$ 6.500** (pós-formatura) para **R$ 15.000** (5 anos) e **R$ 22.000** (10 anos). Em 10 anos, 73,3% dos alunos esperam ganhar acima de R$ 18.000.

### 9.2 Quem Trabalha vs. Quem Não Trabalha (RQ10)

**Teste de Mann-Whitney U:**

| Horizonte | Mediana (trabalha) | Mediana (não trabalha) | U | p-valor |
|--|--|--|--|--|
| Pós-formatura | R$ 6.500 | R$ 6.500 | 1006 | 0,5611 |
| 5 anos | R$ 15.000 | R$ 10.000 | 1094 | 0,3443 |
| 10 anos | R$ 22.000 | R$ 22.000 | 1002 | 0,8506 |

**Resultado:** Nenhuma diferença estatisticamente significativa (p > 0,05 em todos os horizontes). Quem já trabalha e quem não trabalha têm expectativas salariais **semelhantes**. Isso sugere que a expectativa é formada mais pela percepção geral do mercado do que pela experiência individual.

### 9.3 Início vs. Fim do Curso (RQ11)

**Teste de Mann-Whitney U:**

| Horizonte | Mediana (P1-P2) | Mediana (P6-P8) | U | p-valor |
|--|--|--|--|--|
| Pós-formatura | R$ 6.500 | R$ 6.500 | 554 | 0,7911 |
| 5 anos | R$ 15.000 | R$ 15.000 | 588 | 0,7742 |
| 10 anos | R$ 22.000 | R$ 22.000 | 644 | 0,6486 |

**Resultado:** Nenhuma diferença significativa. Alunos do início e do fim do curso compartilham as mesmas expectativas salariais. Ou seja, a experiência acadêmica e profissional acumulada ao longo do curso **não altera significativamente** a percepção sobre o retorno financeiro esperado.

--

## 10. Planos de Carreira (RQ12)

### 10.1 Intenção Profissional

| Destino | n | % |
|--|--|--|
| Mercado privado no exterior | 43 | 47,8% |
| Empreender | 20 | 22,2% |
| Indefinido | 12 | 13,3% |
| Mercado privado no Brasil | 8 | 8,9% |
| Concurso público | 4 | 4,4% |
| Carreira acadêmica | 3 | 3,3% |

> **Gráfico:** Bar chart horizontal + stacked bar 100% por grupo de período.

**Quase metade dos estudantes (47,8%) pretende trabalhar no exterior.** Somado aos que querem empreender (22,2%), 70% da turma planeja trajetórias não tradicionais.

Apenas 8,9% apontam o mercado privado brasileiro como destino principal, e somente 4,4% pretende prestar concurso público.

### 10.2 Carreira × Período

**Teste Qui-Quadrado:** χ² = 14,72, p = 0,1427, gl = 10

**Resultado:** Sem associação estatisticamente significativa entre grupo de período e intenção de carreira (p > 0,05). A distribuição de preferências é **homogênea** ao longo do curso - a aspiração de ir para o exterior, por exemplo, não aumenta nem diminui com a progressão acadêmica.

> **Gráfico:** Stacked bar chart 100% (intenção de carreira por grupo de período).

--

## 11. Síntese dos Resultados Estatísticos

| Teste | Variáveis | Resultado | p-valor | Interpretação |
|--|--|--|--|--|
| Spearman | Período × Nº linguagens | ρ = 0,349 | 0,0008 | Correlação moderada positiva ✅ |
| Spearman | Inglês × Salário | ρ = 0,019 | 0,9018 | Sem correlação ❌ |
| Spearman | Período × Nível profissional | ρ = 0,722 | < 0,0001 | Correlação forte positiva ✅ |
| Mann-Whitney | Expectativa: trabalha vs. não | - | > 0,34 | Sem diferença significativa ❌ |
| Mann-Whitney | Expectativa: início vs. fim | - | > 0,64 | Sem diferença significativa ❌ |
| Qui-Quadrado | Carreira × Período | χ² = 14,72 | 0,1427 | Sem associação significativa ❌ |

**Correlações confirmadas (2/6):**
1. O repertório de linguagens cresce com a progressão acadêmica.
2. O nível profissional acompanha fortemente a progressão no curso.

**Hipóteses refutadas (4/6):**
1. Inglês não se correlaciona com salário nesta amostra (provavelmente pelo nível de carreira homogêneo).
2. Trabalhar ou não trabalhar não muda a expectativa salarial.
3. Estar no início ou no fim do curso também não muda.
4. A intenção de carreira é independente do período.

--

## 12. Principais Insights e Conclusões

### Status Atual

1. **Irregularidade é a norma a partir do 3º período.** O salto de 3% (P1) para 75% (P3) é alarmante e indica um problema estrutural no fluxo curricular.

2. **Python é a linguagem dominante**, mencionada por 75,6% dos respondentes. JavaScript é a 2ª (60%). Java, historicamente forte, aparece em 3º com apenas 25,6%.

3. **IA é universalmente adotada** (98,9%). Claude lidera sobre ChatGPT, contrariando a percepção popular. Gemini ocupa o 3º lugar.

4. **53,3% já trabalham na área**, com concentração em Full Stack e Backend. A faixa salarial predominante é R$ 1.000 – R$ 4.000 (estagiários e juniores).

5. **Computabilidade é a disciplina mais polarizante**: a mais difícil E a menos interessante. Já Introdução à Algoritmos é percebida como difícil mas extremamente relevante.

### Tendências e Expectativas Futuras

6. **47,8% querem ir para o exterior** - dado expressivo que reflete a globalização da carreira de TI e possivelmente insatisfação com o mercado nacional.

7. **73,3% esperam ganhar acima de R$ 18.000 em 10 anos** - expectativa ambiciosa mas não irrealista para desenvolvedores seniores no mercado de TI.

8. **A experiência não calibra as expectativas**: quem já trabalha tem as mesmas expectativas de quem não trabalha. Isso pode indicar otimismo generalizado ou falta de referência salarial concreta.

9. **O período acadêmico é o melhor preditor de nível profissional** (ρ = 0,722), confirmando que a progressão no curso se traduz diretamente em progressão de carreira.

--

## 13. Limitações

- **Amostra concentrada:** 54,4% dos respondentes estão em P1-P2, o que pode enviesar resultados para a percepção de calouros.
- **Autoavaliação:** Nível de inglês e competência em linguagens são autodeclarados, sem validação objetiva.
- **Corte transversal:** Os dados refletem um momento específico (junho/2026), sem comparação longitudinal.
- **N = 90:** Amostra suficiente para estatística descritiva, mas que limita o poder de testes inferenciais em subgrupos menores.

--

## 14. Trabalhos Futuros

- Repetir o survey semestralmente para análise longitudinal.
- Cruzar dados com desempenho acadêmico real (notas) para validar a percepção de dificuldade.
- Ampliar a amostra para outros cursos de TI da PUC Minas.
- Investigar a relação entre uso de IA e desempenho acadêmico.
