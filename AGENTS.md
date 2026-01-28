# Skills Generator

Generate Claude Code skills from project documentation with Anthony Fu's preferences.

## What Are Skills?

Skills are markdown files that help LLM agents understand tools and frameworks. See: https://code.claude.com/docs/en/skills

## Skill Source Types

There are two types of skill sources. The project lists are defined in `meta.ts`:

### Type 1: Generated Skills (`sources/`)

For OSS projects **without existing skills**. We clone the repo as a submodule and generate skills from their documentation.

- **Projects:** Vue, Nuxt, Vite, UnoCSS
- **Workflow:** Read docs → Understand → Generate skills
- **Source:** `sources/{project}/docs/`

### Type 2: Synced Skills (`vendor/`)

For projects that **already maintain their own skills**. We clone their repo as a submodule and sync their skills to ours.

- **Projects:** Slidev, VueUse
- **Workflow:** Pull updates → Copy skills
- **Source:** `vendor/{project}/skills/`

## Repository Structure

```
.
├── meta.ts                     # Project metadata (repos & URLs)
├── sources/                    # Type 1: OSS repos (generate from docs)
│   └── {project}/
│       └── docs/               # Read documentation from here
│
├── vendor/                     # Type 2: Projects with existing skills (sync only)
│   └── {project}/
│       └── skills/             # Copy skills from here
│
└── skills/                     # Output directory (generated or synced)
    └── {project}/
        ├── SKILLS.md           # Index of all skills
        ├── GENERATION.md       # Tracking metadata
        └── references/
            └── *.md            # Individual skill files
```

**Important:** The `skills/{project}/` name must match `sources/{project}/` or `vendor/{project}/`.

## Workflows

### For Generated Skills (Type 1)

#### Creating New Skills

1. **Read** source docs from `sources/{project}/docs/`
2. **Understand** the documentation thoroughly
3. **Create** skill files in `skills/{project}/references/`
4. **Create** `SKILLS.md` index listing all skills
5. **Create** `GENERATION.md` with the source git SHA

#### Updating Generated Skills

1. **Check** git diff since the SHA recorded in `GENERATION.md`:
   ```bash
   cd sources/{project}
   git diff {old-sha}..HEAD -- docs/
   ```
2. **Update** affected skill files based on changes
3. **Update** `GENERATION.md` with new SHA

### For Synced Skills (Type 2)

#### Initial Sync

1. **Copy** all files from `vendor/{project}/skills/` to `skills/{project}/`
2. **Create** `GENERATION.md` with the vendor git SHA

#### Updating Synced Skills

1. **Check** git diff since the SHA recorded in `GENERATION.md`:
   ```bash
   cd vendor/{project}
   git diff {old-sha}..HEAD -- skills/
   ```
2. **Copy** changed files from `vendor/{project}/skills/` to `skills/{project}/`
3. **Update** `GENERATION.md` with new SHA

**Note:** Do NOT modify synced skills manually. Changes should be contributed upstream to the vendor project.

## File Formats

### `SKILLS.md`

Index file listing all skills with brief descriptions:

```markdown
# {Project} Skills

- [Reactivity](references/reactivity.md) - How reactivity system works
- [Components](references/components.md) - Component basics and patterns
- [Composables](references/composables.md) - Creating and using composables
```

### `GENERATION.md`

Tracking metadata for incremental updates:

```markdown
# Generation Info

- **Source:** `sources/{project}` or `vendor/{project}`
- **Git SHA:** `abc123def456...`
- **Generated:** 2024-01-15
```

### `references/*.md`

Individual skill files. One concept per file.

```markdown
---
name: {name}
description: {description}
---

# {Concept Name}

Brief description of what this skill covers.

## Usage

Code examples and practical patterns.

## Key Points

- Important detail 1
- Important detail 2
```

## Writing Guidelines

When generating skills (Type 1 only):

1. **Rewrite for agents** - Don't copy docs verbatim; synthesize for LLM consumption
2. **Be practical** - Focus on usage patterns and code examples
3. **Be concise** - Remove fluff, keep essential information
4. **One concept per file** - Split large topics into separate skill files
5. **Include code** - Always provide working code examples
6. **Explain why** - Not just how to use, but when and why

## Supported Projects

See `meta.ts` for the canonical list of projects and their repository URLs.
