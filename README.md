# Next / Material UI / Typescript Boilerplate

Quick start for NextJS projects using TypeScript, and Material UI for styles/components.

## Installation

- Clone the repo and `cd` to the project root
- `yarn` to install dependencies

Normal NextJS scripts are in `package.json`:

- `yarn dev` - start development server
- `yarn build` - create production build
- `yarn start` - serve production build

## Environment

Local environment variables should be stored in `.env.local`. You can copy example values from `.env.local.example`:

```
NEXT_PUBLIC_SITE_TITLE='My Great Next Site'
```

You can supply ambient type definitions for required environment vars in `./types/env.d.ts`.

## Code Quality

### Formatting

This project uses Prettier for code formatting. You should set up your editor to format on save. To format the whole codebase, use `yarn format`

### Linting

ESLint is used for linting. Invoke it with `yarn lint`
