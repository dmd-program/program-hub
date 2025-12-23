<template>
  <NuxtLayout>
    <div class="min-h-screen flex items-center justify-center py-16">
      <div class="container-custom max-w-2xl text-center">
        <div class="mb-8">
          <h1 class="text-9xl font-bold text-psu-blue mb-4">404</h1>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p class="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/program-hub/" class="btn-primary">
            Go Home
          </NuxtLink>
          <NuxtLink to="/program-hub/courses/" class="btn-outline">
            Browse Courses
          </NuxtLink>
        </div>

        <div class="mt-12 pt-12 border-t border-gray-200">
          <p class="text-gray-600 mb-4">Looking for something specific?</p>
          <div class="flex flex-wrap gap-4 justify-center text-sm">
            <NuxtLink to="/program-hub/program/" class="text-dmd-accent-primary hover:underline">
              Program Info
            </NuxtLink>
            <span class="text-gray-400">•</span>
            <NuxtLink to="/program-hub/about/" class="text-dmd-accent-primary hover:underline">
              About DMD
            </NuxtLink>
            <span class="text-gray-400">•</span>
            <NuxtLink to="/program-hub/exhibitions/" class="text-dmd-accent-primary hover:underline">
              Student Work
            </NuxtLink>
            <span class="text-gray-400">•</span>
            <NuxtLink to="/program-hub/community/" class="text-dmd-accent-primary hover:underline">
              Community
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: '404 - Page Not Found',
})

useSeoMeta({
  title: '404 - Page Not Found | DMD Program',
  robots: 'noindex, nofollow',
})
</script>
