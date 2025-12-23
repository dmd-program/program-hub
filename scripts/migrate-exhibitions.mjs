#!/usr/bin/env node
import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const sourceDir = join(rootDir, '_exhibitions');
const targetDir = join(rootDir, 'content/exhibitions');

// Map of old field names to new camelCase names
const fieldMapping = {
  'exhibition-theme': 'exhibitionTheme',
  'exhibition-image': 'exhibitionImage',
  'card-image-url': 'cardImageUrl',
  'card-description': 'cardDescription',
  'highlight-color': 'highlightColor',
  'alt-exhibition-link': 'altExhibitionLink',
};

function extractFrontMatter(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) return null;
  
  const frontMatter = {};
  const lines = frontMatterMatch[1].split('\n');
  
  for (const line of lines) {
    const match = line.match(/^([^:]+):\s*(.+)$/);
    if (match) {
      let [, key, value] = match;
      key = key.trim();
      value = value.trim();
      
      // Remove quotes
      value = value.replace(/^['"]|['"]$/g, '');
      
      // Convert to camelCase if needed
      const newKey = fieldMapping[key] || key;
      
      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim());
      }
      
      frontMatter[newKey] = value;
    }
  }
  
  return frontMatter;
}

function createMarkdownContent(frontMatter, slug) {
  const {
    title,
    year,
    semester,
    course,
    description,
    exhibitionImage,
    cardImageUrl,
    cardDescription,
    current,
    exhibition,
  } = frontMatter;
  
  const md = `---
title: ${title || 'Untitled Exhibition'}
class: ${slug}
year: ${year || ''}
semester: ${semester || ''}
course: ${course || ''}
description: ${description || ''}
exhibitionImage: ${exhibitionImage || ''}
cardImageUrl: ${cardImageUrl || ''}
cardDescription: ${cardDescription || ''}
current: ${current === 'true'}
exhibition: ${exhibition || slug}
---

# ${title || 'Exhibition'}

${description || ''}

## Student Projects

*Project gallery will be displayed here.*

## About This Exhibition

This exhibition showcases work from students in ${course || 'DMD courses'} during ${semester || ''} ${year || ''}.
`;
  
  return md;
}

async function migrateExhibitions() {
  try {
    // Ensure target directory exists
    await mkdir(targetDir, { recursive: true });
    
    // Read all exhibition files
    const files = await readdir(sourceDir);
    const htmlFiles = files.filter(f => f.endsWith('.html') && !f.includes('template'));
    
    console.log(`Found ${htmlFiles.length} exhibition files to migrate\n`);
    
    let migrated = 0;
    let skipped = 0;
    
    for (const file of htmlFiles) {
      const sourcePath = join(sourceDir, file);
      const slug = basename(file, '.html').replace('exhibition-', '');
      const targetPath = join(targetDir, `${slug}.md`);
      
      try {
        const content = await readFile(sourcePath, 'utf-8');
        const frontMatter = extractFrontMatter(content);
        
        if (!frontMatter) {
          console.error(`✗ No front matter found in ${file}`);
          skipped++;
          continue;
        }
        
        const markdown = createMarkdownContent(frontMatter, slug);
        await writeFile(targetPath, markdown, 'utf-8');
        
        console.log(`✓ Migrated: ${file} → ${slug}.md`);
        migrated++;
      } catch (err) {
        console.error(`✗ Error migrating ${file}:`, err.message);
        skipped++;
      }
    }
    
    console.log(`\n✅ Migration complete!`);
    console.log(`   Migrated: ${migrated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`\n📁 Exhibitions saved to: ${targetDir}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateExhibitions();
