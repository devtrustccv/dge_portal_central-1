"use client"

import { Label } from "@/components/atoms/label"
import { Input } from "@/components/atoms/input"
import { useEffect, useState } from "react"

export type Language = {
    idioma: string
    nivel: string
}

type LanguageFormProps = {
    data: Language[]
    onChange: (data: Language[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function LanguageForm({ data, onChange, onNext, onBack }: LanguageFormProps) {
    const [languages, setLanguages] = useState<Language[]>([])
    const [errors, setErrors] = useState<Array<{
        idioma: boolean
        nivel: boolean
    }>>([])

    useEffect(() => {
        setLanguages(data || [])
        setErrors((data || []).map(() => ({
            idioma: false,
            nivel: false
        })))
    }, [data])

    const handleChange = (index: number, field: keyof Language, value: string) => {
        const updated = [...languages]
        updated[index][field] = value
        setLanguages(updated)
        onChange(updated)

        // Clear error when user types
        if (errors[index]?.[field]) {
            const newErrors = [...errors]
            newErrors[index] = { ...newErrors[index], [field]: false }
            setErrors(newErrors)
        }
    }

    const addLanguage = () => {
        const updated = [...languages, { idioma: "", nivel: "" }]
        setLanguages(updated)
        onChange(updated)
        setErrors([...errors, { idioma: false, nivel: false }])
    }

    const removeLanguage = (index: number) => {
        const updated = languages.filter((_, i) => i !== index)
        setLanguages(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)
    }

    const validateForm = () => {
        if (languages.length === 0) return true // Permite avançar sem idiomas

        const newErrors = languages.map(lang => ({
            idioma: !lang.idioma.trim(),
            nivel: !lang.nivel.trim()
        }))

        setErrors(newErrors)

        // Verifica se todos os idiomas estão válidos
        return !newErrors.some(err => err.idioma || err.nivel)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && onNext) {
            onNext()
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleNext}>
            <h3 className="text-lg font-semibold">Idiomas</h3>

            {languages.map((lang, index) => (
                <div key={index} className="space-y-2 border p-4 rounded-md">
                    <div>
                        <Label htmlFor={`idioma-${index}`}>Idioma*</Label>
                        <Input
                            id={`idioma-${index}`}
                            value={lang.idioma}
                            onChange={(e) => handleChange(index, "idioma", e.target.value)}
                            placeholder="Ex: Inglês, Espanhol"
                            className={errors[index]?.idioma ? "border-red-500" : ""}
                        />
                        {errors[index]?.idioma && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor={`nivel-${index}`}>Nível*</Label>
                        <select
                            id={`nivel-${index}`}
                            value={lang.nivel}
                            onChange={(e) => handleChange(index, "nivel", e.target.value)}
                            className={`w-full border rounded px-3 py-2 mt-1 ${errors[index]?.nivel ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Selecione o nível</option>
                            <option value="Básico">Básico</option>
                            <option value="Intermediário">Intermediário</option>
                            <option value="Fluente">Fluente</option>
                        </select>
                        {errors[index]?.nivel && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="text-red-600 text-sm hover:underline"
                    >
                        Remover
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addLanguage}
                className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F]"
            >
                Adicionar Idioma
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