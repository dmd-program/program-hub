<template>
  <div>
    <LayoutHeader />
    <section class="program-header">
      <div class="quote-row">
        <div class="container-custom">
          <h1 class="text-5xl md:text-6xl font-bold">
            Tools
          </h1>
          <h2 class="quote">
            Plan your academic path
          </h2>
        </div>
      </div>
    </section>

    <section class="foot-spacing">
      <div class="container-custom">
        <!-- Introduction -->
        <div class="mb-12 p-8 bg-blue-50 rounded">
          <h2 class="text-3xl font-bold mb-4">Academic Plan Generator</h2>
          <p class="text-gray-700 mb-4">
            This tool helps you create a personalized academic plan based on the Digital Multimedia Design degree requirements. 
            The suggested plan below provides one pathway through the curriculum, but many variations are possible.
          </p>
          <p class="text-sm text-gray-600 italic">
            This plan should be used in conjunction with your degree audit in LionPATH and by consulting with a Penn State academic adviser.
          </p>
        </div>

        <!-- Credit Counter -->
        <div :class="[
          'mb-8 p-4 rounded border-l-4 font-bold',
          totalCredits <= 120
            ? 'bg-green-50 border-green-500 text-green-900'
            : 'bg-red-50 border-red-500 text-red-900'
        ]">
          Total Credits: {{ totalCredits }} / 120
          <span v-if="totalCredits > 120" class="ml-3 text-sm">
            ⚠️ Over by {{ totalCredits - 120 }} credits
          </span>
          <span v-else-if="totalCredits === 120" class="ml-3 text-sm">
            ✓ Perfect fit!
          </span>
          <span v-else class="ml-3 text-sm">
            {{ 120 - totalCredits }} credits remaining
          </span>
        </div>

        <!-- Semester Start Configuration -->
        <div class="mb-12 p-6 bg-gray-50 rounded border border-gray-300">
          <h3 class="text-2xl font-bold mb-6">When Are You Starting?</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Starting Term -->
            <div>
              <label class="block text-sm font-bold mb-2">Starting Term:</label>
              <select 
                v-model="startingTerm"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              >
                <option value="fall">Fall</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
              </select>
            </div>

            <!-- Starting Year -->
            <div>
              <label class="block text-sm font-bold mb-2">Starting Year:</label>
              <select 
                v-model.number="startingYear"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              >
                <option v-for="year in yearsAvailable" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Pathway Selection -->
        <div class="mb-12 p-6 bg-purple-50 rounded border border-purple-300">
          <h3 class="text-2xl font-bold mb-6">Select Your Pathway</h3>
          <p class="text-gray-700 mb-6">
            Choose a pathway to customize your academic plan. Each pathway includes curated courses that align with specific creative and technical focuses.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              v-for="pathway in [...pathwayOptions, { id: 'custom', title: 'Custom' }]"
              :key="pathway.id"
              @click="selectedPathway = pathway.id"
              :class="[
                'p-4 rounded text-left transition-all font-semibold',
                selectedPathway === pathway.id
                  ? 'bg-purple-600 text-white shadow-lg border-2 border-purple-700'
                  : 'bg-white text-gray-900 border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50'
              ]"
            >
              {{ pathway.title }}
            </button>
          </div>
          
          <div v-if="selectedPathwayDescription" class="mt-6 p-4 bg-white rounded border border-purple-200">
            <p class="text-gray-700">{{ selectedPathwayDescription }}</p>
          </div>
        </div>

        <!-- Custom Courses Selection (only shows if Custom is selected) -->
        <div v-if="selectedPathway === 'custom'" class="mb-12 p-6 bg-indigo-50 rounded border border-indigo-300">
          <h3 class="text-2xl font-bold mb-6">Build Your Custom Plan</h3>
          <p class="text-gray-700 mb-6">
            Select courses to add to your academic plan. The system will distribute them across semesters. 
            Keep in mind the 120-credit requirement and semester load limits (max 15 credits/semester).
          </p>
          
          <div class="space-y-3">
            <div v-for="course in allCourses" :key="course.code" class="flex items-start p-3 bg-white rounded border border-indigo-200 hover:border-indigo-400">
              <input 
                :id="`course-${course.code}`"
                v-model="selectedAdditionalCourses"
                type="checkbox" 
                :value="course.code"
                class="mt-1 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
              />
              <label :for="`course-${course.code}`" class="ml-3 cursor-pointer flex-1">
                <div>
                  <strong>{{ course.code }}</strong> - {{ course.title }}
                  <span class="text-gray-600 text-sm">({{ course.credits }} credits)</span>
                </div>
                <div v-if="course.offeredIn" class="text-xs text-gray-500 mt-1">
                  Offered: {{ course.offeredIn }}
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Pathway-specific courses info (for non-custom pathways) -->
        <div v-if="selectedPathway && selectedPathway !== 'custom'" class="mb-6 p-4 bg-blue-50 rounded border border-blue-200">
          <p class="text-sm text-gray-700">
            <strong>{{ selectedPathwayTitle }} Pathway:</strong> {{ getPathwayCoursesInfo() }}
          </p>
        </div>

        <!-- Generate Button -->
        <div v-if="selectedPathway" class="mb-12">
          <button
            @click="generatePlan"
            class="px-8 py-4 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition-colors text-lg"
          >
            Generate My Academic Plan
          </button>
        </div>

        <!-- Generated Plan -->
        <div v-if="generatedPlan" class="mb-12">
          <h3 class="text-2xl font-bold mb-6">Your Suggested Academic Plan</h3>
          <p class="text-sm text-gray-600 mb-6">
            <strong>Starting:</strong> {{ capitalize(startingTerm) }} {{ startingYear }} | 
            <strong>Total Credits:</strong> 120
          </p>

          <div class="space-y-8">
            <div 
              v-for="(semester, index) in generatedPlan" 
              :key="index"
              class="border-l-4 border-orange-500 pl-6 pb-6"
            >
              <h4 class="text-xl font-bold mb-4">
                {{ semester.name }}
              </h4>
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="text-left px-3 py-2 border">Course</th>
                    <th class="text-left px-3 py-2 border">Type</th>
                    <th class="text-left px-3 py-2 border">Credits</th>
                    <th class="text-left px-3 py-2 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="course in semester.courses" :key="course.code" class="border-b">
                    <td class="px-3 py-2 border"><strong>{{ course.code }}</strong> - {{ course.title }}</td>
                    <td class="px-3 py-2 border text-xs">
                      <span v-if="course.courseType && course.courseType.length > 0">
                        {{ course.courseType.join(', ') }}
                      </span>
                      <span v-else class="text-gray-400">-</span>
                    </td>
                    <td class="px-3 py-2 border text-center">{{ course.credits }}</td>
                    <td class="px-3 py-2 border text-xs text-gray-600">{{ course.notes }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-3 pt-3 border-t border-gray-200 text-right font-bold">
                Semester Total: {{ semester.total }} credits
              </div>
            </div>
          </div>

          <!-- Print/Export Options -->
          <div class="mt-8 flex gap-4">
            <button
              @click="printPlan"
              class="px-6 py-3 bg-gray-500 text-white font-bold rounded hover:bg-gray-600 transition-colors"
            >
              Print Plan
            </button>
            <button
              @click="downloadPlan"
              class="px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors"
            >
              Download as PDF
            </button>
          </div>
        </div>

        <!-- Default Plan (if not customized) -->
        <div v-if="!generatedPlan">
          <h3 class="text-2xl font-bold mb-6">Suggested Four-Year Plan</h3>
          <p class="text-gray-700 mb-6">
            Below is the recommended academic pathway for the Digital Multimedia Design degree. 
            Generate your custom plan above to see how different course selections affect your schedule.
          </p>

          <div class="space-y-8">
            <div 
              v-for="(semester, index) in defaultPlan" 
              :key="index"
              class="border-l-4 border-orange-500 pl-6 pb-6"
            >
              <h4 class="text-xl font-bold mb-4">
                {{ semester.name }}
              </h4>
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="text-left px-3 py-2 border">Course</th>
                    <th class="text-left px-3 py-2 border">Type</th>
                    <th class="text-left px-3 py-2 border">Credits</th>
                    <th class="text-left px-3 py-2 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="course in semester.courses" :key="course.code" class="border-b">
                    <td class="px-3 py-2 border"><strong>{{ course.code }}</strong> - {{ course.title }}</td>
                    <td class="px-3 py-2 border text-xs">
                      <span v-if="course.courseType && course.courseType.length > 0">
                        {{ course.courseType.join(', ') }}
                      </span>
                      <span v-else class="text-gray-400">-</span>
                    </td>
                    <td class="px-3 py-2 border text-center">{{ course.credits }}</td>
                    <td class="px-3 py-2 border text-xs text-gray-600">{{ course.notes }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-3 pt-3 border-t border-gray-200 text-right font-bold">
                Semester Total: {{ semester.total }} credits
              </div>
            </div>
          </div>
        </div>

        <!-- Notes Section -->
        <div class="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <h3 class="font-bold mb-3">Important Notes:</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li><strong>*</strong> Requires a grade of C or better for the major</li>
            <li><strong>W:</strong> Satisfies Writing Across the Curriculum requirement</li>
            <li><strong>US/IL:</strong> Satisfies Cultural Diversity Requirements</li>
            <li>This plan is flexible and can be adjusted based on course availability and personal circumstances</li>
            <li>Always consult with your academic adviser before finalizing your plan</li>
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
  notes?: string
  offeredIn?: string
  courseType?: string[] // [Prescribed], [Additional], [Supporting], [General Education], etc.
}

interface Semester {
  name: string
  courses: Course[]
  total: number
}

interface Pathway {
  id: string
  title: string
  description: string
  courses: string[] // course codes
}

const startingTerm = ref<'fall' | 'spring' | 'summer'>('fall')
const startingYear = ref<number>(new Date().getFullYear())
const selectedPathway = ref<string>('')
const yearsAvailable = computed(() => {
  const current = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => current + i)
})

const selectedAdditionalCourses = ref<string[]>([])
const generatedPlan = ref<Semester[] | null>(null)

// Load actual course data from content
const { fetchAllCourses } = useCourses()
const allCourses = ref<Course[]>([])
const coursesLoaded = ref(false)

// Fetch courses on mount
const fetchCoursesData = async () => {
  try {
    const courses = await fetchAllCourses()
    
    // Map course data to our Course interface
    allCourses.value = courses.map((course: any) => {
      // Extract primary course code (before parentheses if any)
      const code = (course.number || '').split('(')[0].trim()
      return {
        code,
        title: course.title || '',
        credits: course.credits || 3,
        offeredIn: course['offered-in'] || course['offeredIn'] || '',
        courseType: course.courseType || []
      }
    }).filter(c => c.code) // Filter out courses without codes
    
    coursesLoaded.value = true
  } catch (error) {
    console.error('Error loading courses:', error)
    coursesLoaded.value = true // Mark as loaded even on error to avoid blocking UI
  }
}

// Call on component setup
fetchCoursesData()

// Computed property that triggers re-render when courses load
const defaultPlan = computed(() => {
  // This depends on coursesLoaded, so it will re-compute when courses load
  coursesLoaded.value // Access the reactive ref to establish dependency
  return getDefaultPlan()
})

// Pathway definitions with their recommended courses (using actual course codes)
const pathways: Pathway[] = [
  {
    id: 'generalist',
    title: 'Generalist',
    description: 'Broad exploration across design disciplines with flexibility in course selection.',
    courses: ['ART 010', 'ART 020', 'COMM 118', 'COMM 190', 'IST 140', 'IST 240']
  },
  {
    id: 'digital-design',
    title: 'Digital Design',
    description: 'Focus on interface design, user experience, and digital product development.',
    courses: ['ART 211Y', 'COMM 205', 'COMM 230W', 'COMM 296', 'IST 250', 'IST 261']
  },
  {
    id: 'video-production',
    title: 'Video Production',
    description: 'Emphasis on motion graphics, video storytelling, and multimedia production.',
    courses: ['ART 200', 'ART 201', 'COMM 180', 'COMM 215', 'COMM 282', 'DART 206']
  },
  {
    id: 'interactive-media-developer',
    title: 'Interactive Media Developer',
    description: 'Technical focus on interactive applications, web development, and creative coding.',
    courses: ['IST 140', 'IST 240', 'IST 250', 'IST 261', 'IST 331', 'IST 256']
  },
  {
    id: 'media-for-civic-engagement',
    title: 'Media for Civic Engagement',
    description: 'Apply design and media to social impact, community engagement, and civic issues.',
    courses: ['COMM 118', 'COMM 180', 'COMM 205', 'COMM 230W', 'COMM 310', 'COMM 342']
  }
]

const pathwayOptions = computed(() => pathways.map(p => ({ id: p.id, title: p.title })))

const selectedPathwayDescription = computed(() => {
  if (selectedPathway.value === 'custom') {
    return 'Build your own custom academic plan by selecting individual courses.'
  }
  const pathway = pathways.find(p => p.id === selectedPathway.value)
  return pathway?.description
})

const selectedPathwayTitle = computed(() => {
  if (selectedPathway.value === 'custom') return 'Custom'
  const pathway = pathways.find(p => p.id === selectedPathway.value)
  return pathway?.title
})

// Helper to get course info by code
const getCourseInfo = (code: string): Course | undefined => {
  const normalizedCode = code.toUpperCase().trim()
  return allCourses.value.find(c => c.code.toUpperCase() === normalizedCode)
}

// Helper to build course objects with actual data
const buildCourse = (code: string, notes?: string): Course => {
  const courseData = getCourseInfo(code)
  return {
    code,
    title: courseData?.title || code,
    credits: courseData?.credits || 3,
    notes,
    offeredIn: courseData?.offeredIn,
    courseType: courseData?.courseType
  }
}
const pathwayCourses = computed(() => {
  if (!selectedPathway.value || selectedPathway.value === 'custom') return []
  const pathway = pathways.find(p => p.id === selectedPathway.value)
  return pathway?.courses || []
})

// Calculate total credits
const totalCredits = computed(() => {
  if (generatedPlan.value) {
    // If plan has been generated, sum all credits from the plan
    return generatedPlan.value.reduce((sum, semester) => sum + semester.total, 0)
  } else {
    // Otherwise estimate based on selections
    const baseCredits = 90 // Core courses + required gen ed
    const selectedCredits = [...pathwayCourses.value, ...selectedAdditionalCourses.value].length * 3
    return baseCredits + selectedCredits
  }
})

const getPathwayCoursesInfo = (): string => {
  const courses = pathwayCourses.value
  return `${courses.length} core courses recommended for this pathway.`
}

// Get lazy-initialized default plan (uses buildCourse which depends on loaded courses)
const getDefaultPlan = (): Semester[] => [
  {
    name: 'Year 1 - Fall',
    courses: [
      buildCourse('DART 202', 'Required*'),
      buildCourse('COMM 215', 'Required'),
      buildCourse('DMD 100', 'Required*'),
      { code: 'GEN-ED-1', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
    ],
    total: 12,
  },
  {
    name: 'Year 1 - Spring',
    courses: [
      buildCourse('COMM 230W', 'Required*'),
      buildCourse('DART 100', 'Additional'),
      { code: 'GEN-ED-2', title: 'General Education Course (IL)', credits: 3, notes: '', courseType: ['General Education'] },
      { code: 'GEN-ED-3', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
    ],
    total: 12,
  },
  {
    name: 'Year 1 - Summer',
    courses: [],
    total: 0,
  },
  {
    name: 'Year 2 - Fall',
    courses: [
      buildCourse('ART 211Y', 'Required*'),
      buildCourse('HCDD 113', 'Required'),
      { code: 'ELECTIVE-1', title: 'Additional Course for Major', credits: 3, notes: '', courseType: ['Additional'] },
      { code: 'ELECTIVE-2', title: 'Additional Course for Major', credits: 3, notes: '', courseType: ['Additional'] },
      { code: 'ELECTIVE-3', title: 'Additional Course for Major', credits: 3, notes: '', courseType: ['Additional'] },
    ],
    total: 15,
  },
  {
    name: 'Year 2 - Spring',
    courses: [
      { code: 'CAS-100-VAR', title: 'Critical Analysis (CAS 100A, 100B, or 100C)', credits: 3, notes: 'Required‡', courseType: ['General Education'] },
      { code: 'ELECTIVE-4', title: 'Additional Course for Major', credits: 3, notes: '', courseType: ['Additional'] },
      { code: 'ELECTIVE-5', title: 'Additional Course for Major', credits: 3, notes: '', courseType: ['Additional'] },
      buildCourse('IST 250', 'Required*'),
      { code: 'ELECTIVE-6', title: 'Additional Course for Major', credits: 3, notes: '', courseType: ['Additional'] },
    ],
    total: 15,
  },
  {
    name: 'Year 2 - Summer',
    courses: [],
    total: 0,
  },
  {
    name: 'Year 3 - Fall',
    courses: [
      { code: 'ENGL-202', title: 'ENGL 202A, 202B, 202C, or 202D', credits: 3, notes: 'Required‡', courseType: ['General Education'] },
      { code: 'ELECTIVE-7', title: 'Additional Course for Major', credits: 3, notes: '', courseType: ['Additional'] },
      { code: 'GEN-ED-4', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
      { code: 'SUPPORT-1', title: 'Supporting Course for Major', credits: 3, notes: '', courseType: ['Supporting'] },
      { code: 'SUPPORT-2', title: 'Supporting Course for Major', credits: 3, notes: '', courseType: ['Supporting'] },
    ],
    total: 15,
  },
  {
    name: 'Year 3 - Spring',
    courses: [
      { code: 'ELECTIVE-8', title: 'Additional Course for Major', credits: 3, notes: '', courseType: ['Additional'] },
      { code: 'GEN-ED-5', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
      { code: 'GEN-ED-6', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
      { code: 'SUPPORT-3', title: 'Supporting Course for Major', credits: 3, notes: '', courseType: ['Supporting'] },
      { code: 'SUPPORT-4', title: 'Supporting Course for Major', credits: 3, notes: '', courseType: ['Supporting'] },
    ],
    total: 15,
  },
  {
    name: 'Year 3 - Summer',
    courses: [],
    total: 0,
  },
  {
    name: 'Year 4 - Fall',
    courses: [
      buildCourse('DMD 300', 'Required*'),
      { code: 'GEN-ED-7', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
      { code: 'GEN-ED-8', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
      { code: 'SUPPORT-5', title: 'Supporting Course for Major', credits: 3, notes: '', courseType: ['Supporting'] },
      { code: 'SUPPORT-6', title: 'Supporting Course for Major', credits: 3, notes: '', courseType: ['Supporting'] },
    ],
    total: 15,
  },
  {
    name: 'Year 4 - Spring',
    courses: [
      buildCourse('DMD 400', 'Required*'),
      { code: 'GEN-ED-9', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
      { code: 'GEN-ED-10', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
      { code: 'GEN-ED-11', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
      { code: 'GEN-ED-12', title: 'General Education Course', credits: 3, notes: '', courseType: ['General Education'] },
    ],
    total: 15,
  },
  {
    name: 'Year 4 - Summer',
    courses: [],
    total: 0,
  },
]

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const generatePlan = () => {
  const plan: Semester[] = structuredClone(getDefaultPlan())
  
  // Combine pathway courses and selected additional courses
  const allSelectedCourses = [...pathwayCourses.value, ...selectedAdditionalCourses.value]
  
  if (allSelectedCourses.length > 0) {
    // Add selected courses to appropriate semesters starting from Year 2 Fall
    let semesterIndex = 3 // Start from Year 2 Fall
    for (const courseCode of allSelectedCourses) {
      let placed = false
      
      // Try to place the course in the next available semester
      while (semesterIndex < plan.length && !placed) {
        const semester = plan[semesterIndex]
        if (!semester) break
        
        const courseToAdd = allCourses.value.find((c: Course) => c.code === courseCode)
        
        // Skip summer semesters if course not offered in summer
        if (semester.name.includes('Summer')) {
          if (courseToAdd && courseToAdd.offeredIn && !courseToAdd.offeredIn.includes('Summer')) {
            semesterIndex++
            continue
          }
        }
        
        // Check if course already exists in this semester
        const courseExists = semester.courses.some((c: Course) => c.code === courseCode)
        
        if (courseToAdd && !courseExists && semester.total + courseToAdd.credits <= 15) {
          const notePrefix = pathwayCourses.value.includes(courseCode) ? `${selectedPathwayTitle.value} Pathway` : 'Selected'
          semester.courses.push({
            code: courseToAdd.code,
            title: courseToAdd.title,
            credits: courseToAdd.credits,
            notes: notePrefix,
            courseType: courseToAdd.courseType
          })
          semester.total += courseToAdd.credits
          placed = true
        }
        
        semesterIndex++
      }
    }
  }

  // Validate plan against degree requirements
  const validationErrors = validatePlan(plan)
  if (validationErrors.length > 0) {
    console.warn('Plan validation warnings:', validationErrors)
  }

  generatedPlan.value = plan
}

const validatePlan = (plan: Semester[]): string[] => {
  const errors: string[] = []
  const allCoursesInPlan = plan.flatMap(s => s.courses)
  
  // Check total credits = 120
  const totalCredits = plan.reduce((sum, sem) => sum + sem.total, 0)
  if (totalCredits !== 120) {
    errors.push(`Total credits should be 120, got ${totalCredits}`)
  }
  
  // Check all prescribed courses are included
  const prescribedCodes = ['DART 202', 'COMM 215', 'COMM 230W', 'DMD 100', 'DMD 300', 'DMD 400', 'ART 211Y', 'HCDD 113', 'IST 250']
  const includedPrescribed = allCoursesInPlan.filter(c => prescribedCodes.includes(c.code)).map(c => c.code)
  const missingPrescribed = prescribedCodes.filter(code => !includedPrescribed.includes(code))
  if (missingPrescribed.length > 0) {
    errors.push(`Missing prescribed courses: ${missingPrescribed.join(', ')}`)
  }
  
  // Check semester credits are 12 or 15
  plan.forEach((semester, index) => {
    if (semester.total !== 0 && semester.total !== 12 && semester.total !== 15) {
      errors.push(`Semester ${index + 1} (${semester.name}) has ${semester.total} credits, should be 12 or 15`)
    }
  })
  
  return errors
}

const printPlan = () => {
  window.print()
}

const downloadPlan = () => {
  // Simple text export - can be enhanced with PDF library
  let text = `DIGITAL MULTIMEDIA DESIGN, B.DES.\nACCEDEMIC PLAN\n\n`
  if (selectedPathway.value) {
    text += `Pathway: ${selectedPathwayTitle.value}\n`
  }
  text += `Starting: ${capitalize(startingTerm.value)} ${startingYear.value}\n`
  text += `Total Credits: 120\n\n`

  const plan = generatedPlan.value || getDefaultPlan()
  
  plan.forEach(semester => {
    text += `${semester.name}\n`
    text += `${'-'.repeat(50)}\n`
    semester.courses.forEach(course => {
      text += `${course.code} - ${course.title} (${course.credits} credits)\n`
    })
    text += `Semester Total: ${semester.total} credits\n\n`
  })

  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', `DMD_Academic_Plan_${selectedPathwayTitle.value || 'Custom'}_${startingYear.value}.txt`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
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

table {
  background-color: white;
}

tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
