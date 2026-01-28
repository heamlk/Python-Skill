---
name: Vue Script Setup
description: Compile-time syntactic sugar for Composition API in SFCs
---

# Vue `<script setup>`

`<script setup>` is the recommended syntax for Composition API in SFCs. It offers less boilerplate and better performance.

## Basic Syntax

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

All top-level bindings are automatically exposed to the template.

## Using Components

Import and use directly - no registration needed:

```vue
<script setup>
import MyComponent from './MyComponent.vue'
import { SomeComponent } from 'some-library'
</script>

<template>
  <MyComponent />
  <SomeComponent />
</template>
```

### Dynamic Components

```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="someCondition ? Foo : Bar" />
</template>
```

### Namespaced Components

```vue
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>Label</Form.Label>
  </Form.Input>
</template>
```

## defineProps

```vue
<script setup>
// Array syntax
const props = defineProps(['title', 'likes'])

// Object syntax with validation
const props = defineProps({
  title: String,
  likes: {
    type: Number,
    required: true
  }
})

// TypeScript
const props = defineProps<{
  title: string
  likes?: number
}>()
</script>
```

## defineEmits

```vue
<script setup>
// Array syntax
const emit = defineEmits(['change', 'submit'])

// Object syntax with validation
const emit = defineEmits({
  submit: (payload) => {
    return payload.email && payload.password
  }
})

// TypeScript
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'submit', value: string): void
}>()

// 3.3+ alternative
const emit = defineEmits<{
  change: [id: number]
  submit: [value: string]
}>()
</script>
```

## defineModel (3.4+)

Two-way binding for custom components:

```vue
<script setup>
const model = defineModel()
// or named
const title = defineModel('title')
// with options
const count = defineModel({ type: Number, default: 0 })
</script>

<template>
  <input v-model="model" />
</template>
```

## defineExpose

Components are closed by default. Explicitly expose public interface:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const publicMethod = () => { /* ... */ }

defineExpose({
  count,
  publicMethod
})
</script>
```

Parent can access via template ref:

```vue
<script setup>
const child = ref()
// child.value.count
// child.value.publicMethod()
</script>

<template>
  <Child ref="child" />
</template>
```

## defineOptions (3.3+)

Declare component options without separate `<script>`:

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
  name: 'CustomName'
})
</script>
```

## defineSlots (3.3+)

Type hints for slots:

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { item: string }): any
  header(props: { title: string }): any
}>()
</script>
```

## useSlots & useAttrs

Access slots and attrs in script:

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

## Top-Level await

Async setup with Suspense:

```vue
<script setup>
const post = await fetch('/api/post').then(r => r.json())
</script>
```

**Note:** Requires `<Suspense>` wrapper in parent.

## Generic Components (TypeScript)

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

With constraints:

```vue
<script setup lang="ts" generic="T extends string | number">
defineProps<{
  items: T[]
}>()
</script>
```

## Custom Directives

Local directives use `vDirectiveName` naming:

```vue
<script setup>
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

## Combining with Regular `<script>`

```vue
<script>
// Runs once when module is imported
console.log('module loaded')

export default {
  inheritAttrs: false
}
</script>

<script setup>
// Runs for each component instance
const count = ref(0)
</script>
```

## Key Points

- Top-level bindings auto-expose to template
- `defineProps`, `defineEmits`, `defineModel` are compiler macros
- Components are auto-registered when imported
- Use `defineExpose` to expose public API
- `defineOptions` for component options without separate script
- Macros must be used at top level, not in functions

<!-- 
Source references:
- https://vuejs.org/api/sfc-script-setup.html
-->
