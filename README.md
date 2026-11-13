# expr-calc

A command-line expression calculator written in TypeScript.

## Project layout

```
src/
  cli/         Entry point, argument parsing, REPL / output formatting
  lexer/       Turns an input string into tokens
  parser/      Builds an AST from tokens
  evaluator/   Walks the AST and computes a result
  errors/      Shared error types (syntax, evaluation, etc.)
tests/
  unit/        Tests for individual modules
  integration/ End-to-end tests that run the CLI
```

## Scripts

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Run the CLI from source with `tsx` |
| `npm run build`      | Compile `src/` to `dist/`          |
| `npm start`          | Run the compiled CLI               |
| `npm test`           | Run tests once with Vitest         |
| `npm run test:watch` | Run tests in watch mode            |
| `npm run typecheck`  | Type-check without emitting        |
| `npm run lint`       | Lint with ESLint                   |
| `npm run format`     | Format with Prettier               |

## Imports

Import project files with the `#` alias instead of relative paths, e.g.
`import { tokenize } from "#lexer/index.js"`. The alias is defined in the
`imports` field of `package.json`: it resolves to `src/` under the
`development` condition (used by `tsc`, `tsx` and Vitest) and to `dist/`
for the compiled CLI. Always use the `.js` extension.
