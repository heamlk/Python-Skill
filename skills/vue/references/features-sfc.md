---
name: Vue Single-File Components
description: SFC structure with template, script, and style blocks
---

# Vue Single-File Components (SFC)

Single-File Components (`.vue` files) encapsulate template, logic, and styles in one file.

## Basic Structure

```vue
<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

## Why SFC?

- **Familiar syntax**: HTML, CSS, JavaScript in natural form
- **Colocation**: Related code stays together
- **Pre-compiled templates**: No runtime compilation cost
- **Component-scoped CSS**: Styles don't leak
- **IDE support**: Full autocompletion and type-checking
- **Hot Module Replacement**: Instant updates during development

## Template Block

```vue
<template>
  <div class="wrapper">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>
```

- Must have exactly one root-level `<template>`
- Content is compiled to render function
- Standard Vue template syntax

## Script Block

### Composition API with `<script setup>`

```vue
<script setup>
import { ref, computed } from 'vue'
import MyComponent from './MyComponent.vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

### Options API

```vue
<script>
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubled() {
      return this.count * 2
    }
  }
}
</script>
```

### TypeScript

```vue
<script setup lang="ts">
const count = ref<number>(0)
</script>
```

## Style Block

### Basic Styles

```vue
<style>
.example {
  color: red;
}
</style>
```

### Scoped Styles

Styles only apply to current component:

```vue
<style scoped>
.example {
  color: red;
}
</style>
```

Compiles to:

```css
.example[data-v-f3f3eg9] {
  color: red;
}
```

### Deep Selectors

Target child components in scoped styles:

```vue
<style scoped>
.parent :deep(.child-class) {
  color: blue;
}
</style>
```

### Slotted Selectors

Target slotted content:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### CSS Modules

```vue
<style module>
.red {
  color: red;
}
</style>

<template>
  <p :class="$style.red">Red text</p>
</template>
```

Named modules:

```vue
<style module="classes">
.red { color: red; }
</style>

<template>
  <p :class="classes.red">Red</p>
</template>
```

### v-bind in CSS

Use component state in styles:

```vue
<script setup>
const theme = ref({
  color: 'red'
})
</script>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

### Preprocessors

```vue
<style lang="scss">
$primary: #42b983;
.container {
  color: $primary;
}
</style>

<style lang="less">
@primary: #42b983;
.container {
  color: @primary;
}
</style>
```

## Multiple Script Blocks

Combine `<script setup>` with regular `<script>`:

```vue
<script>
// Module-level code (runs once)
runSideEffectOnce()

export default {
  inheritAttrs: false
}
</script>

<script setup>
// Setup code (runs per instance)
const count = ref(0)
</script>
```

## Src Imports

Split into separate files:

```vue
<template src="./template.html"></template>
<script src="./script.js"></script>
<style src="./style.css"></style>
```

## Custom Blocks

For tooling integration (testing, i18n, etc.):

```vue
<i18n>
{
  "en": { "hello": "Hello" },
  "ja": { "hello": "こんにちは" }
}
</i18n>

<docs>
# Component Documentation
This component does...
</docs>
```

## Key Points

- SFC is Vue's recommended component format
- Use `<script setup>` for Composition API
- Scoped styles prevent CSS conflicts
- Multiple style blocks with different languages are supported
- v-bind() connects reactive state to CSS

<!-- 
Source references:
- https://vuejs.org/guide/scaling-up/sfc.html
- https://vuejs.org/api/sfc-spec.html
- https://vuejs.org/api/sfc-css-features.html
-->
