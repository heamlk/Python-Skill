---
name: Data Fetching Best Practices
description: Patterns and best practices for efficient data fetching in Nuxt
---

# Data Fetching Best Practices

Effective data fetching patterns for SSR-friendly, performant Nuxt applications.

## Choose the Right Tool

| Scenario | Use |
|----------|-----|
| Component initial data | `useFetch` or `useAsyncData` |
| User interactions (clicks, forms) | `$fetch` |
| Third-party SDK/API | `useAsyncData` with custom function |
| Multiple parallel requests | `useAsyncData` with `Promise.all` |

## Avoid Double Fetching

### ❌ Wrong: Using $fetch Alone in Setup

```vue
<script setup>
// This fetches TWICE: once on server, once on client
const data = await $fetch('/api/posts')
</script>
```

### ✅ Correct: Use useFetch

```vue
<script setup>
// Fetches on server, hydrates on client (no double fetch)
const { data } = await useFetch('/api/posts')
</script>
```

## Use Explicit Cache Keys

### ❌ Avoid: Auto-generated Keys

```vue
<script setup>
// Key is auto-generated from file/line - can cause issues
const { data } = await useAsyncData(() => fetchPosts())
</script>
```

### ✅ Better: Explicit Keys

```vue
<script setup>
// Explicit key for predictable caching
const { data } = await useAsyncData('posts', () => fetchPosts())

// Dynamic keys for parameterized data
const route = useRoute()
const { data } = await useAsyncData(
  `post-${route.params.id}`,
  () => fetchPost(route.params.id)
)
</script>
```

## Handle Loading States Properly

```vue
<script setup>
const { data, status, error } = await useFetch('/api/posts')
</script>

<template>
  <div v-if="status === 'pending'">
    <SkeletonLoader />
  </div>
  <div v-else-if="error">
    <ErrorMessage :error="error" />
  </div>
  <div v-else>
    <PostList :posts="data" />
  </div>
</template>
```

## Use Lazy Fetching for Non-critical Data

```vue
<script setup>
// Critical data - blocks navigation
const { data: post } = await useFetch(`/api/posts/${id}`)

// Non-critical data - doesn't block navigation
const { data: comments, status } = await useFetch(`/api/posts/${id}/comments`, {
  lazy: true,
})
// Or use useLazyFetch
const { data: related } = await useLazyFetch(`/api/posts/${id}/related`)
</script>

<template>
  <article>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </article>

  <section v-if="status === 'pending'">Loading comments...</section>
  <CommentList v-else :comments="comments" />
</template>
```

## Minimize Payload Size

### Use `pick` for Simple Filtering

```vue
<script setup>
const { data } = await useFetch('/api/users', {
  // Only include these fields in payload
  pick: ['id', 'name', 'avatar'],
})
</script>
```

### Use `transform` for Complex Transformations

```vue
<script setup>
const { data } = await useFetch('/api/posts', {
  transform: (posts) => {
    return posts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.content.slice(0, 100),
      date: new Date(post.createdAt).toLocaleDateString(),
    }))
  },
})
</script>
```

## Parallel Fetching

### ✅ Fetch Independent Data in Parallel

```vue
<script setup>
const { data } = await useAsyncData('dashboard', async () => {
  const [user, posts, stats] = await Promise.all([
    $fetch('/api/user'),
    $fetch('/api/posts'),
    $fetch('/api/stats'),
  ])
  return { user, posts, stats }
})
</script>
```

### Multiple useFetch Calls

```vue
<script setup>
// These run in parallel automatically
const [{ data: user }, { data: posts }] = await Promise.all([
  useFetch('/api/user'),
  useFetch('/api/posts'),
])
</script>
```

## Efficient Refresh Patterns

### Watch Reactive Dependencies

```vue
<script setup>
const page = ref(1)
const category = ref('all')

const { data } = await useFetch('/api/posts', {
  query: { page, category },
  // Auto-refresh when these change
  watch: [page, category],
})
</script>
```

### Manual Refresh

```vue
<script setup>
const { data, refresh, status } = await useFetch('/api/posts')

async function refreshPosts() {
  await refresh()
}
</script>
```

### Conditional Fetching

```vue
<script setup>
const userId = ref(null)

const { data, execute } = await useFetch(() => `/api/users/${userId.value}`, {
  immediate: false, // Don't fetch until userId is set
})

// Later, when userId is available
userId.value = '123'
await execute()
</script>
```

## Server-only Fetching

```vue
<script setup>
// Only fetch on server, skip on client navigation
const { data } = await useFetch('/api/static-content', {
  server: true,
  lazy: true,
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key],
})
</script>
```

## Error Handling

```vue
<script setup>
const { data, error, refresh } = await useFetch('/api/posts')

// Watch for errors
watch(error, (err) => {
  if (err) {
    console.error('Fetch failed:', err)
    // Show toast, redirect, etc.
  }
})
</script>

<template>
  <div v-if="error">
    <p>Failed to load: {{ error.message }}</p>
    <button @click="refresh()">Retry</button>
  </div>
</template>
```

## Shared Data Across Components

```vue
<!-- ComponentA.vue -->
<script setup>
const { data } = await useFetch('/api/user', { key: 'current-user' })
</script>

<!-- ComponentB.vue -->
<script setup>
// Access cached data without refetching
const { data: user } = useNuxtData('current-user')

// Or refresh it
const { refresh } = await useFetch('/api/user', { key: 'current-user' })
</script>
```

## Avoid useAsyncData for Side Effects

### ❌ Wrong: Side Effects in useAsyncData

```vue
<script setup>
// Don't trigger Pinia actions or side effects
await useAsyncData(() => store.fetchUser()) // Can cause issues
</script>
```

### ✅ Correct: Use callOnce for Side Effects

```vue
<script setup>
await callOnce(async () => {
  await store.fetchUser()
})
</script>
```

<!-- 
Source references:
- https://nuxt.com/docs/getting-started/data-fetching
- https://nuxt.com/docs/guide/best-practices/performance
- https://nuxt.com/docs/api/composables/use-fetch
-->
