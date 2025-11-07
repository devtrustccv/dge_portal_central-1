'use server'

import { meiliClient } from '@/lib/meilisearchClient'

export interface CourseHit {
  id: number
  formacao: string 
  denominacao_entidade: string
  referencia_formacao: string
}


export async function fetchCourses({
  search = '',
  page   = 1,
  perPage = 10,
}: {
  search?: string
  page?: number      
  perPage?: number
}) {
  const result = await meiliClient
    .index('dge-oferta-formativa')
    .search(search, {
      offset: (page - 1) * perPage,
      limit : perPage,
    })

  return {
    hits : result.hits as CourseHit[],
    total: result.estimatedTotalHits,
    page,
    perPage,
  }
}
