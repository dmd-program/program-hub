<template>
  <div>
    <!-- Hero Header with Background -->
    <section class="community-header">
      <LayoutHeader />
      <div class="quote-row">
        <div class="container-custom">
          <h1 class="text-4xl md:text-5xl font-bold">
            Community
          </h1>
          <h2 class="quote">
            Meet your people
          </h2>
        </div>
      </div>
    </section>    <div class="py-16">
      <div class="container-custom">

      <!-- Faculty Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-psu-blue mb-8">
          Our Faculty
        </h2>
        <p class="text-gray-600 mb-8">
          Learn from expert faculty across three colleges who bring real-world 
          experience and cutting-edge research to the classroom.
        </p>
        
        <div class="bg-psu-gray-50 rounded-xl p-8 text-center">
          <Icon name="heroicons:user-group" class="w-16 h-16 mx-auto mb-4 text-psu-blue" />
          <p class="text-gray-600">
            Faculty profiles coming soon
          </p>
        </div>
      </section>

      <!-- Student Work -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-psu-blue mb-8">
          Student Work
        </h2>
        <p class="text-gray-600 mb-8">
          Explore exhibitions showcasing outstanding work from DMD students.
        </p>
        
        <NuxtLink 
          to="/exhibitions/" 
          class="btn-primary inline-flex items-center"
        >
          View Exhibitions
          <Icon name="heroicons:arrow-right" class="ml-2 w-5 h-5" />
        </NuxtLink>
      </section>

      <!-- Connect -->
      <section>
        <div class="bg-gradient-bg rounded-2xl p-12 text-white text-center">
          <h2 class="text-3xl font-bold mb-6">
            Join Our Community
          </h2>
          <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a prospective student, current student, or alumnus, 
            there are many ways to connect with the DMD community.
          </p>
          <a 
            href="mailto:dmd@psu.edu"
            class="btn bg-white text-psu-blue hover:bg-gray-100"
          >
            Get In Touch
          </a>
        </div>
      </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Community',
})

useSeoMeta({
  title: 'Community | DMD at Penn State',
  description: 'Connect with the DMD community - students, faculty, and alumni working at the intersection of art, communication, and technology.',
})
</script>
