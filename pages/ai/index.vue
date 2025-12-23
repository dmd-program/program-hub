<template>
  <div>
    <!-- Hero Header with Background -->
    <section class="about-header">
      <LayoutHeader />
      <div class="quote-row">
        <div class="container-custom">
          <h1 class="text-5xl md:text-6xl font-bold">
            AI & Design
          </h1>
          <h2 class="quote">
            Developing resilient creative skills
          </h2>
        </div>
      </div>
    </section>

    <div class="head-spacing foot-spacing">
      <div class="container-custom">
        <!-- Introduction -->
        <section class="mb-20">
          <div class="max-w-4xl mx-auto">
            <h2 class="callout-heading">AI in Creative Practice</h2>
            <p class="text-lg leading-relaxed mb-6">
              Artificial intelligence is reshaping creative industries, but the fundamental principles 
              of design thinking, visual communication, and human-centered problem solving remain constant. 
              The Digital Multimedia Design program equips students with resilient, transferrable creative 
              skills that transcend individual tools or technologies.
            </p>
          </div>
        </section>

        <!-- Three Key Areas -->
        <section class="mb-20">
          <h2 class="text-4xl font-bold text-psu-blue mb-12 text-center">
            Building Creative Resilience
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <!-- Core Skills -->
            <div class="bg-white rounded-xl shadow-lg p-8">
              <div class="w-12 h-12 bg-dmd-accent-primary rounded-lg flex items-center justify-center mb-4">
                <Icon name="heroicons:light-bulb" class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-2xl font-semibold text-psu-blue mb-4">
                Transferrable Skills
              </h3>
              <p class="text-gray-700 leading-relaxed">
                Students develop deep expertise in design thinking, composition, user experience, 
                narrative, and critical analysis—skills that apply across tools and platforms. 
                These core competencies remain valuable regardless of technological shifts.
              </p>
            </div>

            <!-- Critical Lens -->
            <div class="bg-white rounded-xl shadow-lg p-8">
              <div class="w-12 h-12 bg-dmd-accent-secondary rounded-lg flex items-center justify-center mb-4">
                <Icon name="heroicons:eye" class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-2xl font-semibold text-psu-blue mb-4">
                Creative & Critical Lens
              </h3>
              <p class="text-gray-700 leading-relaxed">
                We encourage students to explore AI through both creative experimentation and 
                critical analysis. Understanding the capabilities, limitations, and ethical 
                implications of AI tools empowers thoughtful decision-making in creative work.
              </p>
            </div>

            <!-- Adaptive Curriculum -->
            <div class="bg-white rounded-xl shadow-lg p-8">
              <div class="w-12 h-12 bg-dmd-accent-tertiary rounded-lg flex items-center justify-center mb-4">
                <Icon name="heroicons:sparkles" class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-2xl font-semibold text-psu-blue mb-4">
                Evolving Curriculum
              </h3>
              <p class="text-gray-700 leading-relaxed">
                While AI tools are changing rapidly, our curriculum is designed to adapt. 
                We integrate emerging technologies thoughtfully, ensuring students develop 
                unique strengths and creative voices in an AI-augmented creative landscape.
              </p>
            </div>
          </div>
        </section>

        <!-- Resilience and Adaptation -->
        <section class="mb-20 bg-psu-gray-50 -mx-4 md:-mx-8 px-4 md:px-8 py-16 rounded-2xl">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-psu-blue mb-8">
              Why Resilience Matters
            </h2>
            <div class="prose prose-lg max-w-none">
              <p class="mb-6">
                The creative landscape has always been shaped by emerging technologies—from photography 
                to digital design to social media. What remains consistent is the need for skilled creative 
                professionals who can think critically, adapt quickly, and solve complex problems.
              </p>
              <p class="mb-6">
                By focusing on resilient, transferrable skills, DMD graduates are prepared not just for 
                today's tools, but for the creative careers of tomorrow. Whether using AI as a collaborative 
                partner, a research tool, or a source of inspiration, our students understand the principles 
                behind effective design and communication.
              </p>
              <p>
                This approach means students graduate with confidence—not in mastering any single tool, 
                but in their ability to learn new tools, critically evaluate new technologies, and use 
                them creatively and responsibly.
              </p>
            </div>
          </div>
        </section>

        <!-- Exploration and Growth -->
        <section class="mb-20">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-psu-blue mb-8">
              Empowering Unique Strengths
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Rather than chasing every new AI tool, we emphasize developing your unique voice and creative 
              perspective. The interdisciplinary nature of the program means you're exposed to diverse 
              approaches, methodologies, and ways of thinking across art, technology, and communication.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              This diversity becomes your strength. As AI becomes more commodified, creative professionals 
              who combine technical skill with authentic vision, critical thinking, and human insight will 
              be increasingly valuable.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              The DMD program helps you develop these unique strengths—not through rigid specialization, 
              but through exploration, experimentation, and intentional creative practice.
            </p>
          </div>
        </section>

        <!-- Contact CTA -->
        <section class="text-center">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-bold text-psu-blue mb-6">
              Learn More About DMD
            </h2>
            <p class="text-lg text-gray-600 mb-8">
              Ready to develop resilient creative skills for the future? 
              Get in touch to learn more about the program.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="http://www.worldcampus.psu.edu/request-information-program?ProgramID=DIGMDBDES"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
              >
                Request Information
              </a>
              <a 
                href="mailto:dmd@psu.edu"
                class="btn-outline"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'AI & Design',
})

useSeoMeta({
  title: 'AI & Design | Penn State Digital Multimedia Design',
  description: 'Explore how the DMD program builds resilient creative skills and helps students develop unique strengths in an AI-augmented creative landscape.',
  ogTitle: 'AI & Design | Digital Multimedia Design',
})
</script>
