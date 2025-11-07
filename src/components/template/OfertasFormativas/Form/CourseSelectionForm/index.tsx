'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import { CircleAlert, Pencil } from 'lucide-react'

import { Dropzone } from './Dropzone'
import { CourseSelectionModal } from './CourseSelectionModal'
import { IOfertaFormativaListItem } from '@/services/ofertas/types'
export interface ICursoSelecionado {
  documentId: string;
  formacao: string;
  denominacao_entidade: string;
  url_logo_entidade: string;
  referencia_formacao: string;
  duracao: string;
  periodo_formacao: string;
  nivel: string;
  slug: string;
}

const ofertaToCourse = (o: IOfertaFormativaListItem): IOfertaFormativaListItem => ({
  documentId: o.documentId,
  formacao: o.formacao,
  denominacao_entidade: o.denominacao_entidade,
  url_logo_entidade: o.url_logo_entidade,
  referencia_formacao: o.referencia_formacao,
  duracao: o.duracao,
  periodo_formacao: o.periodo_formacao,
  nivel: o.nivel,
  slug: o.slug,
})

interface Props {
  cursos: IOfertaFormativaListItem[]
}

export function CourseSelectionForm({ cursos }: Props) {
  const { setValue, getValues } = useFormContext()

  const [blocos, setBlocos] = useState<Record<string, ICursoSelecionado>>(() => {
    const saved = getValues('cursoOrdem') as Record<string, ICursoSelecionado> | undefined;
    if (saved && Object.keys(saved).length > 0) return saved;

    return Object.fromEntries(
      cursos.slice(0, 3).map((c, i) => [
        `bloco_${i + 1}`,
        {
          documentId: c.documentId,
          formacao: c.formacao,
          denominacao_entidade: c.denominacao_entidade,
          url_logo_entidade: c.url_logo_entidade,
          referencia_formacao: c.referencia_formacao,
          duracao: c.duracao,
          periodo_formacao: c.periodo_formacao,
          nivel: c.nivel,
          slug: c.slug,
        }
      ])
    );
  });

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setValue('cursoOrdem', blocos)
  }, [blocos, setValue])

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setBlocos((prev) => {
      const next = { ...prev }
      const temp = next[active.id]
      next[active.id] = next[over.id]
      next[over.id] = temp
      return next
    })
  }

  const handleSave = (courses: ICursoSelecionado[]) => {
    const mapa: Record<string, ICursoSelecionado> = {};
    courses.slice(0, 3).forEach((course, index) => {
      mapa[`bloco_${index + 1}`] = {
        documentId: course.documentId,
        formacao: course.formacao,
        denominacao_entidade: course.denominacao_entidade,
        url_logo_entidade: course.url_logo_entidade,
        referencia_formacao: course.referencia_formacao,
        duracao: course.duracao,
        periodo_formacao: course.periodo_formacao,
        nivel: course.nivel,
        slug: course.slug,
      };
    });
    setBlocos(mapa);
  };

  const blocosDyn = Object.keys(blocos).map((key, index) => {
    return ({
      id: key,
      title: `${index + 1}ª Opção`,
    })
  })

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className="flex items-center gap-4 mb-4 bg-[#61C3A81A] rounded-[32px] px-2 min-h-[50px] text-[#61C3A8]">
          <CircleAlert />
          <p className="text-[11px] lg:text-sm flex-1">
            Arraste os cursos para definir a sua ordem de preferência.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="p-2 hover:bg-[#61C3A8]/10 rounded-lg"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>

        <div
          className={`border border-dashed border-[#BFC4CD] rounded-[20px] grid grid-cols-1 ${blocosDyn.length === 1
            ? 'md:grid-cols-1 lg:grid-cols-2'
            : blocosDyn.length === 2
              ? 'md:grid-cols-2 lg:grid-cols-2'
              : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
        >
          {blocosDyn.map((b, index) => (
            <Dropzone
              key={`${b.id}-index-${index}`}
              id={b.id}
              title={b.title}
              curso={blocos[b.id]}
            />
          ))}
        </div>
      </DndContext>

      <CourseSelectionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialCourses={Object.values(blocos).map(ofertaToCourse)}
      />
    </>
  )
}
