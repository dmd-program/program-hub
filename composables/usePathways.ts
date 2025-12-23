/**
 * Composable for fetching pathways
 */
export const usePathways = () => {
  const fetchAllPathways = async () => {
    return await queryContent('pathways')
      .where({ isActive: true })
      .sort({ title: 1 })
      .find()
  }

  const fetchPathwayBySlug = async (slug: string) => {
    return await queryContent('pathways')
      .where({ _path: `/pathways/${slug}` })
      .findOne()
  }

  const fetchFeaturedPathways = async () => {
    return await queryContent('pathways')
      .where({ featured: true, isActive: true })
      .sort({ title: 1 })
      .find()
  }

  return {
    fetchAllPathways,
    fetchPathwayBySlug,
    fetchFeaturedPathways,
  }
}
