---
name: antfu-lib
description: Anthony Fu's preferences for building and publishing JavaScript/TypeScript libraries
metadata:
  author: Anthony Fu
  version: "2026.1.28"
---

# Anthony Fu's Library Development Preferences

> This skill would be accompanied with `antfu-general` skill.

Preferences for bundling and publishing TypeScript libraries.

## Key Decisions

| Aspect | Choice |
|--------|--------|
| Bundler | tsdown |
| Output | Pure ESM only (no CJS) |
| DTS | Generated via tsdown |
| Exports | Auto-generated via tsdown |

---

## tsdown Configuration

Use tsdown with these options enabled:

```ts
// tsdown.config.ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  exports: true,
})
```

| Option | Value | Purpose |
|--------|-------|---------|
| `format` | `['esm']` | Pure ESM, no CommonJS |
| `dts` | `true` | Generate `.d.ts` files |
| `exports` | `true` | Auto-update `exports` field in `package.json` |

### Multiple Entry Points

```ts
export default defineConfig({
  entry: [
    'src/index.ts',
    'src/utils.ts',
  ],
  format: ['esm'],
  dts: true,
  exports: true,
})
```

The `exports: true` option auto-generates the `exports` field in `package.json` when running `tsdown`.

---

## package.json

Required fields for pure ESM library:

```json
{
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsdown",
    "test": "vitest",
    "release": "bumpp -r"
  }
}
```

The `exports` field is managed by tsdown when `exports: true`.

---

## Testing

Unit tests are preferred. Use Vitest with standard conventions:

- Test files: `src/foo.ts` → `src/foo.test.ts` (co-located)
- Integration tests: `test/` directory
- Use `describe`/`it`, not `test`
- Use `expect` for assertions
