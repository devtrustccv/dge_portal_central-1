"use client"

import { Label } from "@/components/atoms/label"
import { Input } from "@/components/atoms/input"
import { useEffect, useState } from "react"

type SkillsFormProps = {
    data: string[]
    onChange: (data: string[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function SkillsForm({ data, onChange, onNext, onBack }: SkillsFormProps) {
    const [skills, setSkills] = useState<string[]>([])
    const [errors, setErrors] = useState<boolean[]>([])

    useEffect(() => {
        setSkills(data || [])
        setErrors((data || []).map(skill => !skill.trim()))
    }, [data])

    const handleSkillChange = (index: number, value: string) => {
        const updated = [...skills]
        updated[index] = value
        setSkills(updated)
        onChange(updated)

        // Clear error when user types
        if (errors[index] && value.trim()) {
            const newErrors = [...errors]
            newErrors[index] = false
            setErrors(newErrors)
        }
    }

    const addSkill = () => {
        const updated = [...skills, ""]
        setSkills(updated)
        onChange(updated)
        setErrors([...errors, true]) // New skill starts as invalid (empty)
    }

    const removeSkill = (index: number) => {
        const updated = skills.filter((_, i) => i !== index)
        setSkills(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)
    }

    const validateForm = () => {
        const newErrors = skills.map(skill => !skill.trim())
        setErrors(newErrors)

        // Check if there's at least one skill and all are valid
        return skills.length > 0 && !newErrors.some(error => error)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && onNext) {
            onNext()
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleNext}>
            {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div className="w-full">
                        <Label htmlFor={`skill-${index}`}>Competência/Habilidade {index + 1}*</Label>
                        <Input
                            id={`skill-${index}`}
                            type="text"
                            placeholder="Ex: React, Tailwind, etc."
                            value={skill}
                            onChange={(e) => handleSkillChange(index, e.target.value)}
                            className={errors[index] ? "border-red-500" : ""}
                        />
                        {errors[index] && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>
                    <button
                        type="button"
                        className="text-red-500 hover:underline mt-6"
                        onClick={() => removeSkill(index)}
                    >
                        Remover
                    </button>
                </div>
            ))}

            {skills.length === 0 && (
                <p className="text-red-500">Adicione pelo menos uma competência/habilidade</p>
            )}

            <button
                type="button"
                className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F]"
                onClick={addSkill}
            >
                Adicionar Competência/Habilidade
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
                        className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F] disabled:opacity-50"
                        disabled={skills.length === 0 || errors.some(error => error)}
                    >
                        Avançar
                    </button>
                )}
            </div>
        </form>
    )
}