# Anthony Fu's Skills

A curated collection of [agent skills](https://agentskills.io/home) for Vue ecosystem tools and frameworks with Anthony Fu's choices/tastes.

> [!IMPORTANT]
> This is an proof-of-concept project for generating agent skills from source documentation and keep them syncing.
> I haven't fully used/tested how well the skills would perform, so feedback and contributions are much appreciated.

## Installation

```bash
npx skills add antfu/skills
```

Learn more about the cli usage at [skills](https://github.com/vercel-labs/skills).

## Skills

When installing `antfu/skills`, all the following skills will be included.

### Skills Generated from Documentation

Skills generated from source documentation, and tuned by Anthony.

| Skill | Description | Source |
|-------|-------------|--------|
| [vue](skills/vue) | Vue.js core - reactivity, components, composition API | [vuejs/docs](https://github.com/vuejs/docs) |
| [nuxt](skills/nuxt) | Nuxt framework - file-based routing, server routes, modules | [nuxt/nuxt](https://github.com/nuxt/nuxt) |
| [vite](skills/vite) | Vite build tool - config, plugins, SSR, library mode | [vitejs/vite](https://github.com/vitejs/vite) |
| [unocss](skills/unocss) | UnoCSS - atomic CSS engine, presets, transformers | [unocss/unocss](https://github.com/unocss/unocss) |

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
