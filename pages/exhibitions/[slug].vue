<template>
  <div v-if="exhibition" class="py-16">
    <div class="container-custom">
      <!-- Breadcrumbs -->
      <nav class="mb-8 text-sm">
        <ol class="flex items-center space-x-2 text-gray-600">
          <li>
            <NuxtLink to="/" class="hover:text-dmd-accent-primary">
              Home
            </NuxtLink>
          </li>
          <li>/</li>
          <li>
            <NuxtLink to="/exhibitions/" class="hover:text-dmd-accent-primary">
              Exhibitions
            </NuxtLink>
          </li>
          <li>/</li>
          <li class="text-psu-blue font-medium">{{ exhibition.title }}</li>
        </ol>
      </nav>

      <!-- Exhibition Hero Image -->
      <div v-if="exhibition.exhibitionImage" class="mb-12">
        <NuxtImg
          :src="exhibition.exhibitionImage"
          :alt="exhibition.title"
          class="w-full rounded-2xl shadow-2xl"
          loading="eager"
        />
      </div>

      <!-- Exhibition Header -->
      <div class="mb-12">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-psu-blue mb-2">
              {{ exhibition.title }}
            </h1>
            <div class="flex items-center space-x-4 text-gray-600">
              <span class="font-semibold">{{ exhibition.course }}</span>
              <span>•</span>
              <span>{{ exhibition.semester }} {{ exhibition.year }}</span>
            </div>
          </div>
          <span v-if="exhibition.current" 
            class="px-4 py-2 bg-dmd-accent-tertiary text-white rounded-lg font-semibold">
            Current Exhibition
          </span>
        </div>

        <p v-if="exhibition.description" class="text-xl text-gray-600">
          {{ exhibition.description }}
        </p>
      </div>

      <!-- Exhibition Content -->
      <div class="mb-12">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="prose prose-lg max-w-none">
            <ContentRenderer :value="exhibition" />
          </div>
        </div>
      </div>

      <!-- Projects Gallery Placeholder -->
      <div class="bg-psu-gray-50 rounded-xl p-12 text-center">
        <Icon name="heroicons:photo" class="w-16 h-16 mx-auto mb-4 text-psu-blue" />
        <h3 class="text-2xl font-semibold text-psu-blue mb-2">Student Projects</h3>
        <p class="text-gray-600 mb-4">
          Project galleries will be displayed here once migration is complete.
        </p>
      </div>

      <!-- Related Exhibitions -->
      <div v-if="relatedExhibitions && relatedExhibitions.length > 0" class="mt-16">
        <h2 class="text-3xl font-bold text-psu-blue mb-8">
          More from {{ exhibition.course }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExhibitionCard 
            v-for="related in relatedExhibitions" 
            :key="related._path"
            :exhibition="related as any"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-16">
    <div class="container-custom text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Exhibition Not Found</h1>
      <p class="text-gray-600 mb-8">The exhibition you're looking for doesn't exist.</p>
      <NuxtLink to="/exhibitions/" class="btn-primary">
        Browse All Exhibitions
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('exhibitions-slug')
const slug = String(route.params.slug)

// Fetch exhibition data
const { data: exhibition } = await useAsyncData(`exhibition-${slug}`, async () => {
  const allExhibitions = await queryCollection('exhibitions').all()
  return allExhibitions.find(e => e.stem.endsWith(slug))
})

// Fetch related exhibitions from same course
const { data: relatedExhibitions } = await useAsyncData(`exhibition-related-${slug}`, async () => {
  if (!exhibition.value?.course) return []
  
  const allExhibitions = await queryCollection('exhibitions').all()
  const filtered = allExhibitions
    .filter(e => e.course === exhibition.value.course && !e.stem.endsWith(slug))
    .sort((a, b) => {
      if (b.year !== a.year) return (b.year || 0) - (a.year || 0)
      const semesterOrder = { 'Fall': 2, 'Spring': 1 }
      return (semesterOrder[b.semester] || 0) - (semesterOrder[a.semester] || 0)
    })
  return filtered.slice(0, 6)
})

// SEO
useHead({
  title: exhibition.value?.title || 'Exhibition Not Found',
})

useSeoMeta({
  title: exhibition.value ? `${exhibition.value.title} | DMD Exhibitions` : 'Exhibition Not Found',
  description: exhibition.value?.description || '',
  ogImage: exhibition.value?.cardImageUrl || exhibition.value?.exhibitionImage || '',
})
</script>
