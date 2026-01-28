---
name: Vue Component v-model
description: Two-way data binding on custom components with defineModel
---

# Vue Component v-model

`v-model` creates two-way bindings on custom components, syncing parent and child state.

## Basic Usage with defineModel (3.4+)

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

```vue-html
<!-- Parent.vue -->
<Child v-model="searchText" />
```

`defineModel()` returns a ref that:
- Syncs with parent's bound value
- Emits updates when mutated

## How It Works (Under the Hood)

`defineModel` compiles to:
- A prop named `modelValue`
- An event named `update:modelValue`

Pre-3.4 equivalent:

```vue
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

## defineModel Options

```js
// Required
const model = defineModel({ required: true })

// With default
const model = defineModel({ default: 0 })

// With type
const model = defineModel({ type: String })
```

## Named v-model (Arguments)

Use multiple v-models with different names:

```vue-html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

```vue
<!-- UserName.vue -->
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input v-model="firstName" placeholder="First" />
  <input v-model="lastName" placeholder="Last" />
</template>
```

## v-model Modifiers

Handle custom modifiers like `.capitalize`:

```vue-html
<MyInput v-model.capitalize="text" />
```

```vue
<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>
```

### Transforming Values with Modifiers

```vue
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input v-model="model" />
</template>
```

## Multiple v-models with Modifiers

```vue-html
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>
```

```vue
<script setup>
const [firstName, firstModifiers] = defineModel('firstName')
const [lastName, lastModifiers] = defineModel('lastName')

console.log(firstModifiers) // { capitalize: true }
console.log(lastModifiers)  // { uppercase: true }
</script>
```

## Options API

```vue
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" />
</template>
```

## TypeScript

```ts
const model = defineModel<string>()
//    ^? Ref<string | undefined>

const model = defineModel<string>({ required: true })
//    ^? Ref<string>

const [model, modifiers] = defineModel<string, 'trim' | 'uppercase'>()
//              ^? Record<'trim' | 'uppercase', true | undefined>
```

## Practical Example: Custom Select

```vue
<!-- CustomSelect.vue -->
<script setup>
const model = defineModel()

defineProps({
  options: Array
})
</script>

<template>
  <select v-model="model">
    <option 
      v-for="opt in options" 
      :key="opt.value" 
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</template>
```

```vue-html
<CustomSelect v-model="selectedValue" :options="options" />
```

## Key Points

- `defineModel()` is the recommended way to implement v-model (3.4+)
- Returns a ref that auto-syncs with parent
- Use named models for multiple bindings: `v-model:name`
- Access modifiers via destructuring: `[model, modifiers]`
- Use `get`/`set` options to transform values

<!-- 
Source references:
- https://vuejs.org/guide/components/v-model.html
- https://vuejs.org/api/sfc-script-setup.html#definemodel
-->
