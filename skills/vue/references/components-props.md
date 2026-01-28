---
name: Vue Props
description: Declaring and validating component props for parent-to-child data flow
---

# Vue Props

Props pass data from parent to child components. They form a one-way-down data flow.

## Declaring Props

### With `<script setup>`

```vue
<script setup>
const props = defineProps(['title', 'likes'])
console.log(props.title)
</script>
```

### Object Syntax with Types

```vue
<script setup>
defineProps({
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object
})
</script>
```

### TypeScript Type-Based Declaration

```vue
<script setup lang="ts">
defineProps<{
  title: string
  likes?: number
  isPublished?: boolean
}>()
</script>
```

## Prop Validation

```vue
<script setup>
defineProps({
  // Basic type check
  propA: Number,
  
  // Multiple types
  propB: [String, Number],
  
  // Required
  propC: {
    type: String,
    required: true
  },
  
  // Default value
  propD: {
    type: Number,
    default: 100
  },
  
  // Object default (must use factory function)
  propE: {
    type: Object,
    default: () => ({ message: 'hello' })
  },
  
  // Custom validator
  propF: {
    validator(value) {
      return ['success', 'warning', 'danger'].includes(value)
    }
  }
})
</script>
```

### Valid Types

- `String`, `Number`, `Boolean`, `Array`, `Object`
- `Date`, `Function`, `Symbol`, `Error`
- Custom classes (uses `instanceof`)

## Passing Props

```vue-html
<!-- Static -->
<BlogPost title="My Journey" />

<!-- Dynamic with v-bind -->
<BlogPost :title="post.title" />
<BlogPost :likes="42" />
<BlogPost :is-published="false" />
<BlogPost :comment-ids="[234, 266, 273]" />
<BlogPost :author="{ name: 'Vue' }" />

<!-- Pass all object properties -->
<BlogPost v-bind="post" />
<!-- Equivalent to: -->
<BlogPost :id="post.id" :title="post.title" />
```

## Prop Name Casing

Declare in camelCase, pass in kebab-case:

```vue
<script setup>
defineProps({
  greetingMessage: String
})
</script>

<template>
  <span>{{ greetingMessage }}</span>
</template>
```

```vue-html
<MyComponent greeting-message="hello" />
```

## One-Way Data Flow

Props are **read-only**. Never mutate them directly:

```js
const props = defineProps(['foo'])
props.foo = 'bar' // ❌ Warning! Props are readonly
```

### Using Props as Initial Values

```js
const props = defineProps(['initialCounter'])
const counter = ref(props.initialCounter) // Local copy
```

### Transforming Props

```js
const props = defineProps(['size'])
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

## Reactive Props Destructure (3.5+)

Destructured props are reactive in Vue 3.5+:

```js
const { foo } = defineProps(['foo'])

watchEffect(() => {
  console.log(foo) // Reactive! Re-runs when foo changes
})
```

### Default Values with Destructure

```ts
const { foo = 'default' } = defineProps<{ foo?: string }>()
```

### Passing Destructured Props to Functions

Wrap in a getter to retain reactivity:

```js
const { foo } = defineProps(['foo'])

// ❌ Won't work - passes value, not reactive source
watch(foo, callback)

// ✅ Works - passes getter
watch(() => foo, callback)
```

## Boolean Casting

Boolean props have special casting rules:

```vue
<script setup>
defineProps({ disabled: Boolean })
</script>

<!-- Equivalent to :disabled="true" -->
<MyComponent disabled />

<!-- Equivalent to :disabled="false" -->
<MyComponent />
```

## TypeScript: Default Values (3.4 and below)

Use `withDefaults` for type-based declaration:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

## Key Points

- Props flow one-way: parent → child
- Never mutate props directly
- Use camelCase in JS, kebab-case in templates
- Provide validation for better documentation and debugging
- Use `computed` to derive values from props
- In 3.5+, destructured props are reactive

<!-- 
Source references:
- https://vuejs.org/guide/components/props.html
- https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
-->
