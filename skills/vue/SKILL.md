---
name: Vue.js
description: Progressive JavaScript framework for building user interfaces
metadata:
  author: Anthony Fu
  version: "2026.1.28"
  source: Generated from https://github.com/vuejs/docs, scripts located at https://github.com/antfu/skills
---

# Vue.js

Vue is a progressive JavaScript framework for building user interfaces. It builds on standard HTML, CSS, and JavaScript with a declarative, component-based programming model.

## Key Concepts

- **Reactivity System**: Automatically tracks state changes and updates the DOM
- **Component-Based**: Build UIs by composing reusable components
- **Single-File Components**: Encapsulate template, logic, and styles in `.vue` files
- **Composition API**: Flexible, composable approach to organizing component logic
- **Virtual DOM**: Efficient rendering with minimal DOM operations

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Reactivity | `ref`, `reactive`, `computed` - core reactivity primitives | [core-reactivity](references/core-reactivity.md) |
| Template Syntax | Interpolation, directives, bindings, and expressions | [core-template-syntax](references/core-template-syntax.md) |
| Lifecycle Hooks | `onMounted`, `onUnmounted`, and other lifecycle hooks | [core-lifecycle](references/core-lifecycle.md) |
| Watchers | `watch` and `watchEffect` for reactive side effects | [core-watchers](references/core-watchers.md) |

## Components

| Topic | Description | Reference |
|-------|-------------|-----------|
| Props | Passing data from parent to child with `defineProps` | [components-props](references/components-props.md) |
| Events (Emits) | Child-to-parent communication with `defineEmits` | [components-events](references/components-events.md) |
| Slots | Content distribution for flexible composition | [components-slots](references/components-slots.md) |
| v-model | Two-way binding with `defineModel` | [components-v-model](references/components-v-model.md) |
| Provide/Inject | Dependency injection through component tree | [components-provide-inject](references/components-provide-inject.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Single-File Components | `.vue` files with template, script, and style blocks | [features-sfc](references/features-sfc.md) |
| Script Setup | `<script setup>` syntax for Composition API | [features-script-setup](references/features-script-setup.md) |
| Composables | Reusable stateful logic with Composition API | [features-composables](references/features-composables.md) |

## Advanced

| Topic | Description | Reference |
|-------|-------------|-----------|
| Reactivity In Depth | How Vue's reactivity system works under the hood | [advanced-reactivity-deep](references/advanced-reactivity-deep.md) |

## Quick Patterns

### Basic Component

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <button @click="count++">
    Count: {{ count }} (Doubled: {{ doubled }})
  </button>
</template>
```

### Component with Props and Events

```vue
<script setup>
const props = defineProps<{
  title: string
  count?: number
}>()

const emit = defineEmits<{
  update: [value: number]
}>()
</script>

<template>
  <h1>{{ title }}</h1>
  <button @click="emit('update', count + 1)">
    Increment
  </button>
</template>
```

### Two-Way Binding Component

```vue
<script setup>
const model = defineModel<string>()
</script>

<template>
  <input v-model="model" />
</template>
```

### Composable Pattern

```js
import { ref, onMounted, onUnmounted } from 'vue'

export function useFeature() {
  const state = ref(null)
  
  onMounted(() => { /* setup */ })
  onUnmounted(() => { /* cleanup */ })
  
  return { state }
}
```

## Ecosystem

- **Vue Router**: Official routing solution
- **Pinia**: Official state management (successor to Vuex)
- **Vite**: Recommended build tool and dev server
- **VueUse**: Collection of composition utilities
