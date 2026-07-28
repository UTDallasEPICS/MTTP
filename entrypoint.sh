#!/bin/sh

# Apply migrations and initialize migrations if it does not exist
pnpm prisma generate
pnpm prisma migrate deploy
# Commenting out because we aren't seeding anything
# pnpm prisma db seed

# Run the CMD command from the dockerfile
exec "$@"