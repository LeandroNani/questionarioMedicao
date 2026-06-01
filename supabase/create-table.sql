CREATE TABLE respostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Seção 1: Identificação
  entry_year       INTEGER NOT NULL,
  entry_semester   INTEGER NOT NULL,
  shift            TEXT NOT NULL,
  current_period   INTEGER NOT NULL,
  academic_status  TEXT NOT NULL,

  -- Seção 2: Disciplinas (3 colunas por pergunta, ordem = prioridade)
  hardest_subject_1           TEXT,
  hardest_subject_2           TEXT,
  hardest_subject_3           TEXT,
  least_interesting_subject_1 TEXT,
  least_interesting_subject_2 TEXT,
  least_interesting_subject_3 TEXT,
  most_relevant_subject_1     TEXT,
  most_relevant_subject_2     TEXT,
  most_relevant_subject_3     TEXT,

  -- Seção 3: Ferramentas
  ai_tool                    TEXT NOT NULL,
  ai_tool_other              TEXT,
  main_language              TEXT NOT NULL,
  main_language_other        TEXT,
  comfortable_languages      JSONB DEFAULT '[]',
  comfortable_languages_other TEXT,
  english_level              TEXT,

  -- Seção 4: Carreira
  professional_level       TEXT NOT NULL,
  professional_level_other TEXT,
  work_area                TEXT,
  work_area_other          TEXT,
  time_in_tech             TEXT NOT NULL,
  time_working_general     TEXT NOT NULL,
  company_size             TEXT,
  current_salary           TEXT,

  -- Seção 5: Expectativas salariais
  salary_after_graduation TEXT NOT NULL,
  salary_5_years          TEXT NOT NULL,
  salary_10_years         TEXT NOT NULL,

  -- Seção 6: Planos
  career_intention TEXT NOT NULL
);

-- RLS: permitir INSERT anônimo
ALTER TABLE respostas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON respostas
  FOR INSERT
  TO anon
  WITH CHECK (true);
