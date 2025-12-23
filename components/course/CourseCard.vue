<template>
  <NuxtLink 
    :to="`/courses/${course.stem.split('/').pop()}`"
    class="card group"
  >
    <div class="p-6 space-y-4">
      <!-- Course number badge -->
      <div class="flex items-center justify-between">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-psu-blue text-white">
          {{ course.number }}
        </span>
        <span v-if="course.programCore" class="text-xs font-medium text-dmd-accent-tertiary">
          Core
        </span>
      </div>

      <!-- Course title -->
      <h3 class="text-xl font-semibold text-psu-blue group-hover:text-dmd-accent-primary transition-colors">
        {{ course.title }}
      </h3>

      <!-- Course description -->
      <p class="text-gray-600 line-clamp-3">
        {{ course.description }}
      </p>

      <!-- Course meta -->
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span>{{ course.credits }} credits</span>
        <span>{{ course.academicHome }}</span>
      </div>

      <!-- Course types -->
      <div v-if="course.courseType?.length" class="flex flex-wrap gap-2">
        <span 
          v-for="type in course.courseType" 
          :key="type"
          class="text-xs px-2 py-1 bg-psu-gray-100 text-psu-gray-700 rounded"
        >
          {{ type }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Course } from '~/types/content'

defineProps<{
  course: Course & { id: string; stem: string; path: string }
}>()
</script>
