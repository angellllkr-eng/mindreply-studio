# Production Readiness Checklist

## Deployment Gates

- [ ] Environment variables documented in `.env.example`
- [ ] Secrets stored only in deployment provider secret manager
- [ ] Build passes locally and in CI
- [ ] Health endpoint verified
- [ ] Database migrations validated
- [ ] Payment flow tested
- [ ] Error tracking configured
- [ ] Rollback path documented

## Recommended Split

Keep the platform separated into:

1. `mindreply-app` - customer-facing application
2. `mindreply-core` - shared processing and business logic
3. `mindreply-ops` - deployment, monitoring, and administration

## Current Audit Notes

The repository contains deployment documentation and two-brand references. Before production launch, deployment scripts, environment handling, infrastructure configuration, and runtime health checks must be verified against the actual codebase.
