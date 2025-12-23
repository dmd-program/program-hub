<template>
  <div v-if="course">
    <!-- Breadcrumb navigation -->
    <div class="bg-gray-100 py-4">
      <div class="container-custom">
        <nav class="text-sm">
          <NuxtLink to="/program" class="hover:text-dmd-orange">⟵ DMD Program</NuxtLink>
          <span class="mx-2">|</span>
          <NuxtLink to="/courses" class="hover:text-dmd-orange">View all courses</NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Microsite Layout (DMD 100, 300, 400) -->
    <template v-if="course.microSite">
      <!-- Title and description section with gray background -->
      <div class="bg-gray-100 py-16">
        <div class="container-custom max-w-4xl text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-psu-blue mb-4">
            {{ course.number }}: {{ course.title }}
          </h1>
          <p v-if="course.description" class="text-lg md:text-xl text-gray-700">
            {{ course.description }}
          </p>
        </div>
      </div>

      <!-- Full-width image -->
      <div v-if="course.imageUrl" class="w-full">
        <NuxtImg
          :src="`/assets/img/${course.imageUrl}`"
          class="w-full h-auto"
          alt="Course banner"
          format="jpg"
        />
      </div>

      <!-- Callout section with gray background -->
      <div v-if="course.callout" class="bg-gray-100 py-16">
        <div class="container-custom max-w-4xl text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-psu-blue">
            {{ course.callout }}
          </h2>
        </div>
      </div>

      <!-- Course Description section -->
      <div v-if="course.microSiteDescription" class="py-16">
        <div class="container-custom max-w-4xl">
          <h2 class="text-3xl md:text-4xl font-bold text-psu-blue mb-6">Course Description</h2>
          <p class="text-lg text-gray-800 leading-relaxed">
            {{ course.microSiteDescription }}
          </p>
        </div>
      </div>

      <!-- Offerings section -->
      <div v-if="course.offerings?.length" class="py-16 bg-gray-50">
        <div class="container-custom max-w-4xl">
          <h3 class="text-2xl font-bold text-psu-blue mb-6">Offerings</h3>
          <div class="flex flex-wrap gap-4">
            <button
              v-for="offering in course.offerings"
              :key="offering.id"
              class="px-6 py-3 rounded-lg transition-colors"
              :class="offering.current ? 'bg-dmd-orange text-white' : 'bg-white text-gray-700 border border-gray-300 hover:border-dmd-orange'"
            >
              {{ offering.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Main markdown content -->
      <div v-if="course" class="py-16">
        <div class="container-custom max-w-4xl">
          <div class="prose prose-lg max-w-none">
            <ContentRenderer :value="course" />
          </div>
        </div>
      </div>

      <!-- Student work section -->
      <div class="py-16 bg-gray-50">
        <div class="container-custom max-w-4xl">
          <h3 class="text-2xl font-bold text-psu-blue text-center mb-8">Student work</h3>
          <div class="text-center text-gray-600">
            <p>Exhibition content will be displayed here</p>
          </div>
        </div>
      </div>

      <!-- Bottom navigation -->
      <div class="bg-gray-100 py-8">
        <div class="container-custom text-center">
          <a
            href="http://www.worldcampus.psu.edu/degrees-and-certificates/penn-state-online-digital-multimedia-design-bachelors-degree/apply"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary inline-block"
          >
            Apply Now
          </a>
        </div>
      </div>
    </template>

    <!-- Standard Course Layout (All other courses) -->
    <template v-else>
      <div class="py-12">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Sidebar with course metadata -->
            <aside class="lg:col-span-1">
              <div class="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h1 class="text-2xl font-bold text-psu-blue mb-2">{{ course.number }}</h1>
                <h2 class="text-xl text-gray-800 mb-6">{{ course.title }}</h2>
                
                <div class="space-y-4">
                  <div v-if="course.credits">
                    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-1">Credits</h3>
                    <p class="text-gray-800">{{ course.credits }}</p>
                  </div>
                  
                  <div v-if="course.academicHome">
                    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-1">Academic Home</h3>
                    <p class="text-gray-800">{{ course.academicHome }}</p>
                  </div>
                  
                  <div v-if="course.preReq">
                    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-1">Prerequisites</h3>
                    <p class="text-gray-700 text-sm">{{ course.preReq }}</p>
                  </div>
                  
                  <div v-if="course.courseType?.length">
                    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-1">Course Type</h3>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="type in course.courseType"
                        :key="type"
                        class="px-3 py-1 bg-dmd-orange text-white text-sm rounded-full"
                      >
                        {{ type }}
                      </span>
                    </div>
                  </div>
                  
                  <div v-if="course.pathwayList?.length">
                    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-1">Pathways</h3>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="pathway in course.pathwayList"
                        :key="pathway"
                        class="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                      >
                        {{ pathway }}
                      </span>
                    </div>
                  </div>
                  
                  <div v-if="course.bulletinLink">
                    <a
                      :href="course.bulletinLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center text-dmd-orange hover:underline text-sm"
                    >
                      View in Penn State Bulletin →
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            <!-- Main content area -->
            <main class="lg:col-span-2">
              <div v-if="course.description" class="mb-8">
                <p class="text-lg text-gray-700">{{ course.description }}</p>
              </div>
              
              <div v-if="course" class="prose prose-lg max-w-none">
                <ContentRenderer :value="course" />
              </div>
            </main>
          </div>
        </div>
      </div>
    </template>
  </div>

  <div v-else class="py-16">
    <div class="container-custom text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
      <p class="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
      <NuxtLink to="/courses/" class="btn-primary">
        Browse All Courses
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('courses-slug')
const slug = String(route.params.slug)

// Fetch course data using Nuxt Content v3 API
const { data: course } = await useAsyncData(`course-${slug}`, async () => {
  const courses = await queryCollection('courses').all()
  return courses.find(c => c.stem.endsWith(slug) || c.stem === slug)
})

// SEO
useHead({
  title: course.value?.title || 'Course Not Found',
})

useSeoMeta({
  title: course.value ? `${course.value.number}: ${course.value.title}` : 'Course Not Found',
  description: course.value?.description || '',
})
</script>
