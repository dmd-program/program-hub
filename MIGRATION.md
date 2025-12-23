# Migration Guide: Jekyll to Nuxt 4

This document outlines the step-by-step migration process from the Jekyll-based site to the new Nuxt 4 application.

## Phase 1: Setup ✅ COMPLETED

### What was done:
- ✅ Created Nuxt 4 project structure
- ✅ Configured TypeScript with strict mode
- ✅ Set up Tailwind CSS with custom theme
- ✅ Installed required modules (@nuxt/content, @nuxt/image, @nuxtjs/seo)
- ✅ Created base layout components (Header, Footer)
- ✅ Built home page structure
- ✅ Defined TypeScript interfaces for content types
- ✅ Configured GitHub Actions for deployment

### Files created:
- `package.json` - Dependencies and scripts
- `nuxt.config.ts` - Nuxt configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind customization
- `app.vue` - Root component
- `layouts/default.vue` - Default layout
- `components/layout/Header.vue` - Navigation header
- `components/layout/Footer.vue` - Site footer
- `pages/index.vue` - Home page
- `types/content.d.ts` - Type definitions
- `.github/workflows/deploy.yml` - CI/CD workflow

## Phase 2: Installation & Testing

### To install and run:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000/program-hub
```

### Expected behavior:
- Home page loads with header, content, and footer
- Navigation menu works on desktop and mobile
- Tailwind styles are applied
- No console errors (TypeScript errors are expected until dependencies load)

## Phase 3: Content Migration (NEXT STEPS)

### 3.1 Migrate Course Content

**Action items:**
1. Create a script to convert all `_courses/*.md` files to `content/courses/*.md`
2. Update front matter to use camelCase properties
3. Convert any HTML content in `.html` course files to Markdown
4. Preserve all course metadata

**Example conversion:**
```yaml
# Before (Jekyll)
---
layout: course-page
title: Digital Multimedia Design Foundations
number: DMD 100
academic-home: Arts & Arch
course-type: [Prescribed]
pathway-list: [...]
---

# After (Nuxt Content)
---
title: Digital Multimedia Design Foundations
number: DMD 100
academicHome: Arts & Arch
courseType:
  - Prescribed
pathwayList:
  - ...
---
```

### 3.2 Migrate Exhibitions

**Action items:**
1. Convert `_exhibitions/*.html` to `content/exhibitions/*.md`
2. Extract project data into separate content files
3. Migrate exhibition images to `public/assets/exhibitions/`
4. Create exhibition gallery components

### 3.3 Migrate Other Collections

- [ ] Faculty profiles (`_faculty/` → `content/faculty/`)
- [ ] Pathways (`_pathways/` → `content/pathways/`)
- [ ] Projects (`_projects/` → `content/projects/`)

## Phase 4: Component Development

### 4.1 Course Components ✅ STARTED
- [x] `CourseCard.vue` - Course preview card
- [x] Course detail page template
- [ ] `CourseFilter.vue` - Filter by pathway/type
- [ ] `CourseList.vue` - Filterable course list

### 4.2 Exhibition Components
- [ ] `ExhibitionCard.vue`
- [ ] `ExhibitionGallery.vue`
- [ ] `ProjectCard.vue`
- [ ] Exhibition detail page

### 4.3 Graphics Components
- [x] `LatticeSvg.vue` - Basic lattice graphic
- [ ] `PathwaysSvg.vue` - Pathway visualization
- [ ] `CoreSvg.vue` - Program core graphic

## Phase 5: Advanced Features

### 5.1 Filtering & Search
- [ ] Implement course filtering by pathway
- [ ] Add search functionality with Nuxt Content
- [ ] Create filter UI components
- [ ] Add sorting options

### 5.2 Interactive Features
- [ ] Replace Isotope.js with Vue-based filtering
- [ ] Implement image lightbox for galleries
- [ ] Add smooth scrolling and animations
- [ ] Create accordion components for pathways

## Phase 6: Asset Migration

### 6.1 Images
- [ ] Copy images from `assets/img/` to `public/assets/img/`
- [ ] Optimize images with Nuxt Image
- [ ] Update all image references
- [ ] Implement responsive images

### 6.2 Fonts
- [ ] Copy custom fonts to `assets/fonts/`
- [ ] Configure font loading in Tailwind
- [ ] Test font rendering

### 6.3 Static Files
- [ ] Copy favicon and manifests
- [ ] Update paths in `nuxt.config.ts`

## Phase 7: Testing & Optimization

### 7.1 Functionality Testing
- [ ] Test all navigation links
- [ ] Verify course filtering works
- [ ] Test mobile responsiveness
- [ ] Check all dynamic routes

### 7.2 Performance
- [ ] Run Lighthouse audit
- [ ] Optimize bundle size
- [ ] Implement lazy loading
- [ ] Add loading states

### 7.3 Accessibility
- [ ] Run aXe accessibility audit
- [ ] Add ARIA labels
- [ ] Test keyboard navigation
- [ ] Verify color contrast

### 7.4 SEO
- [ ] Add meta tags to all pages
- [ ] Generate sitemap
- [ ] Add structured data
- [ ] Test Open Graph tags

## Phase 8: Deployment

### 8.1 GitHub Pages Setup
- [ ] Update repository settings
- [ ] Configure custom domain (if applicable)
- [ ] Test deployment workflow
- [ ] Verify all links work with baseURL

### 8.2 Go Live
- [ ] Final testing on production
- [ ] Update documentation
- [ ] Archive old Jekyll site
- [ ] Monitor for issues

## Migration Helpers

### Content Conversion Script (example)

```javascript
// scripts/migrate-courses.js
import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

async function migrateCourses() {
  const coursesDir = '_courses'
  const files = await readdir(coursesDir)
  
  for (const file of files) {
    const content = await readFile(join(coursesDir, file), 'utf-8')
    const { data, content: body } = matter(content)
    
    // Convert kebab-case to camelCase
    const newData = {
      title: data.title,
      number: data.number,
      credits: data.credits,
      academicHome: data['academic-home'],
      courseType: data['course-type'],
      // ... convert all fields
    }
    
    // Write to new location
    const newContent = matter.stringify(body, newData)
    await writeFile(join('content/courses', file), newContent)
  }
}
```

## Rollback Plan

If issues arise:
1. Keep Jekyll site running in parallel
2. Use git branches for gradual migration
3. Test thoroughly before switching DNS/deployment
4. Maintain backup of all content

## Success Criteria

Migration is complete when:
- ✅ All content is migrated and accessible
- ✅ All pages render correctly
- ✅ Navigation works on all devices
- ✅ Performance metrics meet targets (Lighthouse score > 90)
- ✅ Accessibility audit passes
- ✅ SEO metadata is complete
- ✅ Deployment pipeline works
- ✅ No broken links or missing content

## Next Immediate Steps

1. **Install dependencies**: `npm install`
2. **Test development server**: `npm run dev`
3. **Create content migration script**
4. **Migrate 5-10 courses as proof of concept**
5. **Test course listing and detail pages**
6. **Iterate on design and functionality**
