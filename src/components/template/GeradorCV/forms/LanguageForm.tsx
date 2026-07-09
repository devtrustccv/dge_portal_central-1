"use client"

import {Label} from "@/components/atoms/label"
import {Input} from "@/components/atoms/input"
import {useEffect, useState} from "react"
import {AlertConfirmacao} from "@/app/(layout-with-banner)/gerador-cv/AlertConfirmacao";
import {Trash2} from "lucide-react";
import {Idioma} from "@/services/get-curriculo-cv/type";

export type Language = {
    idioma: string
    nivel: string
}

type LanguageFormProps = {
    data: Idioma[] | undefined
    onChange: (data: Language[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function LanguageForm({data, onChange, onNext, onBack}: LanguageFormProps) {
    const [languages, setLanguages] = useState<Language[]>([])
    const [errors, setErrors] = useState<Array<{ idioma: boolean; nivel: boolean }>>([])
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    useEffect(() => {
        const safeData = data || []
        setLanguages(safeData)
        setErrors(safeData.map(() => ({idioma: false, nivel: false})))
        if (safeData.length > 0) setExpandedIndex(safeData.length - 1)
    }, [data])

    const handleChange = (index: number, field: keyof Language, value: string) => {
        const updated = [...languages]
        updated[index][field] = value
        setLanguages(updated)
        onChange(updated)

        if (errors[index]?.[field]) {
            const newErrors = [...errors]
            newErrors[index] = {...newErrors[index], [field]: false}
            setErrors(newErrors)
        }
    }

    const addLanguage = () => {
        const updated = [...languages, {idioma: "", nivel: ""}]
        setLanguages(updated)
        onChange(updated)
        setErrors([...errors, {idioma: false, nivel: false}])
        setExpandedIndex(updated.length - 1)
    }

    const removeLanguage = (index: number) => {
        const updated = languages.filter((_, i) => i !== index)
        setLanguages(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)

        if (expandedIndex === index) {
            setExpandedIndex(updated.length > 0 ? updated.length - 1 : null)
        }
    }

    const validateForm = () => {
        if (languages.length === 0) return true

        const newErrors = languages.map(lang => ({
            idioma: !lang.idioma.trim(),
            nivel: !lang.nivel.trim()
        }))

        setErrors(newErrors)

        return !newErrors.some(err => err.idioma || err.nivel)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm() && onNext) onNext()
    }

    return (
        <form className="space-y-4" onSubmit={handleNext}>
            <h3 className="text-lg font-semibold">Idiomas</h3>

            {languages.map((lang, index) => {
                const isExpanded = expandedIndex === index

                return (
                    <div key={index}>
                        <div key={index} className="border rounded overflow-hidden">

                            <div className='bg-gray-100 flex justify-between'>
                                {/* HEADER COLAPSADO */}
                                <div
                                    className="w-full p-4 cursor-pointer flex justify-between items-center"
                                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {lang.idioma || "Idioma não definido"} - <span
                                            className="text-sm font-medium text-gray-500">{lang.nivel || "Nível não definido"}</span>
                                        </p>
                                    </div>
                                    <span className="text-sm">{isExpanded ? "▲" : "▼"}</span>
                                </div>

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
                                        <Label>Idioma*</Label>
                                        <Input
                                            value={lang.idioma}
                                            onChange={(e) => handleChange(index, "idioma", e.target.value)}
                                            placeholder="Ex: Inglês, Espanhol"
                                            className={errors[index]?.idioma ? "border-red-500" : ""}
                                        />
                                    </div>

                                    <div>
                                        <Label>Nível*</Label>
                                        <select
                                            value={lang.nivel}
                                            onChange={(e) => handleChange(index, "nivel", e.target.value)}
                                            className={`w-full border rounded px-3 py-2 mt-1 ${errors[index]?.nivel ? "border-red-500" : "border-gray-300"}`}
                                        >
                                            <option value="">Selecione o nível</option>
                                            <option value="Básico">Básico</option>
                                            <option value="Intermediário">Intermediário</option>
                                            <option value="Fluente">Fluente</option>
                                        </select>
                                    </div>

                                </div>
                            )}
                        </div>
                        <AlertConfirmacao
                            open={open}
                            setOpen={setOpen}
                            title={'Deseja remover este idioma?'}
                            onConfirm={async () => {
                                if (selectedIndex !== null) {
                                    removeLanguage(selectedIndex)
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
