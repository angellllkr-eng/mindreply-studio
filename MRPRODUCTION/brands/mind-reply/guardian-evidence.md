# Guardian Evidence Report

Values are redacted. Use this only to locate and fix risky lines.
Total evidence hits: 33


## CLOUDFLARE_DEPLOYMENT_COMPLETE.md

- Line 48 — `possible_secret_assignment`
  ```text
  OPENAI_API_KEY=[REDACTED]
  ```
- Line 292 — `possible_secret_assignment`
  ```text
  const apiKey = [REDACTED]
  ```
- Line 521 — `possible_secret_assignment`
  ```text
  apiToken: [REDACTED] secrets.CLOUDFLARE_API_TOKEN }}
  ```
- Line 529 — `possible_secret_assignment`
  ```text
  OPENAI_API_KEY: [REDACTED] secrets.OPENAI_API_KEY }}
  ```

## COMPLETE_DELIVERABLES.md

- Line 203 — `possible_secret_assignment`
  ```text
  export OPENAI_API_KEY=[REDACTED]"
  ```

## COMPLETE_SYSTEM_SUMMARY.md

- Line 366 — `placeholder`
  ```text
  # 2. Add your secrets
  ```
- Line 367 — `possible_secret_assignment`
  ```text
  export OPENAI_API_KEY=[REDACTED]"
  ```

## DELIVERABLES.md

- Line 122 — `possible_secret_assignment`
  ```text
  # Edit .env and add OPENAI_API_KEY=[REDACTED]
  ```

## docker-compose.yml

- Line 11 — `possible_secret_assignment`
  ```text
  POSTGRES_PASSWORD: [REDACTED]
  ```
- Line 38 — `possible_secret_assignment`
  ```text
  DATABASE_URL: postgresql://mindreply_user:${DB_PASSWORD:[REDACTED]
  ```
- Line 39 — `possible_secret_assignment`
  ```text
  OPENAI_API_KEY: [REDACTED]
  ```
- Line 44 — `possible_secret_assignment`
  ```text
  SALESFORCE_CLIENT_SECRET: [REDACTED]
  ```
- Line 45 — `possible_secret_assignment`
  ```text
  JWT_SECRET: [REDACTED]
  ```
- Line 85 — `possible_secret_assignment`
  ```text
  PGADMIN_DEFAULT_PASSWORD: [REDACTED]
  ```

## QUICKSTART.md

- Line 12 — `possible_secret_assignment`
  ```text
  # - OPENAI_API_KEY=[REDACTED]
  ```
- Line 123 — `dangerous_command`
  ```text
  docker compose down -v
  ```
- Line 149 — `possible_secret_assignment`
  ```text
  OPENAI_API_KEY=[REDACTED]
  ```
- Line 149 — `placeholder`
  ```text
  OPENAI_API_KEY=[REDACTED]
  ```
- Line 156 — `possible_secret_assignment`
  ```text
  JWT_SECRET=[REDACTED]
  ```
- Line 159 — `possible_secret_assignment`
  ```text
  DB_PASSWORD=[REDACTED]
  ```

## README.md

- Line 41 — `possible_secret_assignment`
  ```text
  export OPENAI_API_KEY=[REDACTED]"
  ```
- Line 41 — `placeholder`
  ```text
  export OPENAI_API_KEY=[REDACTED]"
  ```
- Line 43 — `placeholder`
  ```text
  export SUPABASE_KEY="your-key"
  ```

## SOCIAL_DEPLOYMENT_PARALLEL.md

- Line 759 — `possible_secret_assignment`
  ```text
  vars = { ENVIRONMENT = "production", API_KEY = [REDACTED]" }
  ```

## START_HERE.md

- Line 101 — `possible_secret_assignment`
  ```text
  OPENAI_API_KEY=[REDACTED]
  ```
- Line 101 — `placeholder`
  ```text
  OPENAI_API_KEY=[REDACTED]
  ```
- Line 122 — `possible_secret_assignment`
  ```text
  SALESFORCE_CLIENT_SECRET=[REDACTED]
  ```
- Line 122 — `placeholder`
  ```text
  SALESFORCE_CLIENT_SECRET=[REDACTED]
  ```
- Line 149 — `placeholder`
  ```text
  - [ ] Edit `.env` with your secrets (OpenAI key, etc.)
  ```

## STRATEGY_APPLIED.md

- Line 182 — `possible_secret_assignment`
  ```text
  OPENAI_API_KEY=[REDACTED]
  ```
- Line 237 — `possible_secret_assignment`
  ```text
  Password: [REDACTED]
  ```

## server/index-enhanced.js

- Line 28 — `possible_secret_assignment`
  ```text
  apiKey: [REDACTED]
  ```

## server/index.js

- Line 28 — `possible_secret_assignment`
  ```text
  apiKey: [REDACTED]
  ```
