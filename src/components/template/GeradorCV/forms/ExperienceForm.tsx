"use client"

import { Label } from "@/components/atoms/label"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { useEffect, useState } from "react"

type Experience = {
    cargo: string
    empresa: string
    local: string
    dataInicio: string
    dataFim: string
    descricao: string
}

type ExperienceFormProps = {
    data: Experience[]
    onChange: (data: Experience[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function ExperienceForm({ data, onChange, onNext, onBack }: ExperienceFormProps) {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [errors, setErrors] = useState<Array<{
        cargo: boolean
        empresa: boolean
        dataInicio: boolean
        dataFim: boolean
        descricao: boolean
    }>>([])

    useEffect(() => {
        setExperiences(data || [])
        setErrors((data || []).map(() => ({
            cargo: false,
            empresa: false,
            dataInicio: false,
            dataFim: false,
            descricao: false
        })))
    }, [data])

    const handleChange = (index: number, field: keyof Experience, value: string) => {
        const updated = [...experiences]
        updated[index][field] = value
        setExperiences(updated)
        onChange(updated)

        // Clear error when user types
        if (errors[index]?.[field as keyof typeof errors[number]] && value.trim()) {
            const newErrors = [...errors]
            newErrors[index] = { ...newErrors[index], [field]: false }
            setErrors(newErrors)
        }

        // Special handling for description length
        if (field === 'descricao' && value.length > 1000) {
            const newErrors = [...errors]
            newErrors[index] = { ...newErrors[index], descricao: true }
            setErrors(newErrors)
        }
    }

    const addExperience = () => {
        const newExp: Experience = {
            cargo: "",
            empresa: "",
            local: "",
            dataInicio: "",
            dataFim: "",
            descricao: ""
        }
        const updated = [...experiences, newExp]
        setExperiences(updated)
        onChange(updated)
        setErrors([...errors, {
            cargo: false,
            empresa: false,
            dataInicio: false,
            dataFim: false,
            descricao: false
        }])
    }

    const removeExperience = (index: number) => {
        const updated = experiences.filter((_, i) => i !== index)
        setExperiences(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)
    }

    const validateForm = () => {
        let isValid = true
        const newErrors = experiences.map(exp => {
            const error = {
                cargo: !exp.cargo.trim(),
                empresa: !exp.empresa.trim(),
                dataInicio: !exp.dataInicio || !isValidDate(exp.dataInicio),
                dataFim: exp.dataFim ?
                    (!isValidDate(exp.dataFim) || new Date(exp.dataFim) < new Date(exp.dataInicio)) : false,
                descricao: exp.descricao.length > 1000
            }

            if (Object.values(error).some(e => e)) isValid = false

            return error
        })

        setErrors(newErrors)
        return isValid
    }

    const isValidDate = (dateString: string) => {
        return !isNaN(Date.parse(dateString))
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && onNext) {
            onNext()
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleNext}>
            {experiences.map((exp, index) => (
                <div key={index} className="space-y-4 border rounded p-4">
                    <div>
                        <Label htmlFor={`cargo-${index}`}>Cargo/Função*</Label>
                        <Input
                            id={`cargo-${index}`}
                            type="text"
                            placeholder="Ex: Desenvolvedor Frontend"
                            value={exp.cargo}
                            onChange={(e) => handleChange(index, "cargo", e.target.value)}
                            className={errors[index]?.cargo ? "border-red-500" : ""}
                        />
                        {errors[index]?.cargo && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor={`empresa-${index}`}>Empresa*</Label>
                        <Input
                            id={`empresa-${index}`}
                            type="text"
                            placeholder="Ex: Nome da empresa"
                            value={exp.empresa}
                            onChange={(e) => handleChange(index, "empresa", e.target.value)}
                            className={errors[index]?.empresa ? "border-red-500" : ""}
                        />
                        {errors[index]?.empresa && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor={`local-${index}`}>Local</Label>
                        <Input
                            id={`local-${index}`}
                            type="text"
                            placeholder="Ex: Praia, Santiago"
                            value={exp.local}
                            onChange={(e) => handleChange(index, "local", e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor={`dataInicio-${index}`}>Data Início*</Label>
                            <Input
                                id={`dataInicio-${index}`}
                                type="date"
                                value={exp.dataInicio}
                                onChange={(e) => handleChange(index, "dataInicio", e.target.value)}
                                className={errors[index]?.dataInicio ? "border-red-500" : ""}
                            />
                            {errors[index]?.dataInicio && (
                                <p className="text-red-500 text-sm mt-1">
                                    {!exp.dataInicio ? "Este campo é obrigatório" : "Data inválida"}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor={`dataFim-${index}`}>Data de Término</Label>
                            <Input
                                id={`dataFim-${index}`}
                                type="date"
                                value={exp.dataFim}
                                onChange={(e) => handleChange(index, "dataFim", e.target.value)}
                                className={errors[index]?.dataFim ? "border-red-500" : ""}
                            />
                            {errors[index]?.dataFim && (
                                <p className="text-red-500 text-sm mt-1">
                                    {!isValidDate(exp.dataFim) ? "Data inválida" : "A data de término deve ser após a data de início"}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor={`descricao-${index}`}>Principais Atividades</Label>
                        <Textarea
                            id={`descricao-${index}`}
                            placeholder="Descreva as suas responsabilidades e conquistas (máximo 1000 caracteres)"
                            value={exp.descricao}
                            onChange={(e) => handleChange(index, "descricao", e.target.value)}
                            className={errors[index]?.descricao ? "border-red-500" : ""}
                        />
                        <div className={`text-sm ${exp.descricao.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}>
                            {exp.descricao.length}/1000 caracteres
                        </div>
                        {errors[index]?.descricao && (
                            <p className="text-red-500 text-sm mt-1">O texto excede o limite de 1000 caracteres</p>
                        )}
                    </div>
                    <button
                        type="button"
                        className="text-red-500 hover:underline mt-2"
                        onClick={() => removeExperience(index)}
                    >
                        Remover
                    </button>
                </div>
            ))}
            <button
                type="button"
                className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F]"
                onClick={addExperience}
            >
                Adicionar Experiência
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