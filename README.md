# Anthony Fu's Skills

A curated collection of [agent skills](https://agentskills.io/home) with [Anthony Fu](https://github.com/antfu)'s preferences, experience, tastes and best practices. Also includes the usage documentation for those tools.

> [!IMPORTANT]
> This is an proof-of-concept project for generating agent skills from source documentation and keep them syncing.
> I haven't fully used/tested how well the skills would perform, so feedback and contributions are much appreciated.

## Installation

```bash
npx skills add antfu/skills
```

Learn more about the cli usage at [skills](https://github.com/vercel-labs/skills).

## Skills

When installing `antfu/skills`, all the following skills will be included (you can also select them in the CLI prompt).

### Hand-maintained Skills

Skills are maintained manually by Anthony Fu with his tools/setup preferences and best practices.

| Skill | Description |
|-------|-------------|
| [antfu-general](skills/antfu-general) | General skills for projects setup (eslint, pnpm, VitePress) |
| [antfu-lib](skills/antfu-lib) | Library skills for library projects setup |
| [antfu-app](skills/antfu-app) | Application skills for application projects setup (Vue, Nuxt, Vite) |

### Skills Generated from Official Documentation

Skills generated from official documentation, and fine-tuned by Anthony.

| Skill | Description | Source |
|-------|-------------|--------|
| [vue](skills/vue) | Vue.js core - reactivity, components, composition API | [vuejs/docs](https://github.com/vuejs/docs) |
| [nuxt](skills/nuxt) | Nuxt framework - file-based routing, server routes, modules | [nuxt/nuxt](https://github.com/nuxt/nuxt) |
| [vite](skills/vite) | Vite build tool - config, plugins, SSR, library mode | [vitejs/vite](https://github.com/vitejs/vite) |
| [vitepress](skills/vitepress) | VitePress - static site generator powered by Vite | [vuejs/vitepress](https://github.com/vuejs/vitepress) |
| [vitest](skills/vitest) | Vitest - unit testing framework powered by Vite | [vitest-dev/vitest](https://github.com/vitest-dev/vitest) |
| [unocss](skills/unocss) | UnoCSS - atomic CSS engine, presets, transformers | [unocss/unocss](https://github.com/unocss/unocss) |
| [pnpm](skills/pnpm) | pnpm - fast, disk space efficient package manager | [pnpm/pnpm.io](https://github.com/pnpm/pnpm.io) |
| [tsdown](skills/tsdown) | tsdown - TypeScript library bundler powered by Rolldown | [rolldown/tsdown](https://github.com/rolldown/tsdown) |

> [!NOTE]
> For contributors: since we use LLM to generate and sync the skills, we can write the instructions in the `instructions/{project}.md` to guide the LLM to generate the skills based on our preferences and focus. Also, directly modifying the generated skills is also possible as the LLM would respect the changes on updating.

### Skills Vendored

Skills synced from vendor repositories for easier installation.

| Skill | Description | Source |
|-------|-------------|--------|
| [slidev](skills/slidev) | Slidev - presentation slides for developers | [slidevjs/slidev](https://github.com/slidevjs/slidev) (Official) |
| [vueuse](skills/vueuse) | VueUse - 200+ Vue composition utilities | [vueuse/skills](https://github.com/vueuse/skills) (Official) |
| [vue-best-practices](skills/vue-best-practices) | Vue 3 + TypeScript best practices for Volar | [hyf0/vue-skills](https://github.com/hyf0/vue-skills) |

## License

Skills in this repository are [MIT](LICENSE.md) licensed.

Synced skills from vendor repositories retain their original licenses - see each skill directory for details.
