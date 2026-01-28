---
name: Vue Lifecycle Hooks
description: Component lifecycle hooks for running code at specific stages
---

# Vue Lifecycle Hooks

Each Vue component goes through initialization steps: data observation, template compilation, DOM mounting, and updates. Lifecycle hooks let you run code at specific stages.

## Composition API Hooks

```vue
<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onActivated,
  onDeactivated
} from 'vue'

onMounted(() => {
  console.log('Component mounted')
})

onUnmounted(() => {
  console.log('Component unmounted')
})
</script>
```

## Lifecycle Stages

| Hook | When Called |
|------|-------------|
| `onBeforeMount` | Before initial DOM render |
| `onMounted` | After component is mounted to DOM |
| `onBeforeUpdate` | Before DOM re-render due to reactive state change |
| `onUpdated` | After DOM re-render |
| `onBeforeUnmount` | Before component is unmounted |
| `onUnmounted` | After component is unmounted |
| `onErrorCaptured` | When error from descendant is captured |
| `onActivated` | When kept-alive component is activated |
| `onDeactivated` | When kept-alive component is deactivated |

## Common Use Cases

### onMounted

Access DOM elements, start timers, fetch initial data:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const element = ref(null)

onMounted(() => {
  // DOM is available
  console.log(element.value) // <div>...</div>
  
  // Start timers, fetch data, etc.
  fetchData()
})
</script>

<template>
  <div ref="element">Hello</div>
</template>
```

### onUnmounted

Clean up subscriptions, timers, event listeners:

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

let timer

onMounted(() => {
  timer = setInterval(() => {
    console.log('tick')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
```

### onUpdated

React to DOM updates (use carefully):

```vue
<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  // DOM has been updated
  console.log('DOM updated, count is now:', count.value)
})
</script>
```

## Options API Equivalent

```js
export default {
  mounted() {
    console.log('mounted')
  },
  unmounted() {
    console.log('unmounted')
  },
  beforeUpdate() {
    console.log('before update')
  },
  updated() {
    console.log('updated')
  }
}
```

## Registration Rules

Hooks must be registered **synchronously** during component setup:

```js
// ✅ Correct - synchronous registration
onMounted(() => {
  console.log('mounted')
})

// ❌ Wrong - async registration
setTimeout(() => {
  onMounted(() => {
    // This won't work
  })
}, 100)
```

Hooks can be called from external functions if the call stack originates from `setup()`:

```js
// composable.js
import { onMounted } from 'vue'

export function useFeature() {
  onMounted(() => {
    // This works because it's called during setup
  })
}
```

```vue
<script setup>
import { useFeature } from './composable'
useFeature() // Called during setup, so onMounted works
</script>
```

## Lifecycle Diagram Flow

```
Creation:
  beforeCreate → created → beforeMount → mounted

Updates:
  beforeUpdate → updated

Destruction:
  beforeUnmount → unmounted
```

## Key Points

- `onMounted` is the most common hook - use for DOM access and initial data fetch
- `onUnmounted` is essential for cleanup to prevent memory leaks
- Hooks must be registered synchronously during setup
- Avoid mutating state in `onUpdated` to prevent infinite loops
- In Options API, `this` refers to the component instance

<!-- 
Source references:
- https://vuejs.org/guide/essentials/lifecycle.html
- https://vuejs.org/api/composition-api-lifecycle.html
-->
