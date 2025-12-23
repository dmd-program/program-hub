<template>
  <div>
    <!-- Hero Header with Background -->
    <section class="about-header">
      <LayoutHeader />
      <div class="quote-row">
        <div class="container-custom">
          <h1 class="text-5xl md:text-6xl font-bold">
            About
          </h1>
          <h2 class="quote">
            Integration with identity
          </h2>
        </div>
      </div>
    </section>

    <!-- Tab Navigation -->
    <div class="secondary-tabs-row">
      <div class="container-custom">
        <div class="flex justify-center">
          <ul class="tabs" role="tablist">
            <li 
              class="tabs-title tabs-first" 
              :class="{ 'is-active': activeTab === 'students' }"
              role="presentation"
            >
              <a 
                @click.prevent="activeTab = 'students'"
                href="#student-panel"
                role="tab"
                :aria-selected="activeTab === 'students'"
              >
                Students
              </a>
            </li>
            <li 
              class="tabs-title tabs-second"
              :class="{ 'is-active': activeTab === 'faculty' }"
              role="presentation"
            >
              <a 
                @click.prevent="activeTab = 'faculty'"
                href="#meet-panel"
                role="tab"
                :aria-selected="activeTab === 'faculty'"
              >
                Meet the Faculty
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="head-spacing foot-spacing">
      <div class="container-custom">

      <!-- Student Experience Tab -->
      <div 
        v-show="activeTab === 'students'" 
        class="tabs-content"
        id="student-panel"
        role="tabpanel"
      >
        <div class="max-w-4xl mx-auto">
          <h2 class="callout-heading">Student experience</h2>
          <p class="text-lg leading-relaxed mb-6">
            The curriculum is delivered entirely online through Penn State World Campus and 
            integrates courses in art and design, information sciences and technology, 
            communications, and general education options. When embedded in problem-based, 
            purpose-driven inquiry the curriculum is dynamic and responsive to individual 
            needs, interests and aspirations. This approach is well suited and expertly 
            supported in the resource rich online environment.
          </p>
          <p class="text-lg leading-relaxed">
            Students take a series of prescribed courses in digital multimedia design, 
            supporting courses in related areas, and additional courses drawn from online 
            tracks in visual arts and design, information sciences and technologies, and 
            communications. The content is sequenced in order to be informing and 
            transforming as students move through the degree.
          </p>
        </div>
      </div>

      <!-- Faculty Tab -->
      <div 
        v-show="activeTab === 'faculty'" 
        class="tabs-content"
        id="meet-panel"
        role="tabpanel"
      >
        <!-- Display Level 1 Faculty -->
        <div 
          v-for="member in getFacultyByLevel(1)" 
          :key="member.email || member.name"
          class="row faculty"
        >
          <div class="small-12 medium-3 large-4 columns">
            <img 
              v-if="member.imageUrl"
              :src="member.imageUrl" 
              :alt="member.name"
              class="thumbnail"
            />
          </div>
          <div class="small-12 medium-9 large-8 columns">
            <h3>{{ member.name }}</h3>
            <p class="faculty-info">
              <span 
                v-for="(role, index) in (member.role || [])" 
                :key="index"
                class="highlight black"
              >
                {{ role }}
              </span>
              <br v-if="member.role && member.role.length > 0">
              <template v-if="member.college">{{ member.college }}<br></template>
              <template v-if="member.email">{{ member.email }}</template>
            </p>
            <ContentRenderer v-if="member.body" :value="member" class="prose" />
          </div>
        </div>

        <!-- Display Level 2 Faculty -->
        <div 
          v-for="member in getFacultyByLevel(2)" 
          :key="member.email || member.name"
          class="row faculty"
        >
          <div class="small-12 medium-3 large-4 columns">
            <img 
              v-if="member.imageUrl"
              :src="member.imageUrl" 
              :alt="member.name"
              class="thumbnail"
            />
          </div>
          <div class="small-12 medium-9 large-8 columns">
            <h3>{{ member.name }}</h3>
            <p class="faculty-info">
              <span 
                v-for="(role, index) in (member.role || [])" 
                :key="index"
                class="highlight black"
              >
                {{ role }}
              </span>
              <br v-if="member.role && member.role.length > 0">
              <template v-if="member.college">{{ member.college }}<br></template>
              <template v-if="member.email">{{ member.email }}</template>
            </p>
            <ContentRenderer v-if="member.body" :value="member" class="prose" />
          </div>
        </div>

        <!-- Display Level 3 Faculty -->
        <div 
          v-for="member in getFacultyByLevel(3)" 
          :key="member.email || member.name"
          class="row faculty"
        >
          <div class="small-12 medium-3 large-4 columns">
            <img 
              v-if="member.imageUrl"
              :src="member.imageUrl" 
              :alt="member.name"
              class="thumbnail"
            />
          </div>
          <div class="small-12 medium-9 large-8 columns">
            <h3>{{ member.name }}</h3>
            <p class="faculty-info">
              <span 
                v-for="(role, index) in (member.role || [])" 
                :key="index"
                class="highlight black"
              >
                {{ role }}
              </span>
              <br v-if="member.role && member.role.length > 0">
              <template v-if="member.college">{{ member.college }}<br></template>
              <template v-if="member.email">{{ member.email }}</template>
            </p>
            <ContentRenderer v-if="member.body" :value="member" class="prose" />
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeTab = ref('students')

// Fetch faculty members by level
const { data: level1Faculty } = await useAsyncData('faculty-level-1', async () => {
  const allFaculty = await queryCollection('faculty').all()
  return allFaculty
    .filter(member => member.facultyDisplayLevel === 1 && member.published !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
})

const { data: level2Faculty } = await useAsyncData('faculty-level-2', async () => {
  const allFaculty = await queryCollection('faculty').all()
  return allFaculty
    .filter(member => member.facultyDisplayLevel === 2 && member.published !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
})

const { data: level3Faculty } = await useAsyncData('faculty-level-3', async () => {
  const allFaculty = await queryCollection('faculty').all()
  return allFaculty
    .filter(member => member.facultyDisplayLevel === 3 && member.published !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
})

const getFacultyByLevel = (level: number) => {
  if (level === 1) return level1Faculty.value || []
  if (level === 2) return level2Faculty.value || []
  if (level === 3) return level3Faculty.value || []
  return []
}

useHead({
  title: 'About',
})

useSeoMeta({
  title: 'About DMD | Penn State Digital Multimedia Design',
  description: 'Learn about Penn State\'s Digital Multimedia Design program - a unique interdisciplinary Bachelor of Design degree delivered fully online.',
  ogTitle: 'About the DMD Program',
})
</script>

<style scoped>
/* Additional tab styles to match original */
.tabs {
  text-align: center;
  border: 0;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tabs-title {
  width: 50%;
}

.tabs-title a {
  display: block;
  padding: 1rem;
  background: #fff;
  color: #212121;
  font-size: 1.25rem;
  text-decoration: none;
  transition: background 0.2s;
}

.tabs-title a:hover {
  background: #efefef;
}

.tabs-title.is-active {
  border-bottom: 4px solid #212121;
}

@media (max-width: 640px) {
  .tabs-title a {
    font-size: 0.75rem;
  }
}

/* Row and column classes for grid layout */
.row {
  max-width: 75rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.columns {
  padding: 0 0.9375rem;
}

.small-12 {
  width: 100%;
}

@media (min-width: 640px) {
  .medium-3 {
    width: 25%;
  }
  .medium-9 {
    width: 75%;
  }
  .medium-10 {
    width: 83.33333%;
  }
}

@media (min-width: 1024px) {
  .large-4 {
    width: 33.33333%;
  }
  .large-6 {
    width: 50%;
  }
  .large-8 {
    width: 66.66667%;
  }
}

.small-centered {
  margin-left: auto;
  margin-right: auto;
  float: none;
}

/* Faculty specific styles */
.row.faculty {
  margin-bottom: 2rem;
}

.row.faculty img {
  width: 100%;
  margin-bottom: 2rem;
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}

.row.faculty h3 {
  text-align: left;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.row.faculty .faculty-info {
  border-bottom: 1px solid #212121;
  padding-bottom: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

/* Thumbnail styles */
.thumbnail {
  border: solid 4px #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
  display: inline-block;
  line-height: 0;
  max-width: 100%;
  transition: box-shadow 200ms ease-out;
  border-radius: 0;
  margin-bottom: 1rem;
}

.thumbnail:hover,
.thumbnail:focus {
  box-shadow: 0 0 6px 1px rgba(0, 95, 169, 0.5);
}

#meet-panel .thumbnail {
  max-width: 297px;
  width: 100%;
}

/* Highlight badge styles */
span.highlight {
  color: #fff;
  font-weight: 400;
  word-wrap: break-word;
  padding: 0 0.5rem;
  text-transform: uppercase;
  background: #000;
  margin-right: 0.5rem;
  display: inline-block;
  margin-bottom: 0.25rem;
}

span.highlight.black {
  background: #212121;
}
</style>
