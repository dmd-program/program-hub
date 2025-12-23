<template>
  <div class="py-16">
    <div class="container-custom">
      <h1 class="text-4xl md:text-5xl font-bold text-psu-blue mb-8">
        Course Catalog
      </h1>

      <div v-if="pending" class="text-center py-12">
        <div class="animate-pulse">Loading courses...</div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
        <p class="text-red-800">Error loading courses. Please try again later.</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Course Filter -->
        <CourseFilter
          v-model:pathway="filters.pathway"
          v-model:college="filters.college"
          v-model:type="filters.type"
          v-model:search="filters.search"
          :filtered-count="filteredCourses.length"
          :total-count="courses?.length || 0"
        />

        <!-- Course list -->
        <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard 
            v-for="course in filteredCourses" 
            :key="course.id"
            :course="course"
          />
        </div>

        <!-- No results -->
        <div v-else class="text-center py-12">
          <Icon name="heroicons:magnifying-glass" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
          <p class="text-gray-600 mb-4">Try adjusting your filters or search query</p>
          <button @click="clearFilters" class="btn-outline">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/types/content'

// Fetch all courses using Nuxt Content v3 API
const { data: courses, pending, error } = await useAsyncData('courses', () => 
  queryCollection('courses').all()
)

// Filter state
const filters = reactive({
  pathway: '',
  college: '',
  type: '',
  search: '',
})

// Computed filtered courses
const filteredCourses = computed(() => {
  if (!courses.value) return []
  
  return courses.value.filter((course: any) => {
    // Pathway filter
    if (filters.pathway && course.pathwayList) {
      if (!course.pathwayList.includes(filters.pathway)) return false
    }
    
    // College filter
    if (filters.college && course.academicHome !== filters.college) return false
    
    // Type filter
    if (filters.type && course.courseType) {
      if (!course.courseType.includes(filters.type)) return false
    }
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const titleMatch = course.title?.toLowerCase().includes(searchLower)
      const numberMatch = course.number?.toLowerCase().includes(searchLower)
      const descMatch = course.description?.toLowerCase().includes(searchLower)
      
      if (!titleMatch && !numberMatch && !descMatch) return false
    }
    
    return true
  })
})

const clearFilters = () => {
  filters.pathway = ''
  filters.college = ''
  filters.type = ''
  filters.search = ''
}

// SEO
useHead({
  title: 'Courses',
})

useSeoMeta({
  title: 'Course Catalog | DMD Program',
  description: 'Browse our comprehensive collection of courses across Arts & Architecture, Communications, and Information Sciences & Technology.',
})
</script>
