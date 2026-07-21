# Brand Registry — A11-K / MindReply

> This registry is **metadata only** (no secrets). Status entries must be treated as:
> * **active** only when the backing service is connected and verified by a runtime check.
> * **placeholder** when the UI exists but dependencies are not wired.
> * **blocked** when required credentials/domains are missing.

| id | name | type | domain/subdomain | public/private | positioning | audience | cta | workflow | status | next action |
|---|---|---|---|---|---|---|---|---|---|---|
| a11k | A11-K | ENGINE_CORE | a11-k.space | public + private | Engine core behind MindReply models/workflows/brands/decisions | Angel + operators | Open Command Center | a11k_command_request | active | Deploy when Vercel limit resets |
| mind-reply | MindReply | PUBLIC_COMMERCIAL | mind-reply.com | public | Finish your website. Clear your response overload. | founders, agencies, service businesses | Start the rescue | public_intake | active | Ensure public copy deployed |
| sql-studio | SQL Studio | PUBLIC_TOOL | sql.mind-reply.com | public | Turn plain-language data questions into production-ready SQL. | operators, analysts | Turn this into a workflow | sql_request | placeholder | Verify tool route + connection status |
| code-lens | Code Lens | PUBLIC_TOOL | mind-reply.com (tools/code-lens) | public | Drop a codebase. Get explanations, fixes, tests. | devs | Start a code audit | code_lens_audit | placeholder | Verify tool route + connection status |
| ai-sdr-agent | AI SDR Agent | PUBLIC_TOOL | mind-reply.com (tools/ai-sdr-agent) | public | Plan outreach, qualify prospects, draft follow-ups. | agencies | Start Agency Client Ops | sdr_lead_sequence | placeholder | Verify tool route + connection status |
| regex-forge | Regex Forge | PUBLIC_TOOL | mind-reply.com (tools/regex-forge) | public | Build safer regex patterns with edge-case checks. | devs | Generate pattern | regex_request | placeholder | Verify tool route + connection status |
| code-tutor | Code Tutor | PUBLIC_TOOL | mind-reply.com (tools/code-tutor) | public | Learn code through guided explanations and exercises. | learners | Start lesson | tutor_lesson_request | placeholder | Verify tool route + connection status |
| l402 | L402 Skills | PUBLIC_TOOL | mind-reply.com (tools/l402-skills) | public | AI skill access and workflow monetization layer (when source supports). | teams | Explore L402 | l402_skill_intake | unknown | Inspect source before claiming active |
| a11k-labs-arena | AI Arena | EXPERIMENT | arena.a11-k.space | public | Frontier model showcase (treat as lab/experiment unless verified). | builders | Watch the engine think | arena_intake | placeholder | Verify activity before marking active |
| aether-x | Aether-X | EXPERIMENT | aether.a11-k.space | public | Lab for extended reasoning/ops experiments. | builders | Explore Aether-X | aether_intake | placeholder | Verify activity before marking active |
| kratos-s | Kratos-S | EXPERIMENT | kratos.a11-k.space | public | Lab for simulation and system routing experiments. | builders | Explore Kratos-S | kratos_intake | placeholder | Verify activity before marking active |
