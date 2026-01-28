---
name: Vue Template Syntax
description: Template syntax including interpolation, directives, bindings, and expressions
---

# Vue Template Syntax

Vue uses HTML-based templates that are compiled to optimized JavaScript render functions.

## Text Interpolation

Use double curly braces (mustache syntax) for text binding:

```vue-html
<span>Message: {{ msg }}</span>
```

## Raw HTML

Use `v-html` directive to output real HTML (be careful of XSS):

```vue-html
<span v-html="rawHtml"></span>
```

## Attribute Bindings

Use `v-bind` (or `:` shorthand) to bind attributes:

```vue-html
<div v-bind:id="dynamicId"></div>
<!-- Shorthand -->
<div :id="dynamicId"></div>
```

### Same-name Shorthand (3.4+)

```vue-html
<!-- Same as :id="id" -->
<div :id></div>
```

### Boolean Attributes

```vue-html
<button :disabled="isButtonDisabled">Button</button>
```

### Binding Multiple Attributes

```vue-html
<div v-bind="objectOfAttrs"></div>
```

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

## JavaScript Expressions

Full JavaScript expressions are supported:

```vue-html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div :id="`list-${id}`"></div>
```

**Note:** Only expressions work, not statements:

```vue-html
<!-- ❌ This is a statement -->
{{ var a = 1 }}

<!-- ❌ Flow control doesn't work -->
{{ if (ok) { return message } }}
```

## Directives

Special attributes prefixed with `v-`:

| Directive | Purpose |
|-----------|---------|
| `v-if` | Conditional rendering |
| `v-for` | List rendering |
| `v-on` / `@` | Event handling |
| `v-bind` / `:` | Attribute binding |
| `v-model` | Two-way binding |
| `v-show` | Toggle visibility |
| `v-html` | Raw HTML output |
| `v-text` | Text content |
| `v-slot` / `#` | Named slots |

### Directive Arguments

```vue-html
<a :href="url">Link</a>
<button @click="doSomething">Click</button>
```

### Dynamic Arguments

Use square brackets for dynamic directive arguments:

```vue-html
<a :[attributeName]="url">Link</a>
<button @[eventName]="handler">Click</button>
```

### Modifiers

Postfixes denoted by a dot that modify directive behavior:

```vue-html
<form @submit.prevent="onSubmit">...</form>
<input @keyup.enter="submit" />
<input v-model.trim="msg" />
```

## Event Handling (`v-on` / `@`)

```vue-html
<!-- Method handler -->
<button @click="increment">Add</button>

<!-- Inline handler -->
<button @click="count++">Add</button>

<!-- With argument -->
<button @click="say('hello')">Say Hello</button>

<!-- Access event -->
<button @click="warn('Form', $event)">Submit</button>
```

### Event Modifiers

```vue-html
<!-- Stop propagation -->
<a @click.stop="doThis"></a>

<!-- Prevent default -->
<form @submit.prevent="onSubmit"></form>

<!-- Modifiers can chain -->
<a @click.stop.prevent="doThat"></a>

<!-- Key modifiers -->
<input @keyup.enter="submit" />
<input @keyup.ctrl.enter="submit" />

<!-- Mouse modifiers -->
<button @click.left="onClick">Left Click</button>
```

## Conditional Rendering

```vue-html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else>Not A/B</div>

<!-- v-show (CSS-based toggle) -->
<div v-show="isVisible">Toggle me</div>
```

**v-if vs v-show:**
- `v-if` is "real" conditional rendering (elements destroyed/recreated)
- `v-show` always renders, toggles CSS `display` property
- Use `v-show` for frequent toggles, `v-if` for conditions that rarely change

## List Rendering

```vue-html
<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>

<!-- With index -->
<li v-for="(item, index) in items" :key="item.id">
  {{ index }}: {{ item.name }}
</li>

<!-- Object iteration -->
<li v-for="(value, key, index) in object" :key="key">
  {{ key }}: {{ value }}
</li>

<!-- Range -->
<span v-for="n in 10" :key="n">{{ n }}</span>
```

**Always provide `:key`** for list rendering to help Vue track elements efficiently.

## Key Points

- Use `:` shorthand for `v-bind` and `@` for `v-on`
- Expressions in templates are sandboxed with limited global access
- Use `v-if` for conditional elements, `v-show` for frequent visibility toggles
- Always use `:key` with `v-for`
- Modifiers chain to create powerful directive behaviors

<!-- 
Source references:
- https://vuejs.org/guide/essentials/template-syntax.html
- https://vuejs.org/guide/essentials/conditional.html
- https://vuejs.org/guide/essentials/list.html
- https://vuejs.org/guide/essentials/event-handling.html
-->
