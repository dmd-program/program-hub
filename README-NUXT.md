# Digital Multimedia Design Program Hub - Nuxt 4

> Modern rebuild of the DMD Program Hub using Nuxt.js 4, Vue 3, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Nuxt 4** - Latest features with full TypeScript support
- **Vue 3 Composition API** - Modern, performant component architecture
- **Nuxt Content** - File-based CMS for courses, exhibitions, and more
- **Tailwind CSS 4** - Utility-first styling with custom design system
- **Static Site Generation** - Optimized for GitHub Pages deployment
- **SEO Optimized** - Meta tags, structured data, and sitemaps
- **Fully Responsive** - Mobile-first design approach
- **Accessible** - WCAG 2.1 AA compliant

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+

## 🛠️ Setup

```bash
# Install dependencies
npm install

# Start development server at http://localhost:3000
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── app.vue                 # Root application component
├── nuxt.config.ts         # Nuxt configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── assets/                # Stylesheets, fonts, images
├── components/            # Vue components (auto-imported)
│   ├── layout/           # Header, Footer, Navigation
│   ├── course/           # Course-related components
│   ├── exhibition/       # Exhibition components
│   └── graphics/         # SVG graphics
├── composables/          # Reusable composition functions
├── content/              # Markdown content files
│   ├── courses/         # Course catalog
│   ├── exhibitions/     # Student exhibitions
│   ├── pathways/        # Learning pathways
│   └── faculty/         # Faculty profiles
├── layouts/              # Layout components
├── pages/                # File-based routing
│   ├── index.vue        # Home page
│   ├── courses/         # Course pages
│   └── exhibitions/     # Exhibition pages
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🎨 Design System

The design system uses Penn State's brand colors and custom DMD accent colors:

- **PSU Blue**: `#001E44` - Primary brand color
- **DMD Accent Primary**: `#007BC7` - Links and CTAs
- **DMD Accent Secondary**: `#96BEE6` - Highlights
- **DMD Accent Tertiary**: `#E98300` - Special emphasis

## 📝 Content Management

Content is managed through Nuxt Content with Markdown files:

1. **Courses** - `content/courses/*.md`
2. **Exhibitions** - `content/exhibitions/*.md`
3. **Pathways** - `content/pathways/*.md`
4. **Faculty** - `content/faculty/*.md`

Each content type has TypeScript interfaces defined in `types/content.d.ts`.

## 🚢 Deployment

### GitHub Pages

The site is configured for GitHub Pages deployment:

```bash
# Generate static files
npm run generate

# Files will be in .output/public
# Deploy to gh-pages branch
```

GitHub Actions workflow is configured in `.github/workflows/deploy.yml` for automatic deployment.

## 🔧 Configuration

Key configuration files:

- `nuxt.config.ts` - Nuxt application config
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## 📚 Documentation

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Nuxt Content Documentation](https://content.nuxt.com/)

## 🆘 Support

For questions or issues:
- Email: dmd@psu.edu
- GitHub Issues: [Create an issue](https://github.com/dmd-program/program-hub/issues)

## 📄 License

Copyright (c) 2025 The Pennsylvania State University

## 🎯 Migration Status

This is a complete rebuild of the Jekyll-based site. See `MIGRATION.md` for details on the migration process and feature parity.

### Completed ✅
- [x] Project setup and configuration
- [x] Basic layout and navigation
- [x] Home page
- [x] TypeScript type definitions
- [x] Tailwind CSS design system

### In Progress 🚧
- [ ] Content migration (courses, exhibitions, etc.)
- [ ] Course listing and detail pages
- [ ] Exhibition galleries
- [ ] Pathway visualizations
- [ ] Faculty profiles
- [ ] Search functionality

### Planned 📋
- [ ] Advanced filtering
- [ ] Interactive visualizations
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] SEO enhancement
