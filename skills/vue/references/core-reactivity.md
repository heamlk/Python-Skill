---
name: Vue Reactivity
description: Core reactivity primitives - ref, reactive, computed, and how Vue's reactivity system works
---

# Vue Reactivity

Vue's reactivity system automatically tracks JavaScript state changes and updates the DOM efficiently.

## ref()

The primary way to declare reactive state in Composition API. Wraps a value in a reactive container with a `.value` property.

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0
count.value++
console.log(count.value) // 1
```

In templates, refs are auto-unwrapped (no `.value` needed):

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

### Why .value?

Vue tracks property access via getters/setters. The `.value` property enables Vue to detect when the ref is read or mutated, triggering reactive updates.

## reactive()

Makes an entire object reactive using JavaScript Proxies. Use for complex objects when you want to avoid `.value`.

```js
import { reactive } from 'vue'

const state = reactive({ count: 0, name: 'Vue' })
state.count++ // No .value needed
```

### Limitations of reactive()

1. **Only works with objects** - not primitives (string, number, boolean)
2. **Cannot replace the entire object** - loses reactivity connection
3. **Not destructure-friendly** - destructured primitives lose reactivity

```js
let state = reactive({ count: 0 })
state = reactive({ count: 1 }) // ❌ Reactivity lost!

const { count } = state
count++ // ❌ Does not update state.count
```

**Recommendation:** Use `ref()` as the primary API for reactive state.

## computed()

Creates derived reactive state that auto-updates when dependencies change. Results are cached.

```js
import { ref, computed } from 'vue'

const count = ref(1)
const doubled = computed(() => count.value * 2)

console.log(doubled.value) // 2
count.value = 5
console.log(doubled.value) // 10
```

### Writable Computed

```js
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (val) => {
    [firstName.value, lastName.value] = val.split(' ')
  }
})

fullName.value = 'Jane Smith' // Updates firstName and lastName
```

### Best Practices

- **Getters should be side-effect free** - only compute and return values
- **Don't mutate computed values** - they are derived state

## Deep Reactivity

Both `ref()` and `reactive()` create deeply reactive state:

```js
const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

obj.value.nested.count++ // Triggers updates
obj.value.arr.push('baz') // Triggers updates
```

Use `shallowRef()` or `shallowReactive()` to opt out of deep reactivity for performance.

## DOM Update Timing

DOM updates are batched asynchronously. Use `nextTick()` to wait for DOM updates:

```js
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++
  await nextTick()
  // DOM is now updated
}
```

## Key Points

- Use `ref()` for primitives and as the default choice
- Use `reactive()` for objects when you want to avoid `.value`
- Use `computed()` for derived state that depends on other reactive values
- Computed properties are cached and only re-evaluate when dependencies change
- Always access reactive state through the proxy, never the original object

<!-- 
Source references:
- https://vuejs.org/guide/essentials/reactivity-fundamentals.html
- https://vuejs.org/api/reactivity-core.html
-->
