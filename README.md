# Website to add, remove, edit, and view student information from a database

## User roles
Admin - Permissions to access everything
Staff - Can do everything except access the admin page to add/view users
Volunteer - Same permissions as staff

## Pages
# Admin Page
View and add/remove users from the user database
# Database Page
View the student database
# Edit Student Page
Edit students in the student database
# Edit User Page
Edit users in the user database
# Entry Page
Add students to the student database
# Index (Home) Page
Central page with MTTP logo to welcome you to the website


## Third party integrations
# Auth0
Takes care of all user authentication to signup, login, and logout of the webpage

## Tech Stack
# Frameworks
Vue.js and Nuxt.js
# Database
Prisma(SQLite)

## Deployment Notes
Being deployed in AWS

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## prisma commands
```bash

#migrate
npx prisma migrate dev --name init 

#open prisma studio
npx prisma studio

```