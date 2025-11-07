'use client'

import { useEffect, useState, useTransition } from 'react'
import { Search, Check, X } from 'lucide-react'
import { Modal } from '@/components/atoms/modal'
import { formatDate } from '@/lib/utils'
import { fetchCourses } from '@/services/courses'
import { IOfertaFormativaListItem } from '@/services/ofertas/types'
import { CardFormacaoItem } from '@/components/organisms/OfertaFormativas/components/features/CoreComponent'


interface CourseSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (courses: IOfertaFormativaListItem[]) => void
  initialCourses: IOfertaFormativaListItem[]
}

export function CourseSelectionModal({
  isOpen,
  onClose,
  onSave,
  initialCourses,
}: CourseSelectionModalProps) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebounced] = useState('')
  const [page, setPage] = useState(1)
  const [courses, setCourses] = useState<IOfertaFormativaListItem[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [selected, setSelected] = useState<IOfertaFormativaListItem[]>(initialCourses)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 300)
    return () => clearTimeout(id)
  }, [search])

  useEffect(() => {
    if (!isOpen) return
    setSelected(initialCourses)
    setSearch('')
    setDebounced('')
    setPage(1)
    setCourses([])
    setHasMore(false)
  }, [isOpen, initialCourses])

  useEffect(() => {
    if (!isOpen) return
    startTransition(async () => {
      const res = await fetchCourses({
        search: debouncedSearch,
        page,
        perPage: 10,
      })
      const mapped: IOfertaFormativaListItem[] = res?.hits?.map((h: any) => ({
        documentId: h?.documentId,
        denominacao_entidade: h.denominacao_entidade,
        concelho: h.concelho || '',
        dataInicioCurso: formatDate(h.data_inicio_formacao),
        slug: h.slug,
        formacao: h.formacao,
        url_logo_entidade: h.url_logo_entidade,
        duracao: h.duracao,
        periodo_formacao: h.periodo_formacao,
        nivel: h.nivel,
        referencia_formacao: h?.referencia_formacao

      }))

      setCourses(prev => (page === 1 ? mapped : [...prev, ...mapped]))
      setHasMore(page * 10 < res?.total)
    })
  }, [debouncedSearch, page, isOpen])

  useEffect(() => setPage(1), [debouncedSearch])

  const toggleCourse = (course: IOfertaFormativaListItem) => {
    const isSel = selected.some(c => c.documentId === course.documentId)
    if (isSel) {
      if (selected.length === 1) return
      setSelected(prev => prev.filter(c => c.documentId !== course.documentId))
    } else if (selected.length < 3) {
      setSelected(prev => [...prev, course])
    }
  }

  const handleSave = () => {
    onSave(selected)
    onClose()
  }

  const isSelected = (id: string) => selected.some(c => c.documentId === id)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Selecionar Cursos"
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar por nome, entidade, ilha…"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-[#61C3A8]"
          />
        </div>
        {selected.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">
              Cursos Selecionados ({selected.length}/3)
            </h3>
            {selected.map((c, i) => (
              <div
                key={c.documentId}
                className="flex justify-between items-center bg-white p-2 rounded-lg mb-2 last:mb-0"
              >
                <span className="text-sm">
                  {i + 1}. {c.formacao}
                </span>
                <button
                  type="button"
                  onClick={() => toggleCourse(c)}
                  disabled={selected.length === 1}
                  className="p-1 text-red-500 hover:bg-red-50 rounded-full disabled:opacity-40"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="max-h-[320px] overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {courses.map(course => {
            const checked = isSelected(course.documentId)
            return (

              <CardFormacaoItem
                key={course.documentId + "test"}
                isSelect={checked}
                showAllInfo
                item={{
                  referencia_formacao: course.referencia_formacao,
                  documentId: course.documentId,
                  slug: course.slug,
                  formacao: course.formacao,
                  denominacao_entidade: course.denominacao_entidade,
                  url_logo_entidade: course.url_logo_entidade,
                  duracao: course.duracao,
                  periodo_formacao: course.periodo_formacao,
                  nivel: course.nivel
                }}
                onSelect={() => toggleCourse(course)}
                useSlectProps
                target="_blank"
              />
            )
          })}

          {pending && <p className="text-sm opacity-70">A carregar…</p>}

          {hasMore && !pending && (
            <button
              type="button"
              onClick={() => setPage(p => p + 1)}
              className="w-full py-2 text-sm text-[#2470B8] hover:underline"
            >
              Carregar mais
            </button>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#61C3A8] to-[#2470B8] text-white flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Salvar
          </button>
        </div>
      </div>
    </Modal>
  )
}
