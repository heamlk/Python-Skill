export interface VendorSkillMeta {
  official?: boolean
  source: string
  skills: Record<string, string> // sourceSkillName -> outputSkillName
}

/**
 * Repositories to clone as submodules and generate skills from source
 */
export const submodules = {
  'vue': 'https://github.com/vuejs/docs',
  'nuxt': 'https://github.com/nuxt/nuxt',
  'vite': 'https://github.com/vitejs/vite',
  'unocss': 'https://github.com/unocss/unocss'
}

/**
 * Already generated skills, sync with their `skills/` directory
 */
export const vendors: Record<string, VendorSkillMeta> = {
  'slidev': {
    official: true,
    source: 'https://github.com/slidevjs/slidev',
    skills: {
      'slidev': 'slidev'
    }
  },
  'vueuse': {
    official: true,
    source: 'https://github.com/vueuse/skills',
    skills: {
      'vueuse-functions': 'vueuse'
    }
  },
  'vue-best-practices': {
    source: 'https://github.com/hyf0/vue-skills',
    skills: {
      'vue-best-practices': 'vue-best-practices'
    }
  }
}
