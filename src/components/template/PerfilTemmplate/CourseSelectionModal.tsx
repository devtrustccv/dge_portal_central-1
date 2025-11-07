"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Search, Check, X } from "lucide-react";
import { Modal } from "@/components/atoms/modal";
import { cn } from "@/lib/utils";
import { fetchCourses } from "@/services/courses";

export interface Course {
  cursoCandatoId: number;
  qualifOfertaId: number;
  ordemPreferencia: number;
  denominacaoQualif: string;
  denominacao_entidade?: string;
}

interface CourseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (courses: Course[]) => void;
  initialCourses: Course[];
}

export function CourseSelectionModal({
  isOpen,
  onClose,
  onSave,
  initialCourses,
}: CourseSelectionModalProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [selected, setSelected] = useState<Course[]>([]);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  useEffect(() => {
    if (!isOpen) return;
    setSelected(initialCourses);
    setSearch("");
    setDebounced("");
    setPage(1);
    setCourses([]);
    setHasMore(false);
  }, [isOpen, initialCourses]);

  useEffect(() => {
    if (!isOpen) return;

    startTransition(async () => {
      const res = await fetchCourses({
        search: debouncedSearch,
        page,
        perPage: 10,
      });

      const mapped: Course[] = res?.hits.map((h) => ({
        cursoCandatoId: h.id,
        qualifOfertaId: Number(h.referencia_formacao || h.id),
        ordemPreferencia: 0,
        denominacaoQualif: h.formacao,
        denominacao_entidade: h.denominacao_entidade,
      }));


      setCourses(prev => (page === 1 ? mapped : [...prev, ...mapped]));
      setHasMore(page * 10 < res?.total);
    });
  }, [debouncedSearch, page, isOpen]);

  useEffect(() => setPage(1), [debouncedSearch]);

  const toggleCourse = (course: Course) => {
    const isSel = selected.some(c => c.cursoCandatoId === course.cursoCandatoId);
    if (isSel) {
      if (selected.length === 1) return;
      setSelected(prev => prev.filter(c => c.cursoCandatoId !== course.cursoCandatoId));
    } else if (selected.length < 3) {
      const original = initialCourses.find(c => c.cursoCandatoId === course.cursoCandatoId);
      setSelected(prev => [...prev, original || course]);
    }
  };

  const handleSave = () => {
    const normalized = selected.map((c, i) => ({
      ...c,
      ordemPreferencia: i + 1,
    }));
    onSave(normalized);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Selecionar Cursos" maxWidth="4xl">
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
                key={c.cursoCandatoId}
                className="flex justify-between items-center bg-white p-2 rounded-lg mb-2 last:mb-0"
              >
                <span className="text-sm">{i + 1}. {c.denominacaoQualif}</span>
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

        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
          {courses.map(course => {
            const isSelected = selected.some(c => c.cursoCandatoId === course.cursoCandatoId);
            return (
              <div
                key={course.cursoCandatoId}
                onClick={() => toggleCourse(course)}
                className={cn(
                  "p-3 border rounded-lg cursor-pointer transition-all",
                  isSelected
                    ? "border-[#61C3A8] bg-[#61C3A8]/5"
                    : "border-gray-200 hover:border-[#61C3A8]/50"
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm">{course.denominacaoQualif}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#61C3A8] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            );
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
  );
}
