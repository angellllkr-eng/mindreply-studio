# Production Readiness Plan

## Current direction
Convert the repository into a clean production system with clear ownership boundaries.

## Required checks
- Validate build and deployment flow
- Confirm environment variables are documented
- Remove development-only artifacts
- Add CI verification
- Add health checks and rollback documentation

## Recommended split

- mindreply-core: shared services and backend
- mindreply-web: product interface
- mindreply-ops: infrastructure and operations
- replycontrol: independent product

## Release process
1. Validate locally
2. Run CI
3. Deploy staging
4. Run smoke tests
5. Promote production
