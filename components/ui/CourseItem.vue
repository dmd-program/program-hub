<template>
  <li class="course-item">
    <div class="courseContainer">
      <h3>
        <span>{{ course.number }}</span>
      </h3>
      <h4>{{ course.title }}</h4>
      <p v-if="course.bulletinLink">
        <a :href="course.bulletinLink" target="_blank">Bulletin</a>
      </p>
      <p v-if="course.description">{{ course.description }}</p>
      <p v-if="course.courseType && course.courseType.length > 0">
        Type: 
        <span 
          v-for="(type, index) in course.courseType" 
          :key="index"
          class="highlight"
          :class="slugify(type)"
        >
          {{ type }}
        </span>
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
interface Course {
  number: string
  title: string
  description?: string
  bulletinLink?: string
  courseType?: string[]
  _path?: string
}

interface Props {
  course: Course
}

defineProps<Props>()

const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
</script>

<style scoped>
.course-item {
  list-style: none;
  padding: 1.5rem;
  border-bottom: 1px solid #e6e6e6;
}

.course-item:last-child {
  border-bottom: none;
}

.courseContainer h3 {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e407c;
  margin: 0 0 0.5rem 0;
}

.courseContainer h3 a {
  color: #1e407c;
  text-decoration: none;
}

.courseContainer h3 a:hover {
  color: #ff5722;
}

.courseContainer h4 {
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin: 0 0 0.75rem 0;
}

.courseContainer p {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #555;
  margin: 0.5rem 0;
}

.courseContainer p a {
  color: #1e407c;
  text-decoration: underline;
}

.courseContainer p a:hover {
  color: #ff5722;
}

.courseContainer > a {
  display: inline-block;
  margin-top: 0.5rem;
  color: #ff5722;
  text-decoration: none;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
}

.courseContainer > a:hover {
  text-decoration: underline;
}

.highlight {
  padding: 0.2rem 0.4rem;
  margin: 0 0.2rem;
  border-radius: 3px;
  font-weight: 500;
}

.highlight.prescribed,
.highlight.electives {
  background-color: #ffe0d6;
  color: #ff5722;
}

.highlight.breadth {
  background-color: #d4f4dd;
  color: #4caf50;
}

.highlight.depth {
  background-color: #d6e9f8;
  color: #2196F3;
}
</style>
