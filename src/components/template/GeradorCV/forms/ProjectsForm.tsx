"use client"

import { useState, useEffect } from "react"

type Project = {
    nome: string
    descricao: string
    link: string
}

type ProjectsFormProps = {
    data: Project[]
    onChange: (data: Project[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function ProjectsForm({ data, onChange, onNext, onBack }: ProjectsFormProps) {
    const [projects, setProjects] = useState<Project[]>([])
    const [errors, setErrors] = useState<Array<{
        nome: boolean
        descricao: boolean
        link: boolean
    }>>([])

    useEffect(() => {
        setProjects(data || [])
        setErrors((data || []).map(() => ({
            nome: false,
            descricao: false,
            link: false
        })))
    }, [data])

    const handleChange = (index: number, field: keyof Project, value: string) => {
        const updated = [...projects]
        updated[index][field] = value
        setProjects(updated)
        onChange(updated)

        // Clear error when user types
        if (errors[index]?.[field]) {
            const newErrors = [...errors]
            newErrors[index] = { ...newErrors[index], [field]: false }
            setErrors(newErrors)
        }
    }

    const addProject = () => {
        const updated = [...projects, { nome: "", descricao: "", link: "" }]
        setProjects(updated)
        onChange(updated)
        setErrors([...errors, { nome: false, descricao: false, link: false }])
    }

    const removeProject = (index: number) => {
        const updated = projects.filter((_, i) => i !== index)
        setProjects(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)
    }

    const isValidUrl = (url: string) => {
        if (!url) return true // Link é opcional
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    const validateForm = () => {
        if (projects.length === 0) return true // Permite avançar sem projetos

        const newErrors = projects.map(proj => ({
            nome: !proj.nome.trim(),
            descricao: !proj.descricao.trim(),
            link: !isValidUrl(proj.link)
        }))

        setErrors(newErrors)

        // Verifica se todos os projetos estão válidos
        return !newErrors.some(err => err.nome || err.descricao || err.link)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && onNext) {
            onNext()
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleNext}>
            <h2 className="text-xl font-semibold mb-4">Projetos Pessoais ou Acadêmicos</h2>

            {projects.map((proj, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                    <div className="mb-2">
                        <label className="block text-sm font-medium">Nome do Projeto*</label>
                        <input
                            type="text"
                            value={proj.nome}
                            onChange={(e) => handleChange(index, "nome", e.target.value)}
                            className={`w-full p-2 border rounded ${errors[index]?.nome ? "border-red-500" : ""}`}
                        />
                        {errors[index]?.nome && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium">Descrição*</label>
                        <textarea
                            value={proj.descricao}
                            onChange={(e) => handleChange(index, "descricao", e.target.value)}
                            className={`w-full p-2 border rounded ${errors[index]?.descricao ? "border-red-500" : ""}`}
                            rows={3}
                        />
                        {errors[index]?.descricao && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium">Link</label>
                        <input
                            type="url"
                            value={proj.link}
                            onChange={(e) => handleChange(index, "link", e.target.value)}
                            className={`w-full p-2 border rounded ${errors[index]?.link ? "border-red-500" : ""}`}
                            placeholder="https://exemplo.com"
                        />
                        {errors[index]?.link && (
                            <p className="text-red-500 text-sm mt-1">URL inválida</p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="text-red-600 text-sm mt-1 hover:underline"
                    >
                        Remover
                    </button>
                </div>
            ))}

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