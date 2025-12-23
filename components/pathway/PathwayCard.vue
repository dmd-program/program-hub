<template>
  <NuxtLink :to="pathwayUrl" class="card group">
    <div class="p-6 space-y-4">
      <div class="w-12 h-12 bg-psu-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon :name="icon" class="w-6 h-6 text-white" />
      </div>
      <h3 class="text-xl font-semibold text-psu-blue group-hover:text-dmd-accent-primary transition-colors">
        {{ title }}
      </h3>
      <p class="text-gray-600">
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  icon: string
  slug?: string
}>()

const pathwayUrl = computed(() => {
  const slug = props.slug || props.title.toLowerCase().replace(/\s+/g, '-')
  return `/program-hub/pathways/${slug}`
})
</script>
