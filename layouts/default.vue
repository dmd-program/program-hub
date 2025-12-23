<template>
  <div class="min-h-screen flex flex-col">
    <AccessibilitySkipLink />
    <main id="main-content" class="flex-grow" tabindex="-1">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
// This is the default layout that wraps all pages
</script>
