#!/usr/bin/env node

/**
 * Migration Script: Jekyll Courses to Nuxt Content
 * 
 * This script converts course files from the Jekyll _courses/ directory
 * to the Nuxt content/courses/ directory with proper formatting.
 * 
 * Usage:
 *   node scripts/migrate-courses.js
 * 
 * Options:
 *   --dry-run    Preview changes without writing files
 *   --limit=10   Only migrate first 10 courses
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, basename } from 'path'
import { existsSync } from 'fs'

// Convert kebab-case to camelCase
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

// Parse Jekyll front matter
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: content }
  
  const frontMatter = match[1]
  const body = match[2]
  const data = {}
  
  // Simple YAML parser for our use case
  const lines = frontMatter.split('\n')
  let currentKey = null
  
  for (const line of lines) {
    if (line.trim().startsWith('#')) continue
    
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0 && !line.startsWith(' ')) {
      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim()
      currentKey = toCamelCase(key)
      
      // Handle arrays
      if (value.startsWith('[')) {
        const arrayContent = value.replace(/[\[\]]/g, '')
        data[currentKey] = arrayContent.split(',').map(v => v.trim())
      } else if (value === 'true' || value === 'false') {
        data[currentKey] = value === 'true'
      } else if (!isNaN(value) && value !== '') {
        data[currentKey] = Number(value)
      } else if (value) {
        data[currentKey] = value
      } else {
        data[currentKey] = []
      }
    } else if (line.startsWith('    -') && currentKey) {
      // Handle array items on separate lines
      const item = line.replace(/^\s*-\s*/, '').trim()
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = []
      }
      data[currentKey].push(item)
    }
  }
  
  return { data, content: body.trim() }
}

// Convert to new front matter format
function createNewFrontMatter(data) {
  const lines = ['---']
  
  // Required fields first
  if (data.title) lines.push(`title: ${data.title}`)
  if (data.number) lines.push(`number: ${data.number}`)
  if (data.credits) lines.push(`credits: ${data.credits}`)
  if (data.academicHome) lines.push(`academicHome: ${data.academicHome}`)
  
  // Optional fields
  if (data.preReq) lines.push(`preReq: ${data.preReq}`)
  if (data.programCore) lines.push(`programCore: ${data.programCore}`)
  if (data.microSite) lines.push(`microSite: ${data.microSite}`)
  
  // Arrays
  if (data.courseType && data.courseType.length > 0) {
    lines.push('courseType:')
    data.courseType.forEach(type => lines.push(`  - ${type}`))
  }
  
  if (data.pathwayList && data.pathwayList.length > 0) {
    lines.push('pathwayList:')
    data.pathwayList.forEach(pathway => lines.push(`  - ${pathway}`))
  }
  
  // Description and other text fields
  if (data.description) lines.push(`description: ${data.description}`)
  if (data.bulletinLink) lines.push(`bulletinLink: ${data.bulletinLink}`)
  if (data.callout) lines.push(`callout: ${data.callout}`)
  if (data.imageUrl) lines.push(`imageUrl: ${data.imageUrl}`)
  if (data.microSiteDescription) lines.push(`microSiteDescription: ${data.microSiteDescription}`)
  
  lines.push('---')
  return lines.join('\n')
}

async function migrateCourses(options = {}) {
  const { dryRun = false, limit = null } = options
  
  const sourceDir = '_courses'
  const targetDir = 'content/courses'
  
  console.log('🚀 Starting course migration...\n')
  
  // Create target directory if it doesn't exist
  if (!existsSync(targetDir) && !dryRun) {
    await mkdir(targetDir, { recursive: true })
    console.log(`✅ Created directory: ${targetDir}\n`)
  }
  
  // Read all course files
  const files = await readdir(sourceDir)
  const courseFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.html'))
  
  const filesToProcess = limit ? courseFiles.slice(0, limit) : courseFiles
  
  console.log(`📚 Found ${courseFiles.length} course files`)
  console.log(`📝 Processing ${filesToProcess.length} files\n`)
  
  let successCount = 0
  let errorCount = 0
  
  for (const file of filesToProcess) {
    try {
      const sourcePath = join(sourceDir, file)
      const content = await readFile(sourcePath, 'utf-8')
      
      const { data, content: body } = parseFrontMatter(content)
      
      // Create new content
      const newFrontMatter = createNewFrontMatter(data)
      const newContent = `${newFrontMatter}\n\n${body}`
      
      // Determine output filename (convert .html to .md)
      const outputFile = file.replace('.html', '.md')
      const targetPath = join(targetDir, outputFile)
      
      if (dryRun) {
        console.log(`📄 Would migrate: ${file} → ${outputFile}`)
        console.log(`   Title: ${data.title}`)
        console.log(`   Number: ${data.number}`)
        console.log('')
      } else {
        await writeFile(targetPath, newContent, 'utf-8')
        console.log(`✅ Migrated: ${file} → ${outputFile}`)
        successCount++
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message)
      errorCount++
    }
  }
  
  console.log('\n' + '='.repeat(50))
  if (dryRun) {
    console.log('🔍 DRY RUN COMPLETE')
    console.log(`Would migrate ${filesToProcess.length} files`)
  } else {
    console.log('✨ MIGRATION COMPLETE')
    console.log(`✅ Successfully migrated: ${successCount} files`)
    if (errorCount > 0) {
      console.log(`❌ Errors: ${errorCount} files`)
    }
  }
  console.log('='.repeat(50))
}

// Parse command line arguments
const args = process.argv.slice(2)
const options = {
  dryRun: args.includes('--dry-run'),
  limit: null
}

const limitArg = args.find(arg => arg.startsWith('--limit='))
if (limitArg) {
  options.limit = parseInt(limitArg.split('=')[1])
}

// Run migration
migrateCourses(options).catch(console.error)
