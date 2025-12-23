<template>
  <div>
    <LayoutHeader />
    <section class="program-header">
      <div class="quote-row">
        <div class="container-custom">
          <h1 class="text-5xl md:text-6xl font-bold">
            Courses
          </h1>
          <h2 class="quote">
            Explore the curriculum
          </h2>
        </div>
      </div>
    </section>

    <section class="foot-spacing">
      <div class="container-custom">
        <!-- Course Categories -->
        <div class="mb-12">
          <h2 class="text-4xl font-bold mb-8">Core Courses</h2>
          
          <!-- Tabs for course selection -->
          <div class="flex flex-wrap gap-2 mb-8 border-b">
            <button
              v-for="category in courseCategories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-4 py-2 uppercase text-sm font-bold transition-colors',
                selectedCategory === category
                  ? 'border-b-4 border-orange-500 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- Courses Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="course in filteredCourses"
              :key="course.code"
              class="p-6 border border-gray-300 rounded hover:shadow-lg transition-shadow"
            >
              <h3 class="text-xl font-bold mb-2">{{ course.code }}</h3>
              <p class="text-gray-700 mb-3">{{ course.title }}</p>
              <p class="text-sm text-gray-600">{{ course.credits }} Credits</p>
              <div v-if="course.requirements" class="mt-3 pt-3 border-t border-gray-200">
                <p class="text-xs text-gray-500"><strong>Prerequisites:</strong> {{ course.requirements }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Courses Section -->
        <div class="mt-16 p-8 bg-gray-50 rounded">
          <h2 class="text-4xl font-bold mb-6">Additional Courses (30 credits)</h2>
          <p class="text-gray-700 mb-6">
            Students select additional courses from the following categories to meet degree requirements. 
            These courses offer flexibility in designing your academic path.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-bold mb-3">Art & Design</h3>
              <ul class="space-y-2 text-sm text-gray-700">
                <li>AA 120N, AA 121</li>
                <li>ART 1, ART 10, ART 20, ART 30</li>
                <li>ART 122Y, ART 200, ART 201</li>
                <li>ART 202, ART 203, ART 204</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-bold mb-3">Communications & Technology</h3>
              <ul class="space-y-2 text-sm text-gray-700">
                <li>COMM 118, COMM 180, COMM 190</li>
                <li>COMM 205, COMM 215, COMM 230</li>
                <li>COMM 242, COMM 280, COMM 282</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Supporting Courses Section -->
        <div class="mt-12 p-8 bg-gray-50 rounded">
          <h2 class="text-4xl font-bold mb-6">Supporting Courses (18 credits)</h2>
          <p class="text-gray-700 mb-4">
            Supporting courses complement your major coursework and may include:
          </p>
          <ul class="space-y-3 text-gray-700">
            <li><strong>History of Art, Design, Technology & Communications:</strong> 6 credits from World Campus offerings</li>
            <li><strong>Related Online Coursework:</strong> 12 credits selected in consultation with an adviser</li>
          </ul>
        </div>

        <!-- Notes Section -->
        <div class="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h3 class="font-bold mb-3">Course Requirements Notes:</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li><strong>*</strong> Requires a grade of C or better for the major</li>
            <li><strong>‡</strong> Requires a grade of C or better for General Education</li>
            <li><strong>W suffix:</strong> Satisfies Writing Across the Curriculum requirement</li>
            <li><strong>US/IL suffix:</strong> Satisfies Cultural Diversity Requirements</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Course {
  code: string
  title: string
  credits: number
  category: string
  requirements?: string
}

const selectedCategory = ref<string>('Required')

const courses: Course[] = [
  // First Year Required
  { code: 'DART 202', title: 'Design Fundamentals', credits: 3, category: 'Required', requirements: 'None' },
  { code: 'COMM 215', title: 'Professional Communication', credits: 3, category: 'Required', requirements: 'None' },
  { code: 'DMD 100', title: 'Digital Multimedia Design I', credits: 3, category: 'Required', requirements: 'None' },
  { code: 'COMM 230', title: 'Design Communication', credits: 3, category: 'Required', requirements: 'COMM 215' },
  { code: 'DART 100', title: 'Basic Design', credits: 3, category: 'Required', requirements: 'DART 202' },
  
  // Second Year Required
  { code: 'ART 211Y', title: 'Art History (W; US)', credits: 3, category: 'Required', requirements: 'None' },
  { code: 'IST 250', title: 'Information Technology I', credits: 3, category: 'Required', requirements: 'None' },
  { code: 'HCDD 113', title: 'Human-Centered Design', credits: 3, category: 'Required', requirements: 'None' },
  
  // Third Year Required
  { code: 'IST 261', title: 'Information Technology II', credits: 3, category: 'Required', requirements: 'IST 250' },
  
  // Fourth Year Required
  { code: 'DMD 300', title: 'Digital Multimedia Design II', credits: 3, category: 'Required', requirements: 'DMD 100' },
  { code: 'DMD 400', title: 'Digital Multimedia Design Capstone', credits: 3, category: 'Required', requirements: 'DMD 300' },

  // General Education Foundations
  { code: 'ENGL 15', title: 'Composition I', credits: 3, category: 'General Education' },
  { code: 'ENGL 30H', title: 'Composition I (Honors)', credits: 3, category: 'General Education' },
  { code: 'CAS 100A', title: 'Critical Thinking & Analysis', credits: 3, category: 'General Education' },
  { code: 'CAS 100B', title: 'Critical Thinking & Analysis', credits: 3, category: 'General Education' },
  { code: 'ENGL 202A', title: 'Composition II', credits: 3, category: 'General Education' },
  { code: 'ENGL 202B', title: 'Composition II', credits: 3, category: 'General Education' },
]

const courseCategories = computed(() => 
  Array.from(new Set(courses.map(c => c.category))).sort()
)

const filteredCourses = computed(() => 
  courses.filter(c => c.category === selectedCategory.value)
)
</script>

<style scoped>
.program-header {
  background: linear-gradient(135deg, #333333 0%, #555555 100%);
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.quote-row {
  width: 100%;
}

.quote {
  font-size: 1.5rem;
  color: #ff5722;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
}
</style>
