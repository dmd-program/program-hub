<template>
  <div>
    <!-- Program Header with Background -->
    <section class="program-header">
      <LayoutHeader />
      <div class="quote-row">
        <div class="container-custom">
          <h1 class="text-5xl md:text-6xl font-bold">
            The Program
          </h1>
          <h2 class="quote">
            Design your path
          </h2>
        </div>
      </div>
    </section>

    <!-- Program Overview -->
    <section class="foot-spacing mt-28">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 class="text-3xl font-bold mb-4">
              Bachelor of Design in Digital Multimedia Design
            </h3>
            <p class="mb-2">
              <strong>Credits:</strong> 120
            </p>
            <p>
              <strong>Official Program Site:</strong> 
              <a href="http://www.worldcampus.psu.edu/degrees-and-certificates/penn-state-online-digital-multimedia-design-bachelors-degree/overview" target="_blank" rel="noopener noreferrer">
                World Campus
              </a>
            </p>
          </div>
          
          <div class="space-y-4">
            <p>
              The Digital Multimedia Design program links courses from the 
              <span class="highlight orange">College of Arts and Architecture</span>, the 
              <span class="highlight green">Donald P. Bellisario College of Communications</span>, and the 
              <span class="highlight blue">College of Information Sciences & Technology</span> 
              at Penn State University. This entirely online interdisciplinary program introduces 
              students to universal design concepts for creative problem solving.
            </p>
            <p>
              Learners will apply contemporary design methods to engage real-world issues in 
              expressive and technical projects. Students will produce a digital portfolio over 
              the duration of their studies and create a self-directed thesis project in their 
              capstone semester.
            </p>
            <p>
              Digital media generally refers to the storage and transmission of information in 
              increasingly varied multimedia digital formats and devices, and within a changing 
              array of modes of communication. Design is a means by which we respond to change 
              in a purposeful way by focusing on issues, problems and opportunities and developing 
              plans for taking innovative and strategic actions.
            </p>
          </div>
        </div>

        <!-- Core Courses Section -->
        <div class="text-center mb-16 max-w-5xl mx-auto head-spacing">
          <GraphicsCoreSvg class="w-48 mx-auto mb-8" />
          <h3 class="callout-heading black">
            Core Courses
          </h3>
          <p class="mb-4 text-lg">
            Core courses are Prescribed (required) courses and aim to provide a wide base of 
            knowledge from which to start exploring pathways. Two courses are contributed from 
            each college, and three "spine" courses (DMD 100, 300, 400) link larger curricular 
            ideas together.
          </p>
          <p class="mb-8 text-sm text-gray-600">
            Access to a camera, camera accessories, and an Adobe CC student subscription is 
            required to complete COMM 215 coursework. Rental equipment available through the 
            College of Communications.
          </p>
          
          <!-- Core Courses Accordion -->
          <UiAccordion v-if="coreAccordionItems.length > 0" :items="coreAccordionItems">
            <template #dmd-core="{ courses }">
              <div class="courseContainer">
                <UiCourseItem v-for="course in courses" :key="course.number" :course="course" />
              </div>
            </template>
            <template #arts-arch-core="{ courses }">
              <div class="courseContainer">
                <UiCourseItem v-for="course in courses" :key="course.number" :course="course" />
              </div>
            </template>
            <template #communications-core="{ courses }">
              <div class="courseContainer">
                <UiCourseItem v-for="course in courses" :key="course.number" :course="course" />
              </div>
            </template>
            <template #ist-core="{ courses }">
              <div class="courseContainer">
                <UiCourseItem v-for="course in courses" :key="course.number" :course="course" />
              </div>
            </template>
          </UiAccordion>
        </div>

        <!-- Pathways Section -->
        <div class="text-center mb-16 max-w-5xl mx-auto">
          <GraphicsPathwaysSvg class="w-48 mx-auto mb-8" />
          <h3 class="callout-heading black">
            Pathways
          </h3>
          <p class="mb-8 text-lg">
            Pathways are suggested Supporting, Additional, and General Education course clusters. 
            They are meant as a starting point for your academic careers and will help guide a 
            conversation with a DMD Program advisor.
          </p>
          
          <!-- Pathways Accordion -->
          <UiAccordion v-if="pathwayAccordionItems.length > 0" :items="pathwayAccordionItems">
            <template #generalist="{ courses }">
              <div class="courseContainer">
                <UiCourseItem v-for="course in courses" :key="course.number" :course="course" />
              </div>
            </template>
            <template #digital-design="{ courses }">
              <div class="courseContainer">
                <UiCourseItem v-for="course in courses" :key="course.number" :course="course" />
              </div>
            </template>
            <template #video-production="{ courses }">
              <div class="courseContainer">
                <UiCourseItem v-for="course in courses" :key="course.number" :course="course" />
              </div>
            </template>
            <template #interactive-media-developer="{ courses }">
              <div class="courseContainer">
                <UiCourseItem v-for="course in courses" :key="course.number" :course="course" />
              </div>
            </template>
            <template #media-for-civic-engagement="{ courses }">
              <div class="courseContainer">
                <UiCourseItem v-for="course in courses" :key="course.number" :course="course" />
              </div>
            </template>
          </UiAccordion>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Fetch all courses
const { data: allCourses } = await useAsyncData('courses', () => 
  queryCollection('courses').all()
)

// Fetch pathways
const { data: pathwaysList } = await useAsyncData('pathways', () => 
  queryCollection('pathways').all()
)

// Filter core courses
const coreCourses = computed(() => {
  if (!allCourses.value) return []
  
  // Log first course to see actual structure
  if (allCourses.value.length > 0) {
    console.log('First course sample:', allCourses.value[0])
  }
  
  // Try both programCore and program-core field names
  const filtered = allCourses.value.filter((course: any) => 
    course.programCore === true || course['program-core'] === true
  )
  
  console.log('Core courses found:', filtered.length)
  if (filtered.length > 0) {
    console.log('Sample core course:', filtered[0])
  }
  
  return filtered
})

// Group core courses by academic home
const dmdCoreCourses = computed(() => {
  const filtered = coreCourses.value.filter((course: any) => 
    course.number?.includes('DMD')
  )
  console.log('DMD courses filtered:', filtered.length, filtered.map(c => c.number))
  return filtered
})

const artsArchCoreCourses = computed(() => {
  const filtered = coreCourses.value.filter((course: any) => {
    const academicHome = course.academicHome || course['academic-home']
    return academicHome === 'Arts & Arch' && !course.number?.includes('DMD')
  })
  console.log('Arts & Arch courses filtered:', filtered.length, filtered.map(c => c.number))
  return filtered
})

const communicationsCoreCourses = computed(() => {
  const filtered = coreCourses.value.filter((course: any) => {
    const academicHome = course.academicHome || course['academic-home']
    return academicHome === 'Comm'
  })
  console.log('Comm courses filtered:', filtered.length, filtered.map(c => c.number))
  return filtered
})

const istCoreCourses = computed(() => {
  const filtered = coreCourses.value.filter((course: any) => {
    const academicHome = course.academicHome || course['academic-home']
    return academicHome === 'IST'
  })
  console.log('IST courses filtered:', filtered.length, filtered.map(c => c.number))
  return filtered
})

// Create accordion items for core courses
const coreAccordionItems = computed(() => [
  {
    id: 'dmd-core',
    title: 'Digital Multimedia Design',
    courses: dmdCoreCourses.value
  },
  {
    id: 'arts-arch-core',
    title: 'College of Arts & Architecture',
    courses: artsArchCoreCourses.value
  },
  {
    id: 'communications-core',
    title: 'College of Communications',
    courses: communicationsCoreCourses.value
  },
  {
    id: 'ist-core',
    title: 'College of Information Sciences and Technology',
    courses: istCoreCourses.value
  }
])

// Create accordion items for pathways with their courses
const pathwayAccordionItems = computed(() => {
  if (!pathwaysList.value || !allCourses.value) return []
  
  return pathwaysList.value.map((pathway: any) => {
    // Get courses that belong to this pathway - check both field name formats
    const pathwayCourses = allCourses.value.filter((course: any) => {
      const pathwayList = course.pathwayList || course['pathway-list']
      return pathwayList?.includes(pathway.title)
    }).sort((a: any, b: any) => {
      // Sort by course number
      return a.number.localeCompare(b.number)
    })
    
    console.log(`Pathway "${pathway.title}": ${pathwayCourses.length} courses`, pathwayCourses.map(c => c.number))
    
    return {
      id: slugify(pathway.title),
      title: pathway.title,
      courses: pathwayCourses
    }
  })
})

// Helper function to slugify strings
const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

useHead({
  title: 'The Program',
})

useSeoMeta({
  title: 'The Program | DMD at Penn State',
  description: 'Learn about the Digital Multimedia Design program - Penn State\'s first fully online interdisciplinary undergraduate degree spanning three colleges.',
  ogTitle: 'The DMD Program | Penn State',
})
</script>

<style scoped>
.highlight {
  padding: 0.2rem 0.4rem;
  margin: 0 0.2rem;
  border-radius: 3px;
  font-weight: 500;
}

.highlight.orange {
  background-color: #ffe0d6;
  color: #ff5722;
}

.highlight.green {
  background-color: #d4f4dd;
  color: #4caf50;
}

.highlight.blue {
  background-color: #d6e9f8;
  color: #2196F3;
}

.head-spacing {
  margin-top: 4rem;
}

.foot-spacing {
  margin-bottom: 4rem;
}

.courseContainer {
  background-color: #fafafa;
}
</style>
