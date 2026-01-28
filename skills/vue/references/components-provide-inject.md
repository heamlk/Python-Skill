---
name: Vue Provide/Inject
description: Dependency injection for passing data through component tree without prop drilling
---

# Vue Provide/Inject

Provide/inject passes data through the component tree without prop drilling - useful for deeply nested components.

## Basic Usage

### Provide

```vue
<script setup>
import { provide } from 'vue'

provide('message', 'hello!')
</script>
```

### Inject

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

## Providing Reactive State

```vue
<script setup>
import { ref, provide } from 'vue'

const count = ref(0)
provide('count', count)
</script>
```

Descendants can inject and react to changes:

```vue
<script setup>
import { inject } from 'vue'

const count = inject('count')
// count is a ref, stays reactive
</script>
```

## App-Level Provide

Provide to all components in the app:

```js
import { createApp } from 'vue'

const app = createApp({})
app.provide('message', 'hello!')
```

## Injection Default Values

```js
// Simple default
const value = inject('message', 'default value')

// Factory function (avoids computation if not needed)
const value = inject('key', () => new ExpensiveClass(), true)
```

## Providing Mutation Functions

Keep mutations in the provider for maintainability:

```vue
<!-- Provider.vue -->
<script setup>
import { ref, provide } from 'vue'

const location = ref('North Pole')

function updateLocation(newLocation) {
  location.value = newLocation
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue
<!-- Injector.vue -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation('South Pole')">
    {{ location }}
  </button>
</template>
```

## Read-Only Provided Values

Prevent injectors from mutating provided state:

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('count', readonly(count))
</script>
```

## Symbol Keys

Use Symbols for large apps to avoid key collisions:

```js
// keys.js
export const myInjectionKey = Symbol('myKey')

// Provider
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, { /* data */ })

// Injector
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const data = inject(myInjectionKey)
```

## TypeScript

```ts
// keys.ts
import type { InjectionKey, Ref } from 'vue'

export const countKey: InjectionKey<Ref<number>> = Symbol('count')

// Provider
import { provide, ref } from 'vue'
import { countKey } from './keys'

provide(countKey, ref(0))

// Injector
import { inject } from 'vue'
import { countKey } from './keys'

const count = inject(countKey) // Ref<number> | undefined
const count = inject(countKey)! // Ref<number> (assert non-null)
```

## Options API

```js
// Provider
export default {
  provide: {
    message: 'hello!'
  }
}

// With instance data (use function)
export default {
  data() {
    return { message: 'hello!' }
  },
  provide() {
    return {
      message: this.message
    }
  }
}

// Injector
export default {
  inject: ['message'],
  created() {
    console.log(this.message)
  }
}

// With aliasing and defaults
export default {
  inject: {
    localMessage: {
      from: 'message',
      default: 'default value'
    }
  }
}
```

## When to Use

**Good use cases:**
- Theme/configuration that many components need
- Plugin development
- Avoiding excessive prop drilling
- Service/store injection

**Avoid when:**
- Only 1-2 levels deep (just use props)
- Data flow needs to be traceable (props are more explicit)

## Key Points

- `provide()` makes values available to all descendants
- `inject()` retrieves values from ancestor chain
- Provide reactive refs for reactive data
- Provide mutation functions alongside state
- Use `readonly()` to prevent unwanted mutations
- Use Symbols for type-safe keys in large apps

<!-- 
Source references:
- https://vuejs.org/guide/components/provide-inject.html
- https://vuejs.org/api/composition-api-dependency-injection.html
-->
