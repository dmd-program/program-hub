<template>
  <div class="accordion-group" role="region" aria-label="Course information">
    <ul class="accordion vertical menu">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="accordion-group-tab accordion-item"
        :class="{ 'is-active': activeIndex === index }"
      >
        <button
          :id="`${item.id}-heading`"
          class="accordion-title"
          type="button"
          :aria-expanded="activeIndex === index"
          :aria-controls="item.id"
          @click="toggle(index)"
          @keydown="handleKeydown($event, index)"
        >
          <span>{{ item.title }}</span>
          <span class="accordion-icon" aria-hidden="true">
            {{ activeIndex === index ? '−' : '+' }}
          </span>
        </button>
        <div
          :id="item.id"
          class="accordion-content"
          role="region"
          :aria-labelledby="`${item.id}-heading`"
          :hidden="activeIndex !== index"
        >
          <ul class="menu vertical nested">
            <slot :name="item.id" :courses="item.courses"></slot>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface AccordionItem {
  id: string
  title: string
  courses?: any[]
}

interface Props {
  items: AccordionItem[]
  allowAllClosed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  allowAllClosed: true
})

const activeIndex = ref<number | null>(null)

const toggle = (index: number) => {
  const wasActive = activeIndex.value === index
  
  if (wasActive && props.allowAllClosed) {
    activeIndex.value = null
  } else {
    activeIndex.value = index
    
    // Scroll to accordion item when opening (not closing)
    if (!wasActive) {
      nextTick(() => {
        const heading = document.getElementById(`${props.items[index].id}-heading`)
        if (heading) {
          heading.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          })
        }
      })
    }
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent, index: number) => {
  const itemCount = props.items.length
  
  switch(event.key) {
    case 'ArrowDown':
    case 'Down':
      event.preventDefault()
      focusNextItem(index, itemCount)
      break
    case 'ArrowUp':
    case 'Up':
      event.preventDefault()
      focusPreviousItem(index, itemCount)
      break
    case 'Home':
      event.preventDefault()
      focusItem(0)
      break
    case 'End':
      event.preventDefault()
      focusItem(itemCount - 1)
      break
  }
}

const focusItem = (index: number) => {
  const heading = document.getElementById(`${props.items[index].id}-heading`)
  heading?.focus()
}

const focusNextItem = (currentIndex: number, itemCount: number) => {
  const nextIndex = (currentIndex + 1) % itemCount
  focusItem(nextIndex)
}

const focusPreviousItem = (currentIndex: number, itemCount: number) => {
  const previousIndex = currentIndex === 0 ? itemCount - 1 : currentIndex - 1
  focusItem(previousIndex)
}
</script>

<style scoped>
.accordion-group {
  margin: 2rem 0;
}

.accordion.vertical.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.accordion-item {
  border-bottom: 1px solid #e6e6e6;
}

.accordion-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.25rem 1rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  font-weight: 500;
  color: #1e407c;
  text-decoration: none;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.25s ease-out;
}

.accordion-title:hover {
  background-color: #f5f5f5;
}

.accordion-title:focus-visible {
  outline: 3px solid #ff5722;
  outline-offset: -3px;
  background-color: #f5f5f5;
}

.accordion-icon {
  font-size: 1.5rem;
  line-height: 1;
  color: #ff5722;
  font-weight: bold;
  transition: transform 0.25s ease-out;
  min-width: 1.5rem;
  text-align: center;
}

.accordion-content {
  padding: 0;
  background-color: #fafafa;
  overflow: hidden;
}

.accordion-content[hidden] {
  display: none;
}

.menu.vertical.nested {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
