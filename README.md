# March To The Polls voter database

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


Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
Deployment will be done with Google Cloud as MTTP will be maintaining the webapp on their end.


Editing entries in the student database from the View Database page is still under development


