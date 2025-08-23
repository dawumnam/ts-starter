# TypeScript Starter

A modern TypeScript starter template with ESLint, Prettier, and pnpm workspace support.

## Features

- TypeScript configuration for modern development
- ESLint with recommended rules and plugins
- Prettier for code formatting
- pnpm workspace support
- Pre-configured gitignore

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Or with npm
npm install
```

### Development

```bash
# Run the TypeScript compiler in watch mode
pnpm tsc --watch

# Run your application
pnpm node dist/index.js
```

### Scripts

Add these scripts to your package.json for easier development:

```json
"scripts": {
  "build": "tsc",
  "dev": "tsx src/index.ts",
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

### Project Structure

```
ts-starter/
├── src/
│   └── index.ts       # Main application entry point
├── dist/              # Compiled JavaScript output (generated)
├── eslint.config.ts   # ESLint configuration
├── tsconfig.json      # TypeScript configuration
├── .prettierrc        # Prettier configuration
├── package.json       # Project dependencies and scripts
└── pnpm-workspace.yaml # pnpm workspace configuration
```

## Configuration

### TypeScript

The project uses a standard TypeScript configuration suitable for Node.js applications. Modify `tsconfig.json` to adjust compiler options.

### ESLint

ESLint is configured with:
- TypeScript support
- Promise plugin for async/await best practices
- SonarJS plugin for code quality rules

### Prettier

Code formatting is handled by Prettier with a basic configuration in `.prettierrc`.

## License

MIT