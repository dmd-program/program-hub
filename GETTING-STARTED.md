# Getting Started with Your New Nuxt 4 Site

## 🎉 What's Been Created

Your Jekyll site has been set up with a modern Nuxt 4 foundation. Here's what's ready:

### ✅ Complete Setup
- **Modern stack**: Nuxt 4, Vue 3, TypeScript, Tailwind CSS
- **Content management**: Nuxt Content for markdown-based courses, exhibitions, etc.
- **Optimized**: Image optimization, SEO, performance built-in
- **Deployment ready**: GitHub Actions workflow configured

### 📁 New File Structure

```
Your Repository
├── Nuxt 4 Application (NEW) ⭐
│   ├── package.json
│   ├── nuxt.config.ts
│   ├── app.vue
│   ├── layouts/
│   ├── pages/
│   ├── components/
│   ├── content/
│   └── assets/
│
└── Jekyll Site (EXISTING)
    ├── _config.yml
    ├── _courses/
    ├── _layouts/
    └── ... (all existing files)
```

Both systems coexist for now. You can gradually migrate.

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
cd /Users/msc227/Documents/repos/program-hub
npm install
```

This will install:
- Nuxt 4 framework
- Vue 3
- Tailwind CSS
- Nuxt Content (for managing courses/exhibitions)
- Image optimization
- SEO tools

### Step 2: Run Development Server

```bash
npm run dev
```

Then open: http://localhost:3000/program-hub

You'll see:
- ✅ New home page with modern design
- ✅ Working navigation (desktop & mobile)
- ✅ Header with PSU branding
- ✅ Footer with contact info
- ✅ Sample course pages

### Step 3: Explore the Structure

Try these URLs:
- `http://localhost:3000/program-hub/` - Home page
- `http://localhost:3000/program-hub/courses/` - Course listing
- `http://localhost:3000/program-hub/courses/art010` - Sample course detail

## 📝 What Works Right Now

### ✅ Working Features
1. **Home Page** - Full redesign with hero section, program overview
2. **Navigation** - Responsive header/footer
3. **Layout System** - Reusable components
4. **Course System** - Basic structure for course catalog
5. **Sample Content** - 2 example courses (DMD 100, ART 010)
6. **TypeScript** - Full type safety
7. **Tailwind CSS** - Modern styling system

### 🚧 What Needs Migration
1. All 60+ courses from `_courses/`
2. Exhibition galleries
3. Pathway visualizations
4. Faculty profiles
5. Project showcases
6. Custom SVG graphics
7. Forms and interactive elements

## 📚 Key Files to Know

### Configuration
- **`nuxt.config.ts`** - Main Nuxt configuration
  - Controls routing, modules, SEO, deployment
  
- **`tailwind.config.ts`** - Styling configuration
  - PSU colors, custom design tokens
  
- **`package.json`** - Dependencies and scripts
  - Lists all installed packages

### Content
- **`content/courses/`** - Course markdown files
  - Add new `.md` files here for courses
  
- **`types/content.d.ts`** - TypeScript types
  - Defines structure of courses, exhibitions, etc.

### Components
- **`components/layout/Header.vue`** - Top navigation
- **`components/layout/Footer.vue`** - Site footer
- **`components/course/CourseCard.vue`** - Course preview card

### Pages
- **`pages/index.vue`** - Home page
- **`pages/courses/index.vue`** - Course listing
- **`pages/courses/[slug].vue`** - Individual course pages

## 🎨 Design System

Your site uses Penn State brand colors:

```css
/* Primary Colors */
PSU Blue: #001E44
DMD Accent: #007BC7
White: #FFFFFF

/* Usage */
- Headers: PSU Blue
- Links/CTAs: DMD Accent Blue
- Backgrounds: White, Gray variations
```

All colors are configured in `tailwind.config.ts` and can be used like:
```html
<div class="bg-psu-blue text-white">...</div>
```

## 🔄 Migration Workflow

### Option 1: Gradual Migration (Recommended)
1. Keep Jekyll site running
2. Migrate content in batches (e.g., 10 courses at a time)
3. Test each batch
4. Switch over when ready

### Option 2: Bulk Migration
1. Run migration script (see MIGRATION.md)
2. Convert all content at once
3. Intensive testing
4. Deploy

## 📖 Common Tasks

### Add a New Course

1. Create file: `content/courses/your-course.md`

```markdown
---
title: Your Course Title
number: ABC 123
credits: 3
academicHome: Arts & Arch
courseType:
  - Elective
description: Course description here
bulletinLink: https://...
---

Course content in markdown...
```

2. View at: `/program-hub/courses/abc123`

### Customize Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'psu-blue': {
    DEFAULT: '#001E44',
    light: '#1E407C',
  },
  // Add your colors
}
```

### Add a New Page

Create file in `pages/` directory:

```
pages/
  about.vue  → /program-hub/about
  program/
    index.vue → /program-hub/program
```

## 🛠️ Available Commands

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm run generate      # Generate static site
npm run preview       # Preview production build

# Code Quality
npm run lint          # Lint code
npm run typecheck     # Check TypeScript
```

## 🌐 Deployment

When ready to deploy:

```bash
# Generate static files
npm run generate

# Output will be in .output/public/
# GitHub Actions will auto-deploy on push to main
```

## 📚 Learning Resources

- **Nuxt 3 Docs**: https://nuxt.com/docs
- **Vue 3 Guide**: https://vuejs.org/guide/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Nuxt Content**: https://content.nuxt.com/

## ❓ FAQ

### Q: Do I need to delete the Jekyll site?
**A:** No! Keep it running. The Nuxt app coexists in the same repo.

### Q: Will this break my current site?
**A:** No, your Jekyll site continues working. The Nuxt app is separate.

### Q: How do I convert my 60+ courses?
**A:** See `MIGRATION.md` for a migration script. We can automate most of it.

### Q: Can I customize the design?
**A:** Yes! Edit Tailwind config and Vue components freely.

### Q: Is TypeScript required?
**A:** No, but recommended. You can use plain JavaScript in components.

## 🆘 Need Help?

1. **Check documentation**: See `README-NUXT.md` and `MIGRATION.md`
2. **TypeScript errors**: Normal until you run `npm install`
3. **Styling issues**: Check `tailwind.config.ts`
4. **Routing problems**: Verify file names in `pages/`

## ✅ Next Steps

1. **Install & run**: `npm install && npm run dev`
2. **Explore the site**: Open http://localhost:3000/program-hub
3. **Review structure**: Look through components and pages
4. **Plan migration**: Read `MIGRATION.md`
5. **Start migrating**: Begin with 5-10 courses as a test

---

**Ready to begin?** Run `npm install` to get started! 🚀
