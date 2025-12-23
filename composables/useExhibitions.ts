/**
 * Composable for fetching exhibitions
 */
export const useExhibitions = () => {
  const fetchAllExhibitions = async () => {
    return await queryContent('exhibitions')
      .sort({ year: -1, semester: -1 })
      .find()
  }

  const fetchExhibitionBySlug = async (slug: string) => {
    return await queryContent('exhibitions')
      .where({ _path: `/exhibitions/${slug}` })
      .findOne()
  }

  const fetchCurrentExhibitions = async () => {
    return await queryContent('exhibitions')
      .where({ current: true })
      .sort({ year: -1 })
      .find()
  }

  const fetchExhibitionsByCourse = async (course: string) => {
    return await queryContent('exhibitions')
      .where({ course: course })
      .sort({ year: -1, semester: -1 })
      .find()
  }

  const fetchExhibitionsByYear = async (year: number) => {
    return await queryContent('exhibitions')
      .where({ year: year })
      .sort({ semester: -1 })
      .find()
  }

  return {
    fetchAllExhibitions,
    fetchExhibitionBySlug,
    fetchCurrentExhibitions,
    fetchExhibitionsByCourse,
    fetchExhibitionsByYear,
  }
}
