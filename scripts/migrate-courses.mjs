#!/usr/bin/env node
import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const sourceDir = join(rootDir, '_courses');
const targetDir = join(rootDir, 'content/courses');

// Mapping of old field names to new camelCase names
const fieldMapping = {
  'academic-home': 'academicHome',
  'course-type': 'courseType',
  'bulletin-link': 'bulletinLink',
  'pathway-list': 'pathwayList'
};

async function convertFrontMatter(content) {
  const lines = content.split('\n');
  const newLines = [];
  let inFrontMatter = false;
  
  for (const line of lines) {
    if (line.trim() === '---') {
      newLines.push(line);
      inFrontMatter = !inFrontMatter;
      continue;
    }
    
    if (inFrontMatter) {
      // Convert field names
      let newLine = line;
      for (const [oldField, newField] of Object.entries(fieldMapping)) {
        if (line.startsWith(`${oldField}:`)) {
          newLine = line.replace(`${oldField}:`, `${newField}:`);
          break;
        }
      }
      newLines.push(newLine);
    } else {
      newLines.push(line);
    }
  }
  
  return newLines.join('\n');
}

async function migrateCourses() {
  try {
    // Ensure target directory exists
    await mkdir(targetDir, { recursive: true });
    
    // Read all course files
    const files = await readdir(sourceDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    console.log(`Found ${mdFiles.length} course files to migrate\n`);
    
    let migrated = 0;
    let skipped = 0;
    
    for (const file of mdFiles) {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);
      
      try {
        const content = await readFile(sourcePath, 'utf-8');
        const converted = await convertFrontMatter(content);
        await writeFile(targetPath, converted, 'utf-8');
        
        console.log(`✓ Migrated: ${file}`);
        migrated++;
      } catch (err) {
        console.error(`✗ Error migrating ${file}:`, err.message);
        skipped++;
      }
    }
    
    console.log(`\n✅ Migration complete!`);
    console.log(`   Migrated: ${migrated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`\n📁 Courses saved to: ${targetDir}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateCourses();
