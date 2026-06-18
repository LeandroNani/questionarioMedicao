- Migração: converter main_language para suportar múltiplas seleções
- 1. Remove a constraint NOT NULL (column passa a aceitar null = primeira linguagem selecionada)
ALTER TABLE respostas ALTER COLUMN main_language DROP NOT NULL;

- 2. Adiciona coluna JSONB para guardar o array completo de linguagens selecionadas
ALTER TABLE respostas ADD COLUMN main_languages JSONB DEFAULT '[]';
