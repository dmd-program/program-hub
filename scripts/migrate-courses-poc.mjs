import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import matter from 'gray-matter'

// Converts Jekyll course markdown files to Nuxt Content format with camelCase front matter.
// Filters out unpublished courses (published: false).
// Converts all hyphenated keys to camelCase (academic-home → academicHome).
// Removes 'layout' field as it's not needed in Nuxt Content.
//
// Front matter fields converted:
// - title, number, credits, description, bulletin-link
// - academic-home → academicHome
// - course-type → courseType
// - pathway-list → pathwayList
// - program-core → programCore
// - pre-req → preReq
// - published (filtered if false)
//
// Usage: node scripts/migrate-courses-poc.mjs [file1.md file2.md]
// Or run without args to convert DEFAULT_FILES

const SOURCE_DIR = '_courses'
const TARGET_DIR = 'content/courses'
const DEFAULT_FILES = ['dart100.md', 'art001.md']

const toCamelCase = (key) => key.replace(/-([a-z])/g, (_, char) => char.toUpperCase())

const fileExists = async (path) => {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

const normalizeFrontMatter = (data) => {
  const result = {}
  for (const [rawKey, value] of Object.entries(data)) {
    // Skip layout field and empty values
    if (rawKey === 'layout') continue
    if (value === null || value === undefined || value === '') continue
    
    const key = toCamelCase(rawKey)
    result[key] = value
  }
  return result
}

const ensureTargetDir = async () => {
  await mkdir(TARGET_DIR, { recursive: true })
}

const pickDefaultFiles = async () => {
  const all = await readdir(SOURCE_DIR)
  return DEFAULT_FILES.filter((file) => all.includes(file)).slice(0, 2)
}

const convertOne = async (fileName) => {
  const sourcePath = join(SOURCE_DIR, fileName)
  const targetPath = join(TARGET_DIR, basename(fileName))

  if (await fileExists(targetPath)) {
    console.log(`Skip ${fileName} (already exists at ${targetPath})`)
    return null
  }

  const raw = await readFile(sourcePath, 'utf-8')
  const parsed = matter(raw)
  
  // Skip unpublished courses
  if (parsed.data.published === false) {
    console.log(`Skip ${fileName} (published: false)`)
    return null
  }
  
  const data = normalizeFrontMatter(parsed.data)
  const output = matter.stringify(parsed.content.trim() + '\n', data)

  await writeFile(targetPath, output, 'utf-8')
  return targetPath
}

const main = async () => {
  const args = process.argv.slice(2)
  const chosen = args.length ? args : await pickDefaultFiles()

  if (!chosen.length) {
    console.error('No source files found to convert in', SOURCE_DIR)
    process.exit(1)
  }

  await ensureTargetDir()

  for (const file of chosen) {
    try {
      const out = await convertOne(file)
      if (out) {
        console.log(`✓ Converted ${file} -> ${out}`)
      }
    } catch (err) {
      console.error(`✗ Failed to convert ${file}:`, err.message)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
