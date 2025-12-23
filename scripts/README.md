# Migration Scripts

This directory contains scripts to help migrate content from Jekyll to Nuxt.

## Available Scripts

### migrate-courses.js

Converts course files from `_courses/` to `content/courses/` with proper formatting.

**Usage:**

```bash
# Preview migration (doesn't write files)
node scripts/migrate-courses.js --dry-run

# Migrate first 10 courses as a test
node scripts/migrate-courses.js --limit=10

# Migrate all courses
node scripts/migrate-courses.js
```

**What it does:**
- Reads all `.md` and `.html` files from `_courses/`
- Parses Jekyll front matter
- Converts kebab-case to camelCase (e.g., `academic-home` → `academicHome`)
- Converts arrays from YAML format to proper markdown
- Writes to `content/courses/`

**Before:**
```yaml
---
layout: course-page
title: Digital Multimedia Design
number: DMD 100
academic-home: Arts & Arch
course-type: [Prescribed]
pathway-list: [Generalist, Digital Design]
---
```

**After:**
```yaml
---
title: Digital Multimedia Design
number: DMD 100
academicHome: Arts & Arch
courseType:
  - Prescribed
pathwayList:
  - Generalist
  - Digital Design
---
```

## Future Scripts

Additional migration scripts to be created:

- `migrate-exhibitions.js` - Convert exhibition content
- `migrate-pathways.js` - Convert pathway definitions
- `migrate-faculty.js` - Convert faculty profiles
- `migrate-images.js` - Copy and optimize images
- `validate-content.js` - Verify migrated content

## Development

To create a new migration script:

1. Create a new `.js` file in this directory
2. Use ES modules (`import/export`)
3. Add command-line argument parsing
4. Include `--dry-run` option for safety
5. Add progress logging
6. Document in this README
