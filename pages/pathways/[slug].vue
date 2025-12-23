<template>
  <div v-if="pathway" class="py-16">
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
            <NuxtLink to="/program/" class="hover:text-dmd-accent-primary">
              Program
            </NuxtLink>
          </li>
          <li>/</li>
          <li class="text-psu-blue font-medium">{{ pathway.title }}</li>
        </ol>
      </nav>

      <!-- Pathway Header -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-psu-blue mb-4">
          {{ pathway.title }}
        </h1>
        <p v-if="pathway.description" class="text-xl text-gray-600">
          {{ pathway.description }}
        </p>
      </div>

      <!-- Pathway Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="prose prose-lg max-w-none">
              <ContentRenderer :value="pathway" />
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Pathway Info Card -->
          <div class="bg-white rounded-lg shadow p-6 space-y-4">
            <h3 class="font-semibold text-lg text-psu-blue">Pathway Information</h3>
            
            <div v-if="pathway.totalCredits">
              <h4 class="text-sm font-medium text-gray-700 mb-1">Total Credits</h4>
              <p class="text-2xl font-bold text-dmd-accent-primary">{{ pathway.totalCredits }}</p>
            </div>

            <div v-if="pathway.featured">
              <span class="inline-flex items-center px-3 py-1 bg-dmd-accent-tertiary text-white text-sm rounded-full">
                <Icon name="heroicons:star" class="w-4 h-4 mr-1" />
                Featured Pathway
              </span>
            </div>
          </div>

          <!-- Related Courses -->
          <div v-if="relatedCourses && relatedCourses.length > 0" class="bg-white rounded-lg shadow p-6">
            <h3 class="font-semibold text-lg text-psu-blue mb-4">Related Courses</h3>
            <ul class="space-y-2">
              <li v-for="course in relatedCourses.slice(0, 5)" :key="course.id" class="text-sm">
                <NuxtLink 
                  :to="`/courses/${course.stem.split('/').pop()}`"
                  class="text-dmd-accent-primary hover:underline"
                >
                  {{ course.number }}: {{ course.title }}
                </NuxtLink>
              </li>
            </ul>
            <NuxtLink 
              to="/courses/"
              class="btn-outline w-full mt-4 text-sm text-center"
            >
              View All Courses
            </NuxtLink>
          </div>

          <!-- CTA -->
          <div class="bg-gradient-bg rounded-lg p-6 text-white">
            <h3 class="text-lg font-semibold mb-3">Interested in this pathway?</h3>
            <p class="text-sm mb-4 opacity-90">
              Learn more about the DMD program and how to apply.
            </p>
            <a 
              href="http://www.worldcampus.psu.edu/request-information-program?ProgramID=DIGMDBDES"
              target="_blank"
              rel="noopener noreferrer"
              class="btn bg-white text-psu-blue hover:bg-gray-100 w-full text-center text-sm"
            >
              Request Information
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-16">
    <div class="container-custom text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Pathway Not Found</h1>
      <p class="text-gray-600 mb-8">The pathway you're looking for doesn't exist.</p>
      <NuxtLink to="/program/" class="btn-primary">
        View All Pathways
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('pathways-slug')
const slug = String(route.params.slug)

// Fetch pathway data
const { data: pathway } = await useAsyncData(`pathway-${slug}`, async () => {
  const allPathways = await queryCollection('pathways').all()
  return allPathways.find(p => p.stem.endsWith(slug))
})

// Fetch related courses
const { data: relatedCourses } = await useAsyncData(`pathway-courses-${slug}`, async () => {
  if (!pathway.value?.title) return []
  
  const allCourses = await queryCollection('courses').all()
  return allCourses.filter(course => course.pathwayList?.includes(pathway.value.title))
    .sort({ number: 1 })
    .limit(10)
    .find()
})

// SEO
useHead({
  title: pathway.value?.title || 'Pathway Not Found',
})

useSeoMeta({
  title: pathway.value ? `${pathway.value.title} Pathway | DMD Program` : 'Pathway Not Found',
  description: pathway.value?.description || '',
})
</script>
