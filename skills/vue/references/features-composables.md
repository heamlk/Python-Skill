---
name: Vue Composables
description: Reusable stateful logic using Composition API
---

# Vue Composables

Composables are functions that encapsulate and reuse **stateful logic** using Composition API.

## What is a Composable?

A function that uses Vue's reactivity APIs to manage state that changes over time:

```js
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

Usage:

```vue
<script setup>
import { useMouse } from './composables/useMouse'

const { x, y } = useMouse()
</script>

<template>
  Mouse: {{ x }}, {{ y }}
</template>
```

## Naming Convention

Composable names start with `use`:
- `useMouse`
- `useFetch`
- `useLocalStorage`

## Composing Composables

Composables can call other composables:

```js
// composables/useEventListener.js
export function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}

// composables/useMouse.js
import { useEventListener } from './useEventListener'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

## Accepting Reactive Arguments

Support refs, getters, and plain values:

```js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  watchEffect(async () => {
    data.value = null
    error.value = null
    
    try {
      const res = await fetch(toValue(url))
      data.value = await res.json()
    } catch (e) {
      error.value = e
    }
  })

  return { data, error }
}
```

`toValue()` normalizes refs and getters to values.

Usage:

```js
// Static URL
useFetch('/api/users')

// Ref
const url = ref('/api/users')
useFetch(url)

// Getter (reactive to props)
useFetch(() => `/api/users/${props.id}`)
```

## Return Values

Always return plain objects containing refs:

```js
// ✅ Good - refs can be destructured
export function useFeature() {
  const x = ref(0)
  const y = ref(0)
  return { x, y }
}

const { x, y } = useFeature() // x, y are reactive

// ❌ Bad - reactive object loses reactivity when destructured
export function useFeature() {
  return reactive({ x: 0, y: 0 })
}
```

If you want object syntax, wrap in `reactive()`:

```js
const mouse = reactive(useMouse())
console.log(mouse.x) // Works, refs are unwrapped
```

## Side Effects

### DOM-specific (SSR-safe)

```js
export function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

### Cleanup

```js
export function useTimer(callback, interval) {
  let id

  onMounted(() => {
    id = setInterval(callback, interval)
  })

  onUnmounted(() => {
    clearInterval(id)
  })
}
```

## Usage Restrictions

Composables must be called:
- Inside `<script setup>`
- Inside `setup()` function
- Synchronously (not in async callbacks)

```vue
<script setup>
// ✅ Correct
const { x, y } = useMouse()

// ❌ Wrong - async context
setTimeout(() => {
  useMouse() // Won't work
}, 100)
</script>
```

Exception: `<script setup>` allows calling after `await`:

```vue
<script setup>
const data = await fetchData()
const { x, y } = useMouse() // ✅ Works after await in <script setup>
</script>
```

## Practical Examples

### useLocalStorage

```js
export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const data = ref(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return data
}
```

### useAsync

```js
export function useAsync(asyncFn) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function execute(...args) {
    loading.value = true
    error.value = null
    try {
      data.value = await asyncFn(...args)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, execute }
}
```

### useDebounce

```js
export function useDebounce(value, delay = 300) {
  const debounced = ref(value.value)

  let timeout
  watch(value, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  })

  return debounced
}
```

## vs Mixins

Composables are preferred over mixins because:
1. **Clear source**: Explicit imports show where logic comes from
2. **No collisions**: Rename destructured values to avoid conflicts
3. **Explicit dependencies**: Values passed as arguments, not implicit

## vs Renderless Components

Composables are more efficient - no component instance overhead.

Use components when you need both logic AND visual output.

## Key Points

- Name with `use` prefix
- Return plain objects with refs
- Use `toValue()` to accept refs/getters as arguments
- Call synchronously in setup context
- Clean up side effects in `onUnmounted`
- Prefer composables over mixins and renderless components

<!-- 
Source references:
- https://vuejs.org/guide/reusability/composables.html
-->
