# Task Planner API Architecture Notes

## Scope

Auth, projects, tasks, filtering, pagination, ownership checks.

## Layers

- route/controller layer
- service/domain layer
- repository/storage layer
- auth/validation middleware

## Security Notes

- never trust client identity without token verification
- validate all user-provided payload fields
- sanitize sort/filter inputs

## Next Iterations

- refresh tokens
- rate limiting
- audit webhooks