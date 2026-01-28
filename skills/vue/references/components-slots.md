---
name: Vue Slots
description: Content distribution with slots for flexible component composition
---

# Vue Slots

Slots allow parent components to pass template content into child components.

## Basic Slot

```vue
<!-- FancyButton.vue -->
<template>
  <button class="fancy-btn">
    <slot></slot> <!-- Slot outlet -->
  </button>
</template>
```

```vue-html
<!-- Usage -->
<FancyButton>
  Click me! <!-- Slot content -->
</FancyButton>
```

Renders:

```html
<button class="fancy-btn">Click me!</button>
```

## Fallback Content

Provide default content when no slot content is given:

```vue
<template>
  <button>
    <slot>Submit</slot> <!-- Fallback: "Submit" -->
  </button>
</template>
```

## Named Slots

Multiple slots with specific names:

```vue
<!-- BaseLayout.vue -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot> <!-- Default slot -->
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

```vue-html
<!-- Usage with v-slot or # shorthand -->
<BaseLayout>
  <template #header>
    <h1>Page Title</h1>
  </template>

  <p>Main content goes here</p>

  <template #footer>
    <p>Contact info</p>
  </template>
</BaseLayout>
```

## Scoped Slots

Pass data from child to slot content:

```vue
<!-- ItemList.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="index"></slot>
    </li>
  </ul>
</template>
```

```vue-html
<!-- Usage - receive slot props -->
<ItemList :items="items">
  <template #default="{ item, index }">
    {{ index }}: {{ item.name }}
  </template>
</ItemList>

<!-- Shorthand when only default slot -->
<ItemList :items="items" v-slot="{ item }">
  {{ item.name }}
</ItemList>
```

## Named Scoped Slots

```vue
<template>
  <slot name="header" :title="title"></slot>
</template>
```

```vue-html
<MyComponent>
  <template #header="{ title }">
    <h1>{{ title }}</h1>
  </template>
</MyComponent>
```

## Conditional Slots

Check if slot content was provided:

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="card-body">
      <slot />
    </div>
  </div>
</template>
```

## Dynamic Slot Names

```vue-html
<template #[dynamicSlotName]>
  Dynamic content
</template>
```

## Render Scope

Slot content has access to **parent** scope, not child:

```vue-html
<FancyButton>
  {{ parentMessage }} <!-- ✅ Works - parent scope -->
  {{ childData }}     <!-- ❌ Undefined - child scope not accessible -->
</FancyButton>
```

Use scoped slots to access child data.

## Renderless Components

Components that only provide logic via scoped slots:

```vue
<!-- MouseTracker.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(e) {
  x.value = e.pageX
  y.value = e.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>
  <slot :x="x" :y="y"></slot>
</template>
```

```vue-html
<MouseTracker v-slot="{ x, y }">
  Mouse: {{ x }}, {{ y }}
</MouseTracker>
```

**Note:** For logic-only reuse, composables are more efficient than renderless components.

## Practical Example: FancyList

```vue
<!-- FancyList.vue -->
<script setup>
defineProps(['items'])
</script>

<template>
  <ul class="fancy-list">
    <li v-for="item in items" :key="item.id" class="fancy-item">
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
</template>
```

```vue-html
<FancyList :items="users">
  <template #item="{ name, email }">
    <strong>{{ name }}</strong>
    <span>{{ email }}</span>
  </template>
</FancyList>
```

## Key Points

- Use `<slot>` to define outlet points for parent content
- Named slots organize multiple content areas
- Scoped slots pass data from child to parent template
- `$slots` in template checks for slot content existence
- Use `#` shorthand for `v-slot:`
- Slot content has parent scope; use scoped slots for child data

<!-- 
Source references:
- https://vuejs.org/guide/components/slots.html
-->
