<template>
  <NuxtLink 
    :to="`/program-hub/exhibitions/${exhibitionSlug}`"
    class="card group overflow-hidden"
  >
    <div v-if="exhibition.cardImageUrl" class="aspect-video overflow-hidden">
      <NuxtImg
        :src="exhibition.cardImageUrl"
        :alt="exhibition.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <div class="p-6 space-y-3">
      <div class="flex items-center justify-between text-sm text-gray-600">
        <span>{{ exhibition.course }}</span>
        <span>{{ exhibition.semester }} {{ exhibition.year }}</span>
      </div>
      <h3 class="text-xl font-semibold text-psu-blue group-hover:text-dmd-accent-primary transition-colors">
        {{ exhibition.title }}
      </h3>
      <p v-if="exhibition.description" class="text-gray-600 line-clamp-2">
        {{ exhibition.description }}
      </p>
      <div v-if="exhibition.current" class="inline-flex items-center px-3 py-1 bg-dmd-accent-tertiary text-white text-sm rounded-full">
        Current Exhibition
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Exhibition } from '~/types/content'

const props = defineProps<{
  exhibition: Exhibition & { _path: string }
}>()

const exhibitionSlug = computed(() => {
  return props.exhibition._path.split('/').pop()
})
</script>
