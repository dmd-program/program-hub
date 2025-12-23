/**
 * Composable for fetching and filtering courses
 */
export const useCourses = () => {
  const fetchAllCourses = async () => {
    return await queryContent('courses')
      .sort({ number: 1 })
      .find()
  }

  const fetchCourseBySlug = async (slug: string) => {
    return await queryContent('courses')
      .where({ _path: `/courses/${slug}` })
      .findOne()
  }

  const fetchCoursesByPathway = async (pathway: string) => {
    return await queryContent('courses')
      .where({ pathwayList: { $contains: pathway } })
      .sort({ number: 1 })
      .find()
  }

  const fetchCoursesByType = async (type: string) => {
    return await queryContent('courses')
      .where({ courseType: { $contains: type } })
      .sort({ number: 1 })
      .find()
  }

  const fetchCoursesByCollege = async (college: string) => {
    return await queryContent('courses')
      .where({ academicHome: college })
      .sort({ number: 1 })
      .find()
  }

  const fetchCoreCourses = async () => {
    return await queryContent('courses')
      .where({ programCore: true })
      .sort({ number: 1 })
      .find()
  }

  return {
    fetchAllCourses,
    fetchCourseBySlug,
    fetchCoursesByPathway,
    fetchCoursesByType,
    fetchCoursesByCollege,
    fetchCoreCourses,
  }
}
