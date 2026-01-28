---
name: Vue Reactivity In Depth
description: How Vue's reactivity system works under the hood
---

# Vue Reactivity In Depth

Understanding Vue's reactivity system helps debug issues and optimize performance.

## How It Works

Vue uses JavaScript Proxies to intercept property access:

```js
// Simplified reactive() implementation
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)    // Track which effect is reading
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)  // Trigger effects that depend on this
      return true
    }
  })
}
```

`ref()` uses getter/setter:

```js
// Simplified ref() implementation
function ref(value) {
  return {
    get value() {
      track(this, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(this, 'value')
    }
  }
}
```

## Dependency Tracking

When a reactive effect runs:
1. Properties accessed are **tracked** as dependencies
2. When those properties change, effects are **triggered**

```js
const state = reactive({ count: 0 })

// Effect tracks state.count
watchEffect(() => {
  console.log(state.count)
})

// Triggers the effect
state.count++
```

## Why Refs Need .value

JavaScript cannot track access to local variables. The `.value` property gives Vue a chance to intercept access:

```js
let count = 0
count++ // Vue cannot detect this

const count = ref(0)
count.value++ // Vue CAN detect this via getter/setter
```

## Reactivity Caveats

### Proxy Identity

```js
const raw = {}
const proxy = reactive(raw)

proxy === raw // false
reactive(raw) === proxy // true (same proxy returned)
```

### Losing Reactivity

```js
const state = reactive({ count: 0 })

// ❌ Destructuring loses reactivity
let { count } = state
count++ // Won't trigger updates

// ❌ Passing primitive to function loses reactivity
callSomething(state.count) // Receives plain number

// ✅ Pass the entire object or use refs
callSomething(state)
callSomething(toRef(state, 'count'))
```

### Ref Unwrapping

Refs are auto-unwrapped in reactive objects:

```js
const count = ref(0)
const state = reactive({ count })

state.count // 0 (unwrapped, no .value needed)
state.count++ // Works
```

But NOT in arrays or collections:

```js
const books = reactive([ref('Vue Guide')])
books[0].value // Need .value here

const map = reactive(new Map([['count', ref(0)]]))
map.get('count').value // Need .value here
```

## Debugging Reactivity

### Component Debug Hooks

```vue
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((e) => {
  console.log('Dependency tracked:', e)
})

onRenderTriggered((e) => {
  console.log('Re-render triggered by:', e)
})
</script>
```

### Computed/Watcher Debugging

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    console.log('tracked:', e)
  },
  onTrigger(e) {
    console.log('triggered:', e)
  }
})

watch(source, callback, {
  onTrack(e) { debugger },
  onTrigger(e) { debugger }
})
```

## Shallow Reactivity

Skip deep conversion for performance:

```js
import { shallowRef, shallowReactive } from 'vue'

// Only .value access is reactive
const state = shallowRef({ nested: { count: 0 } })
state.value.nested.count++ // Won't trigger
state.value = { nested: { count: 1 } } // Triggers

// Only root-level properties are reactive
const obj = shallowReactive({ nested: { count: 0 } })
obj.nested = {} // Triggers
obj.nested.count++ // Won't trigger
```

## Read-Only State

```js
import { readonly, shallowReadonly } from 'vue'

const original = reactive({ count: 0 })
const copy = readonly(original)

copy.count++ // Warning! Cannot modify
original.count++ // Works, and copy reflects it
```

## Integration with External State

Use `shallowRef` for external state systems:

```js
import { shallowRef } from 'vue'
import { produce } from 'immer'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
```

## Signals Comparison

Vue refs are similar to "signals" in other frameworks (Solid, Angular, Preact):

```js
// Vue ref
const count = ref(0)
count.value // read
count.value++ // write

// Similar concept in Solid
const [count, setCount] = createSignal(0)
count() // read
setCount(1) // write
```

## Key Points

- Vue uses Proxies for objects, getter/setter for refs
- Destructuring reactive objects loses reactivity
- Refs auto-unwrap in reactive objects (but not arrays/collections)
- Use `shallowRef`/`shallowReactive` to skip deep conversion
- Use debug hooks (`onTrack`, `onTrigger`) to trace dependencies
- The proxy is not equal to the original object

<!-- 
Source references:
- https://vuejs.org/guide/extras/reactivity-in-depth.html
-->
