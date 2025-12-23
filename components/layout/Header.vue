<template>
  <header class="top-bar" role="banner">
    <div class="container-custom">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="top-bar-title">
          <NuxtLink to="/" class="masthead" aria-label="Penn State DMD Program Home">
            <img 
              src="/assets/img/psu_shield.svg" 
              alt="The Pennsylvania State University" 
              class="h-12 w-auto"
            />
          </NuxtLink>
          
          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="menu-button md:hidden text-white p-2"
            aria-label="Toggle navigation menu"
            :aria-expanded="mobileMenuOpen"
          >
            <Icon v-if="!mobileMenuOpen" name="heroicons:bars-3" class="w-6 h-6" aria-hidden="true" />
            <Icon v-else name="heroicons:x-mark" class="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <!-- Desktop Navigation -->
        <nav id="responsive-menu" class="hidden md:block" aria-label="Main navigation">
          <div class="top-bar-right">
            <ul class="menu flex items-center space-x-6" role="menubar">
              <li 
                v-for="(item, index) in menuItems" 
                :key="item.url" 
                class="relative" 
                :class="{ 'group': !item.children }"
                role="none"
              >
                <!-- Main item (only link if no children) -->
                <NuxtLink 
                  v-if="!item.children"
                  :to="item.url"
                  class="text-white hover:underline uppercase"
                  role="menuitem"
                >
                  {{ item.title }}
                </NuxtLink>
                
                <!-- Item with children (no link, acts as dropdown toggle) -->
                <div v-else class="relative" @mouseenter="openDesktopDropdown(index)" @mouseleave="closeDesktopDropdown(index)">
                  <button
                    class="text-white hover:underline uppercase flex items-center"
                    :aria-label="`${item.title} submenu`"
                    :aria-expanded="openDesktopDropdowns[index]"
                    role="menuitem"
                    aria-haspopup="true"
                    @click="toggleDesktopDropdown(index)"
                    @keydown.enter="toggleDesktopDropdown(index)"
                    @keydown.space.prevent="toggleDesktopDropdown(index)"
                    @keydown.escape="closeDesktopDropdown(index)"
                    @keydown.down.prevent="focusFirstDropdownItem(index)"
                  >
                    {{ item.title }}
                    <Icon name="heroicons:chevron-down" class="w-4 h-4 ml-1" aria-hidden="true" />
                  </button>
                  
                  <!-- Dropdown menu -->
                  <div
                    v-if="item.children"
                    :class="[
                      'absolute left-0 mt-0 w-48 bg-[#333333] rounded shadow-lg transition-all duration-200 z-50',
                      openDesktopDropdowns[index] ? 'opacity-100 visible' : 'opacity-0 invisible'
                    ]"
                    role="menu"
                    :aria-label="`${item.title} submenu`"
                  >
                    <NuxtLink
                      v-for="(child, childIndex) in item.children"
                      :key="child.url"
                      :to="child.url"
                      :data-parent-index="index"
                      :data-child-index="childIndex"
                      class="block px-4 py-3 text-white hover:bg-[#444444] text-sm uppercase focus:bg-[#444444] focus:outline-none"
                      role="menuitem"
                      @keydown.escape="closeDesktopDropdownAndFocus(index)"
                      @keydown.down.prevent="focusNextDropdownItem(index, childIndex)"
                      @keydown.up.prevent="focusPreviousDropdownItem(index, childIndex)"
                    >
                      {{ child.title }}
                    </NuxtLink>
                  </div>
                </div>
              </li>
              <li class="apply-topbar-button" role="none">
                <a 
                  href="http://www.worldcampus.psu.edu/degrees-and-certificates/penn-state-online-digital-multimedia-design-bachelors-degree/apply" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-white"
                  role="menuitem"
                >
                  Apply
                  <span class="sr-only">(opens in new window)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Mobile Navigation -->
        <nav
          v-show="mobileMenuOpen"
          id="mobile-menu"
          class="md:hidden absolute top-24 right-[5%] w-[90%] bg-[#333333] p-4 z-[100]"
          aria-label="Mobile navigation"
        >
          <div class="top-bar-right w-full">
            <ul class="menu block space-y-2" role="menu">
              <li v-for="item in menuItems" :key="item.url" class="block" role="none">
                <!-- Item without children (normal link) -->
                <NuxtLink 
                  v-if="!item.children"
                  :to="item.url"
                  class="text-white hover:underline uppercase block py-2"
                  role="menuitem"
                  @click="closeMobileMenu"
                >
                  {{ item.title }}
                </NuxtLink>
                
                <!-- Item with children (dropdown toggle) -->
                <button
                  v-else
                  @click="toggleDropdown(item.title)"
                  class="text-white hover:underline uppercase block py-2 w-full text-left flex items-center justify-between"
                  role="menuitem"
                  :aria-expanded="openDropdowns[item.title]"
                  :aria-label="`${item.title} submenu`"
                >
                  {{ item.title }}
                  <Icon 
                    name="heroicons:chevron-down" 
                    :class="['w-4 h-4 transition-transform', openDropdowns[item.title] && 'rotate-180']"
                    aria-hidden="true"
                  />
                </button>
                
                <!-- Dropdown items -->
                <div
                  v-if="item.children && openDropdowns[item.title]"
                  class="pl-4 mt-2 space-y-2 border-l-2 border-[#555555]"
                >
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.url"
                    :to="child.url"
                    class="block px-2 py-2 text-white hover:bg-[#444444] text-sm uppercase rounded"
                    @click="closeMobileMenu"
                  >
                    {{ child.title }}
                  </NuxtLink>
                </div>
              </li>
              <li class="apply-topbar-button block">
                <a 
                  href="http://www.worldcampus.psu.edu/degrees-and-certificates/penn-state-online-digital-multimedia-design-bachelors-degree/apply" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-white block py-2"
                >
                  Apply
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/content'

const mobileMenuOpen = ref(false)
const openDropdowns: Record<string, boolean> = reactive({})
const openDesktopDropdowns = ref<Record<number, boolean>>({})

const menuItems: MenuItem[] = [
  { url: '/', title: 'Home' },
  { 
    url: '/program',
    title: 'Program',
    children: [
      { url: '/program', title: 'Overview' },
      { url: '/program/courses', title: 'Courses' },
      { url: '/program/tools', title: 'Tools' }
    ]
  },
  { url: '/about', title: 'About' },
  { url: '/community', title: 'Community' },
  { url: '/ai', title: 'AI & Design' },
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleDropdown = (title: string) => {
  openDropdowns[title] = !openDropdowns[title]
}

// Desktop dropdown functions
const openDesktopDropdown = (index: number) => {
  openDesktopDropdowns.value[index] = true
}

const closeDesktopDropdown = (index: number) => {
  openDesktopDropdowns.value[index] = false
}

const toggleDesktopDropdown = (index: number) => {
  openDesktopDropdowns.value[index] = !openDesktopDropdowns.value[index]
}

const closeDesktopDropdownAndFocus = (index: number) => {
  closeDesktopDropdown(index)
  // Focus back on the parent button
  nextTick(() => {
    const buttons = document.querySelectorAll('nav[aria-label="Main navigation"] button[aria-haspopup="true"]')
    if (buttons[index]) {
      (buttons[index] as HTMLElement).focus()
    }
  })
}

const focusFirstDropdownItem = (index: number) => {
  openDesktopDropdown(index)
  nextTick(() => {
    const links = document.querySelectorAll(`a[data-parent-index="${index}"]`)
    if (links.length > 0) {
      (links[0] as HTMLElement).focus()
    }
  })
}

const focusNextDropdownItem = (parentIndex: number, currentIndex: number) => {
  const links = document.querySelectorAll(`a[data-parent-index="${parentIndex}"]`)
  const nextIndex = currentIndex + 1
  if (nextIndex < links.length) {
    (links[nextIndex] as HTMLElement).focus()
  }
}

const focusPreviousDropdownItem = (parentIndex: number, currentIndex: number) => {
  const links = document.querySelectorAll(`a[data-parent-index="${parentIndex}"]`)
  const prevIndex = currentIndex - 1
  if (prevIndex >= 0) {
    (links[prevIndex] as HTMLElement).focus()
  } else {
    // Focus back on the parent button
    closeDesktopDropdownAndFocus(parentIndex)
  }
}

// Close mobile menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>
