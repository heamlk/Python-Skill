---
name: Vue Watchers
description: watch and watchEffect for reacting to state changes with side effects
---

# Vue Watchers

Watchers perform side effects in reaction to state changes - like fetching data, mutating DOM, or logging.

## watch()

Explicitly watch specific reactive sources and run a callback when they change:

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})
```

### Watch Sources

```js
const x = ref(0)
const y = ref(0)
const state = reactive({ count: 0 })

// Single ref
watch(x, (newX) => console.log(`x is ${newX}`))

// Getter function (for reactive object properties)
watch(
  () => state.count,
  (count) => console.log(`count is ${count}`)
)

// Array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX}, y is ${newY}`)
})
```

### Watch Options

```js
watch(source, callback, {
  immediate: true,  // Run callback immediately on creation
  deep: true,       // Deep watch nested objects
  once: true,       // Run only once (3.4+)
  flush: 'post'     // Run after DOM updates
})
```

## watchEffect()

Automatically tracks reactive dependencies used in the callback:

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  console.log(`count is ${count.value}`)
})
// Logs immediately, then whenever count changes
```

### watch vs watchEffect

| `watch` | `watchEffect` |
|---------|---------------|
| Lazy by default | Runs immediately |
| Explicit source specification | Auto-tracks dependencies |
| Access to old and new values | Only current values |
| More precise control | More concise code |

Use `watch` when you need:
- Access to previous values
- Specific trigger control
- Lazy execution

Use `watchEffect` when:
- Multiple dependencies to track
- Side effect uses same values it's watching
- Cleaner, more concise code

## Deep Watchers

Watching a reactive object is automatically deep:

```js
const state = reactive({ nested: { count: 0 } })

watch(state, () => {
  // Triggers on any nested mutation
})

state.nested.count++ // Triggers
```

For getter functions, use `{ deep: true }`:

```js
watch(
  () => state.someObject,
  (newValue) => { /* ... */ },
  { deep: true }
)
```

**Vue 3.5+:** `deep` can be a number for max traversal depth:

```js
watch(source, callback, { deep: 3 }) // Only watch 3 levels deep
```

## Callback Flush Timing

```js
// Default: before component DOM updates
watch(source, callback)

// After DOM updates (access updated DOM)
watch(source, callback, { flush: 'post' })
watchPostEffect(() => { /* after DOM update */ })

// Synchronous (use carefully - performance impact)
watch(source, callback, { flush: 'sync' })
watchSyncEffect(() => { /* sync */ })
```

## Side Effect Cleanup

Clean up stale async operations when watcher re-runs:

```js
import { watch, onWatcherCleanup } from 'vue'

watch(id, async (newId) => {
  const controller = new AbortController()
  
  onWatcherCleanup(() => {
    controller.abort() // Cancel if id changes before response
  })
  
  const response = await fetch(`/api/${newId}`, {
    signal: controller.signal
  })
  data.value = await response.json()
})
```

Alternative (callback argument):

```js
watch(id, (newId, oldId, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())
  // ...
})

watchEffect((onCleanup) => {
  onCleanup(() => { /* cleanup */ })
  // ...
})
```

## Stopping Watchers

Watchers are auto-stopped when component unmounts. For manual control:

```js
const stop = watch(source, callback)
// or
const stop = watchEffect(() => {})

// Later, when no longer needed:
stop()
```

**Vue 3.5+:** Pause and resume:

```js
const { stop, pause, resume } = watchEffect(() => {})

pause()  // Temporarily pause
resume() // Resume watching
stop()   // Stop permanently
```

## Practical Examples

### Fetch on Dependency Change

```js
const url = ref('/api/users')
const data = ref(null)

watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})

// Changing url automatically refetches
url.value = '/api/posts'
```

### Debounced Watcher

```js
import { watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const searchQuery = ref('')

watch(
  searchQuery,
  useDebounceFn((query) => {
    search(query)
  }, 300)
)
```

## Key Points

- Use `watch` for explicit source tracking and access to old values
- Use `watchEffect` for automatic dependency tracking
- Always clean up async operations to prevent race conditions
- Avoid expensive operations in sync watchers
- Watchers registered during setup auto-stop on unmount

<!-- 
Source references:
- https://vuejs.org/guide/essentials/watchers.html
- https://vuejs.org/api/reactivity-core.html#watch
- https://vuejs.org/api/reactivity-core.html#watcheffect
-->
