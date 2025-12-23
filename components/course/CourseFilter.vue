<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h3 class="text-lg font-semibold text-psu-blue mb-4">Filter Courses</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Pathway Filter -->
      <div>
        <label for="pathway-filter" class="block text-sm font-medium text-gray-700 mb-2">
          Pathway
        </label>
        <select
          id="pathway-filter"
          v-model="selectedPathway"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-dmd-accent-primary focus:ring-dmd-accent-primary"
        >
          <option value="">All Pathways</option>
          <option value="Generalist">Generalist</option>
          <option value="Digital Design">Digital Design</option>
          <option value="Video Production">Video Production</option>
          <option value="Interactive Media Developer">Interactive Media Developer</option>
          <option value="Media for Civic Engagement">Media for Civic Engagement</option>
        </select>
      </div>

      <!-- College Filter -->
      <div>
        <label for="college-filter" class="block text-sm font-medium text-gray-700 mb-2">
          College
        </label>
        <select
          id="college-filter"
          v-model="selectedCollege"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-dmd-accent-primary focus:ring-dmd-accent-primary"
        >
          <option value="">All Colleges</option>
          <option value="Arts & Arch">Arts & Architecture</option>
          <option value="Communications">Communications</option>
          <option value="IST">Information Sciences & Technology</option>
        </select>
      </div>

      <!-- Course Type Filter -->
      <div>
        <label for="type-filter" class="block text-sm font-medium text-gray-700 mb-2">
          Course Type
        </label>
        <select
          id="type-filter"
          v-model="selectedType"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-dmd-accent-primary focus:ring-dmd-accent-primary"
        >
          <option value="">All Types</option>
          <option value="Prescribed">Prescribed</option>
          <option value="Elective">Elective</option>
          <option value="Additional">Additional</option>
          <option value="General Education">General Education</option>
        </select>
      </div>
    </div>

    <!-- Search Input -->
    <div class="mt-4">
      <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
        Search by Title or Number
      </label>
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        placeholder="e.g., 'Video Production' or 'DMD 100'"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-dmd-accent-primary focus:ring-dmd-accent-primary"
      />
    </div>

    <!-- Active Filters Summary -->
    <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2 items-center">
      <span class="text-sm text-gray-600">Active filters:</span>
      <button
        v-if="selectedPathway"
        @click="selectedPathway = ''"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-dmd-accent-primary text-white hover:bg-blue-600 transition-colors"
      >
        {{ selectedPathway }}
        <Icon name="heroicons:x-mark" class="ml-1 w-4 h-4" />
      </button>
      <button
        v-if="selectedCollege"
        @click="selectedCollege = ''"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-dmd-accent-secondary text-white hover:bg-blue-600 transition-colors"
      >
        {{ selectedCollege }}
        <Icon name="heroicons:x-mark" class="ml-1 w-4 h-4" />
      </button>
      <button
        v-if="selectedType"
        @click="selectedType = ''"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-dmd-accent-tertiary text-white hover:bg-orange-600 transition-colors"
      >
        {{ selectedType }}
        <Icon name="heroicons:x-mark" class="ml-1 w-4 h-4" />
      </button>
      <button
        @click="clearAllFilters"
        class="text-sm text-gray-600 hover:text-psu-blue underline"
      >
        Clear all
      </button>
    </div>

    <!-- Results Count -->
    <div class="mt-4 text-sm text-gray-600">
      Showing {{ filteredCount }} of {{ totalCount }} courses
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  filteredCount: number
  totalCount: number
}>()

const selectedPathway = defineModel<string>('pathway', { default: '' })
const selectedCollege = defineModel<string>('college', { default: '' })
const selectedType = defineModel<string>('type', { default: '' })
const searchQuery = defineModel<string>('search', { default: '' })

const hasActiveFilters = computed(() => {
  return !!(selectedPathway.value || selectedCollege.value || selectedType.value || searchQuery.value)
})

const clearAllFilters = () => {
  selectedPathway.value = ''
  selectedCollege.value = ''
  selectedType.value = ''
  searchQuery.value = ''
}
</script>
