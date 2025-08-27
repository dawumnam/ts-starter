# TypeScript Starter

A modern TypeScript starter template with ESLint, Prettier, testing setup, and AI integration examples.

## Features

- TypeScript configuration for modern development
- ESLint with recommended rules and plugins
- Prettier for code formatting
- pnpm workspace support
- Vitest for testing
- Fastify server setup
- OpenAI integration examples
- Environment variable management with dotenv and Zod validation
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
# Build TypeScript
pnpm build

# Run in watch mode
pnpm dev

# Start the application
pnpm start

# Run the Fastify server
pnpm server

# Run the server in watch mode
pnpm server:dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Lint code
pnpm lint

# Format code
pnpm format
```

### Available Scripts

- `build` - Compile TypeScript to JavaScript
- `dev` - Run TypeScript compiler in watch mode
- `start` - Run the compiled application
- `server` - Start the Fastify server
- `server:dev` - Start the server in watch mode
- `test` - Run tests with Vitest
- `test:watch` - Run tests in watch mode
- `test:coverage` - Generate test coverage report
- `lint` - Check code quality with ESLint
- `format` - Format code with Prettier

### Project Structure

```
ts-starter/
├── src/
│   ├── index.ts               # Main application entry point
│   ├── server.ts              # Fastify server
│   ├── environment.ts         # Environment configuration
│   └── jasoseo-question-list.ts # OpenAI API example
├── dist/                      # Compiled JavaScript output (generated)
├── eslint.config.ts           # ESLint configuration
├── tsconfig.json              # TypeScript configuration
├── .prettierrc                # Prettier configuration
├── package.json               # Project dependencies and scripts
├── pnpm-workspace.yaml        # pnpm workspace configuration
└── .env                       # Environment variables (create this file)
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key
```

### TypeScript

The project uses a standard TypeScript configuration suitable for Node.js applications with ES modules. Modify `tsconfig.json` to adjust compiler options.

### ESLint

ESLint is configured with:
- TypeScript support
- Promise plugin for async/await best practices
- SonarJS plugin for code quality rules
- Perfectionist plugin for sorting and formatting rules
- Unicorn plugin for additional best practices

### Testing

Tests are configured with Vitest. Create test files with `.test.ts` or `.spec.ts` extensions.

### Prettier

Code formatting is handled by Prettier with a basic configuration in `.prettierrc`.

## Dependencies

### Core Dependencies
- `fastify` - Fast web framework
- `openai` - OpenAI API client
- `zod` - TypeScript-first schema validation
- `dotenv` - Environment variable management

### Development Dependencies
- `vitest` - Testing framework
- `jiti` - Just-in-time TypeScript execution
- `typescript` - TypeScript compiler
- Full ESLint and Prettier setup

## License

MIT