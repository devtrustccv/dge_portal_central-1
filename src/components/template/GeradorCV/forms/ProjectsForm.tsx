"use client"

import {useEffect, useState} from "react"
import {Trash2} from "lucide-react";
import {AlertConfirmacao} from "@/app/(layout-with-banner)/gerador-cv/AlertConfirmacao";
import {Project} from "@/services/ofertas/getAllOfertas/type";

type ProjectsFormProps = {
    data: Project[] | undefined
    onChange: (data: Project[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function ProjectsForm({data, onChange, onNext, onBack}: ProjectsFormProps) {
    const [projects, setProjects] = useState<Project[]>([])
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const [errors, setErrors] = useState<Array<{
        nome: boolean
        descricao: boolean
        link: boolean
    }>>([])
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    useEffect(() => {
        const safeData = data || []
        setProjects(safeData)
        setErrors(safeData.map(() => ({nome: false, descricao: false, link: false})))
        if (safeData.length > 0) setExpandedIndex(safeData.length - 1)
    }, [data])

    const handleChange = (index: number, field: keyof Project, value: string) => {
        const updated = [...projects]
        updated[index][field] = value
        setProjects(updated)
        onChange(updated)

        if (errors[index]?.[field]) {
            const newErrors = [...errors]
            newErrors[index] = {...newErrors[index], [field]: false}
            setErrors(newErrors)
        }
    }

    const addProject = () => {
        const updated = [...projects, {nome: "", descricao: "", link: ""}]
        setProjects(updated)
        onChange(updated)
        setErrors([...errors, {nome: false, descricao: false, link: false}])
        setExpandedIndex(updated.length - 1)
    }

    const removeProject = (index: number) => {
        const updated = projects.filter((_, i) => i !== index)
        setProjects(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)

        if (expandedIndex === index) {
            setExpandedIndex(updated.length > 0 ? updated.length - 1 : null)
        }
    }

    const isValidUrl = (url: string) => {
        if (!url) return true
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    const validateForm = () => {
        if (projects.length === 0) return true

        const newErrors = projects.map(proj => ({
            nome: !proj.nome.trim(),
            descricao: !proj.descricao?.trim(),
            link: !isValidUrl(proj?.link || "#")
        }))

        setErrors(newErrors)
        return !newErrors.some(err => err.nome || err.descricao || err.link)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm() && onNext) onNext()
    }

    return (
        <form className="space-y-4" onSubmit={handleNext}>
            <h2 className="text-xl font-semibold mb-4">Projetos Pessoais ou Acadêmicos</h2>

            {projects.map((proj, index) => {
                const isExpanded = expandedIndex === index
                return (
                    <div key={index}>
                        <div className="border rounded overflow-hidden">
                            <div className='bg-gray-100 flex justify-between'>
                                {/* HEADER COLAPSADO */}
                                <div
                                    className="w-full p-4 cursor-pointer flex justify-between items-center"
                                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                >
                                    <div className='flex justify-center items-center gap-1'>
                                        <p className="font-semibold">{proj.nome || "Nome do Projeto"}</p> -
                                        <p className="text-sm font-medium text-gray-500">{proj.link || "Link do projeto"}</p>
                                    </div>
                                    <span className="text-sm">{isExpanded ? "▲" : "▼"}</span></div>
                                <div className='flex justify-center items-center px-1'>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:underline"
                                        //onClick={() => removeExperience(index)}
                                        onClick={() => {
                                            setSelectedIndex(index)
                                            setOpen(true)
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>

                            {/* CONTEÚDO EXPANDIDO */}
                            {isExpanded && (
                                <div className="space-y-2 p-4">
                                    <div>
                                        <label className="block font-medium">Nome do Projeto*</label>
                                        <input
                                            type="text"
                                            value={proj.nome}
                                            onChange={(e) => handleChange(index, "nome", e.target.value)}
                                            className={`w-full border rounded px-3 py-2 ${errors[index]?.nome ? "border-red-500" : ""}`}
                                        />
                                        {errors[index]?.nome && (
                                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block font-medium">Descrição*</label>
                                        <textarea
                                            value={proj.descricao}
                                            onChange={(e) => handleChange(index, "descricao", e.target.value)}
                                            className={`w-full border rounded px-3 py-2 ${errors[index]?.descricao ? "border-red-500" : ""}`}
                                            rows={3}
                                        />
                                        {errors[index]?.descricao && (
                                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block font-medium">Link</label>
                                        <input
                                            type="url"
                                            value={proj.link}
                                            onChange={(e) => handleChange(index, "link", e.target.value)}
                                            className={`w-full border rounded px-3 py-2 ${errors[index]?.link ? "border-red-500" : ""}`}
                                            placeholder="https://exemplo.com"
                                        />
                                        {errors[index]?.link && (
                                            <p className="text-red-500 text-sm mt-1">URL inválida</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <AlertConfirmacao
                            open={open}
                            setOpen={setOpen}
                            title={'Deseja remover o seu projecto?'}
                            onConfirm={async () => {
                                if (selectedIndex !== null) {
                                    removeProject(selectedIndex)
                                    setSelectedIndex(null)
                                }
                                setOpen(false)
                            }}
                        />
                    </div>
                )
            })}

            <button
                type="button"
                onClick={addProject}
                className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F]"
            >
                Adicionar Projeto
            </button>

            <div className="flex justify-between mt-6">
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Voltar
                    </button>
                )}
                {onNext && (
                    <button
                        type="submit"
                        className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F]"
                    >
                        Avançar
                    </button>
                )}
            </div>
        </form>
    )
}
