export interface Course {
  title: string
  number: string
  credits: number
  academicHome: string
  preReq?: string
  courseType: string[]
  description: string
  bulletinLink: string
  pathwayList?: string[]
  offerings?: CourseOffering[]
  microSite?: boolean
  microSiteDescription?: string
  programCore?: boolean
  header?: boolean
  imageUrl?: string
  callout?: string
}

export interface CourseOffering {
  data: string
  name: string
  current: boolean
  id: string
}

export interface Exhibition {
  title: string
  class: string[]
  year: number
  semester: string
  course: string
  current: boolean
  altExhibitionLink?: string
  exhibition: string
  exhibitionTheme: string
  description: string
  exhibitionImage: string
  cardImageUrl: string
  cardDescription: string
  highlightColor: string
  private: boolean
  order: number
}

export interface Project {
  title: string
  author: string
  year: number
  semester: string
  course: string
  featured?: boolean
  heroImage?: string
  thumbnailImage?: string
  description: string
  tags?: string[]
  links?: ProjectLink[]
}

export interface ProjectLink {
  type: 'website' | 'github' | 'video' | 'documentation'
  url: string
  label: string
}

export interface Pathway {
  title: string
  isActive: boolean
  description?: string
  requiredCourses?: string[]
  electiveCourses?: string[]
  totalCredits?: number
}

export interface Faculty {
  name: string
  title: string
  department: string
  college: string
  bio?: string
  image?: string
  email?: string
  website?: string
  expertise?: string[]
}

export interface MenuItem {
  url: string
  title: string
  children?: MenuItem[]
}

export interface SiteConfig {
  title: string
  description: string
  baseUrl: string
  author: {
    name: string
    email: string
  }
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}
