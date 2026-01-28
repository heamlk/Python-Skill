---
name: Vue Events (Emits)
description: Emitting custom events from child to parent components
---

# Vue Events (Emits)

Components emit custom events to communicate with parent components. This enables child-to-parent data flow.

## Emitting Events

### In Template

```vue
<template>
  <button @click="$emit('someEvent')">Click Me</button>
  <button @click="$emit('increaseBy', 1)">Increase</button>
</template>
```

### In Script

```vue
<script setup>
const emit = defineEmits(['submit', 'cancel'])

function handleSubmit() {
  emit('submit', { email, password })
}
</script>
```

## Listening to Events

```vue-html
<!-- Parent component -->
<MyComponent @some-event="callback" />
<MyComponent @increase-by="(n) => count += n" />
<MyComponent @some-event.once="callback" /> <!-- Listen once -->
```

Event names use automatic case transformation (emit camelCase, listen kebab-case).

## Declaring Emits

Explicitly declare events for documentation and validation:

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

### Object Syntax with Validation

```vue
<script setup>
const emit = defineEmits({
  // No validation
  click: null,
  
  // With validation
  submit: ({ email, password }) => {
    if (email && password) return true
    console.warn('Invalid submit payload!')
    return false
  }
})
</script>
```

### TypeScript Declaration

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+ alternative syntax
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

## Event Arguments

Pass multiple arguments to the listener:

```vue
<script setup>
const emit = defineEmits(['submit'])

function handleSubmit() {
  emit('submit', arg1, arg2, arg3)
}
</script>
```

```vue-html
<!-- All arguments are received -->
<MyComponent @submit="(a, b, c) => handle(a, b, c)" />
```

## Options API

```js
export default {
  emits: ['inFocus', 'submit'],
  methods: {
    submit() {
      this.$emit('submit', { email: this.email })
    }
  }
}
```

## Component Events vs Native DOM Events

- Component events do **not** bubble
- Can only listen to direct child component events
- For sibling/deep communication, use state management or provide/inject

If you define a native event name (e.g., `click`) in `emits`, it overrides the native event:

```vue
<script setup>
// Now @click only responds to emitted 'click', not native clicks
defineEmits(['click'])
</script>
```

## Practical Example

```vue
<!-- SearchInput.vue -->
<script setup>
const emit = defineEmits(['search', 'clear'])
const query = ref('')

function handleSearch() {
  emit('search', query.value)
}
</script>

<template>
  <input v-model="query" @keyup.enter="handleSearch" />
  <button @click="handleSearch">Search</button>
  <button @click="emit('clear')">Clear</button>
</template>
```

```vue
<!-- Parent.vue -->
<template>
  <SearchInput 
    @search="performSearch" 
    @clear="results = []"
  />
</template>
```

## Key Points

- Use `defineEmits` to declare events explicitly
- Emit with camelCase, listen with kebab-case
- Events can carry multiple arguments
- Validation helps catch errors early
- Component events don't bubble - use other patterns for deep communication

<!-- 
Source references:
- https://vuejs.org/guide/components/events.html
- https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
-->
