<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Set up SEO
useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

// Set up site-wide meta tags
useSeoMeta({
  ogSiteName: 'Digital Multimedia Design',
  twitterCard: 'summary_large_image',
})
</script>
