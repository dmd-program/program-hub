<template>
  <footer class="footer text-white mt-auto">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About section -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Digital Multimedia Design</h3>
          <p class="text-gray-200 text-sm leading-relaxed">
            Inspiring leadership in design through interdisciplinary education across three colleges at Penn State University.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="item in footerLinks" :key="item.url">
              <NuxtLink 
                :to="item.url"
                class="text-gray-200 hover:text-dmd-accent-secondary transition-colors text-sm"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
            <!-- Program submenu for footer -->
            <li class="pl-4 border-l border-gray-400">
              <NuxtLink 
                to="/program/courses"
                class="text-gray-300 hover:text-dmd-accent-secondary transition-colors text-sm"
              >
                Courses
              </NuxtLink>
            </li>
            <li class="pl-4 border-l border-gray-400">
              <NuxtLink 
                to="/program/tools"
                class="text-gray-300 hover:text-dmd-accent-secondary transition-colors text-sm"
              >
                Tools
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Contact</h3>
          <div class="space-y-3 text-sm">
            <p class="text-gray-200">
              For admissions and program information, visit the 
              <a 
                href="http://www.worldcampus.psu.edu/request-information-program?ProgramID=DIGMDBDES" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-dmd-accent-secondary hover:underline"
              >
                World Campus Information Request Form
                <Icon name="heroicons:arrow-top-right-on-square" class="inline w-3 h-3 ml-1" />
              </a>
            </p>
            <p class="text-gray-200">
              General inquiries: 
              <a 
                href="mailto:dmd@psu.edu"
                class="text-dmd-accent-secondary hover:underline"
              >
                dmd@psu.edu
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/20 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-gray-200 text-sm">
            &copy; {{ currentYear }} The Pennsylvania State University. All rights reserved.
          </p>
          <div class="flex items-center space-x-6">
            <a 
              href="https://github.com/dmd-program"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-200 hover:text-dmd-accent-secondary transition-colors"
              aria-label="GitHub"
            >
              <Icon name="mdi:github" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/content'

const currentYear = new Date().getFullYear()

const footerLinks: MenuItem[] = [
  { url: '/program-hub/', title: 'Home' },
  { url: '/program-hub/program/', title: 'Program' },
  { url: '/program-hub/about/', title: 'About' },
  { url: '/program-hub/community/', title: 'Community' },
  { url: '/program-hub/ai/', title: 'AI & Design' },
]
</script>

<style scoped>
.footer {
  background-color: #607D8B;
  color: #efefef;
}
</style>
