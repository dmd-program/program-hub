<template>
  <div class="py-16">
    <div class="container-custom">
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-psu-blue mb-4">
          Student Exhibitions
        </h1>
        <p class="text-xl text-gray-600">
          Showcasing outstanding work from DMD students across all pathways.
        </p>
      </div>

      <div v-if="pending" class="text-center py-12">
        <div class="animate-pulse">Loading exhibitions...</div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
        <p class="text-red-800">Error loading exhibitions. Please try again later.</p>
      </div>

      <div v-else-if="exhibitions && exhibitions.length > 0" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExhibitionCard 
            v-for="exhibition in exhibitions" 
            :key="exhibition._path"
            :exhibition="exhibition as any"
          />
        </div>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-600">No exhibitions available at this time.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: exhibitions, pending, error } = await useAsyncData('exhibitions', async () => {
  const allExhibitions = await queryCollection('exhibitions').all()
  return allExhibitions.sort((a, b) => {
    if (b.year !== a.year) return (b.year || 0) - (a.year || 0)
    const semesterOrder = { 'Fall': 2, 'Spring': 1 }
    return (semesterOrder[b.semester] || 0) - (semesterOrder[a.semester] || 0)
  })
})

useHead({
  title: 'Exhibitions',
})

useSeoMeta({
  title: 'Student Exhibitions | DMD at Penn State',
  description: 'Explore outstanding work from DMD students showcased in our curated exhibitions.',
})
</script>
