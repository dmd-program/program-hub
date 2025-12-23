<template>
  <div>
    <!-- Hero Section with SVG Header -->
    <section class="svg-header isolate">
      <LayoutHeader />
      <div class="header-content">
        <div class="container-custom">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <!-- SVG Graphic -->
            <div class="center order-2 md:order-1">
              <GraphicsLatticeSvg class="w-full max-w-md mx-auto" />
            </div>
            
            <!-- Title -->
            <div class="center order-1 md:order-2">
              <h1 class="text-5xl md:text-7xl font-bold leading-tight">
                <span>Digital</span>
                <span>Multimedia</span>
                <span>Design</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Program Overview -->
    <section id="program" class="graph-texture py-16 md:py-24">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-4xl md:text-5xl font-bold">
              The Program
            </h2>
            <h3 class="text-2xl font-bold">
              Inspiring leadership in design through interdisciplinary education.
            </h3>
          </div>

          <div class="bg-white p-8 shadow-lg">
            <h3 class="text-2xl font-semibold mb-4">Get in touch</h3>
            <div class="space-y-4">
              <p>
                To find out more regarding advising, admissions, credit transfers, and financial aid, 
                go to the World Campus 
                <a 
                  href="http://www.worldcampus.psu.edu/request-information-program?ProgramID=DIGMDBDES"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DMD Information Request Form
                  <Icon name="heroicons:arrow-top-right-on-square" class="ml-1 w-4 h-4 inline" />
                </a>
              </p>
              <p>
                For any other questions, contact us at 
                <a href="mailto:dmd@psu.edu">
                  dmd@psu.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Three Colleges Section -->
    <section id="future" class="paths-callout">
      <div class="row">
        <div class="small-12 columns">
          <h2 class="callout-heading">Three colleges, one program.</h2>
        </div>
        <div class="small-12 medium-6 large-5 columns">
          <p>
            Most programs take place within one college. The Digital Multimedia Design program 
            expands access to a wider range of courses – those typically out of reach for students 
            enrolled in one academic program. Our students take advanced level courses across the 
            College of Arts and Architecture, College of Communications, and College of IST making 
            it the first interdisciplinary fully-online undergraduate program at Penn State University.
          </p>
        </div>
        
        <div class="small-12 columns design-your-path">
          <h3>DESIGN YOUR PATH</h3>
          <NuxtLink to="/program" class="button">
            <span>See pathways</span>
            <Icon name="heroicons:arrow-path" class="inline w-5 h-5 ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Content Section (optional) -->
    <section class="bg-psu-gray-50 py-16 md:py-24">
      <div class="container-custom">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-psu-blue">
          Explore Our Community
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Courses Card -->
          <NuxtLink to="/courses" class="card group">
            <div class="p-6 space-y-4">
              <div class="w-12 h-12 bg-dmd-accent-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="heroicons:academic-cap" class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-psu-blue">Course Catalog</h3>
              <p class="text-gray-600">
                Browse our comprehensive collection of courses across three colleges.
              </p>
            </div>
          </NuxtLink>

          <!-- Exhibitions Card -->
          <NuxtLink to="/exhibitions" class="card group">
            <div class="p-6 space-y-4">
              <div class="w-12 h-12 bg-dmd-accent-tertiary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="heroicons:photo" class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-psu-blue">Student Exhibitions</h3>
              <p class="text-gray-600">
                View outstanding work from our talented students.
              </p>
            </div>
          </NuxtLink>

          <!-- Community Card -->
          <NuxtLink to="/community" class="card group">
            <div class="p-6 space-y-4">
              <div class="w-12 h-12 bg-dmd-accent-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="heroicons:user-group" class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-psu-blue">Our Community</h3>
              <p class="text-gray-600">
                Meet our faculty and connect with fellow students.
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO for home page
useHead({
  title: 'Home',
})

useSeoMeta({
  title: 'Digital Multimedia Design',
  description: 'Inspiring leadership in design through interdisciplinary education. The DMD program spans three colleges at Penn State University.',
  ogTitle: 'Digital Multimedia Design | Penn State',
  ogDescription: 'Inspiring leadership in design through interdisciplinary education.',
  ogImage: '/assets/img/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
.paths-callout {
  background: linear-gradient(33deg, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.14)), 
    url('/assets/img/pathways-bg.jpg') center center/cover no-repeat;
  color: white;
  padding: 0 1rem;
  min-height: 100vh;
}

@media (max-width: 640px) {
  .paths-callout {
    padding: 1.5rem;
  }
}

.paths-callout h2,
.paths-callout h3,
.paths-callout p {
  color: #212121;
}

.paths-callout h2.callout-heading {
  padding-top: 4rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  color: #212121;
}

.paths-callout h2.callout-heading::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 100px;
  height: 4px;
  background-color: #ff5722;
}

@media (max-width: 640px) {
  .paths-callout h2.callout-heading {
    padding-top: 1rem;
  }
}

.paths-callout p {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #212121;
}

.design-your-path {
  padding-bottom: 4rem;
  padding-top: 20vh;
  text-align: left;
  margin-top: 10vh;
}

.design-your-path h3 {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.design-your-path .button {
  background: white;
  color: black;
  padding: 1rem 2rem;
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
}

.design-your-path .button:hover {
  background: #f0f0f0;
}

@media (max-width: 640px) {
  .design-your-path .button {
    font-size: 1rem;
  }
}

/* Row and column classes */
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
  .medium-6 {
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .large-5 {
    width: 41.66667%;
  }
}
</style>
