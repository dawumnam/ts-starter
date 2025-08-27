# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
```bash
pnpm dev          # Run TypeScript compiler in watch mode
pnpm build        # Build TypeScript to dist/
pnpm start        # Run compiled application from dist/
pnpm server       # Run Fastify server directly with jiti
pnpm server:dev   # Run server in watch mode
```

### Testing
```bash
pnpm test                # Run all tests
pnpm test:watch         # Run tests in watch mode
pnpm test:coverage      # Generate coverage report
pnpm test src/math.test.ts  # Run specific test file
```

### Code Quality
```bash
pnpm lint    # Run ESLint
pnpm format  # Format code with Prettier
```

## Architecture Overview

This is a **dual-purpose TypeScript application** supporting both CLI tools and web services, built with modern ES modules and strict TypeScript configuration.

### Core Architecture Patterns

1. **Environment Configuration**: Uses Zod schemas in `src/environment.ts` for runtime validation. Always validate environment variables through this module rather than accessing `process.env` directly.

2. **Module System**: Pure ES modules with `.js` extensions in imports (even for TypeScript files). This is required for proper module resolution after compilation.

3. **Server Architecture**: Fastify-based with request ID tracking and structured logging hooks (currently commented but ready to enable). Default ports and hosts are environment-configurable.

4. **Testing Strategy**: Vitest with global test functions enabled. Test files use `.test.ts` or `.spec.ts` extensions and should be colocated with source files.

### Key Technical Decisions

- **TypeScript Strict Mode**: All strict checks enabled including `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
- **Direct Execution**: Use `jiti` for running TypeScript directly during development (server scripts)
- **Compilation Target**: ESNext with NodeNext module resolution for modern Node.js features
- **Error Handling**: Use Zod for validation errors, throw with descriptive messages

### Project-Specific Patterns

- **OpenAI Integration**: Cost calculation utilities included for token usage tracking
- **Dual Runtime**: Support for both compiled (`node dist/`) and direct TypeScript execution (`jiti src/`)
- **ESLint Configuration**: Flat config with multiple plugin layers (TypeScript, SonarJS, Perfectionist, Unicorn)

### File Import Convention

Always use `.js` extensions in imports, even when importing TypeScript files:
```typescript
import { add } from "./math.js";  // Correct
import { add } from "./math";     // Incorrect
```

This ensures proper module resolution after TypeScript compilation.