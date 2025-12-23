<!-- 
  SkipLink Component
  Provides a keyboard-accessible way to skip navigation and jump to main content
-->
<template>
  <a
    href="#main-content"
    class="skip-link"
    @click="skipToContent"
  >
    Skip to main content
  </a>
</template>

<script setup lang="ts">
const skipToContent = (event: MouseEvent) => {
  event.preventDefault()
  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    mainContent.focus()
    mainContent.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: #ff5722;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-weight: bold;
  z-index: 100;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #fff;
  outline-offset: 2px;
}
</style>
