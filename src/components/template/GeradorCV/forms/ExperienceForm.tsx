"use client"

import {Label} from "@/components/atoms/label"
import {Input} from "@/components/atoms/input"
import {Textarea} from "@/components/atoms/textarea"
import {useEffect, useState} from "react"
import {Trash2} from "lucide-react";
import {AlertConfirmacao} from "@/app/(layout-with-banner)/gerador-cv/AlertConfirmacao";
import {Experience} from "@/services/get-curriculo-cv/type";

type ExperienceFormProps = {
    data: Experience[] | undefined
    onChange: (data: Experience[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function ExperienceForm({
                                   data,
                                   onChange,
                                   onNext,
                                   onBack
                               }: ExperienceFormProps) {

    const [experiences, setExperiences] = useState<Experience[]>([])
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const [errors, setErrors] = useState<Array<{
        cargo: boolean
        empresa: boolean
        dataInicio: boolean
        dataFim: boolean
        descricao: boolean
    }>>([])

    useEffect(() => {
        const safeData = data || []
        setExperiences(safeData)

        setErrors(
            safeData.map(() => ({
                cargo: false,
                empresa: false,
                dataInicio: false,
                dataFim: false,
                descricao: false
            }))
        )

        if (safeData.length > 0) {
            setExpandedIndex(safeData.length - 1)
        }
    }, [data])

    const isValidDate = (dateString: string) => {
        return !isNaN(Date.parse(dateString))
    }

    const handleChange = (index: number, field: keyof Experience, value: string) => {
        const updated = [...experiences]
        updated[index][field] = value
        setExperiences(updated)
        onChange(updated)

        if (errors[index]?.[field as keyof typeof errors[number]] && value.trim()) {
            const newErrors = [...errors]
            newErrors[index] = {...newErrors[index], [field]: false}
            setErrors(newErrors)
        }

        if (field === "descricao" && value.length > 1000) {
            const newErrors = [...errors]
            newErrors[index] = {...newErrors[index], descricao: true}
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

        setErrors([
            ...errors,
            {
                cargo: false,
                empresa: false,
                dataInicio: false,
                dataFim: false,
                descricao: false
            }
        ])

        setExpandedIndex(updated.length - 1)
    }

    const removeExperience = (index: number) => {
        const updated = experiences.filter((_, i) => i !== index)
        setExperiences(updated)
        onChange(updated)

        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)

        if (expandedIndex === index) {
            setExpandedIndex(updated.length > 0 ? updated.length - 1 : null)
        }
    }

    const validateForm = () => {
        let isValid = true

        const newErrors = experiences.map(exp => {
            const error = {
                cargo: !exp.cargo.trim(),
                empresa: !exp.empresa.trim(),
                dataInicio: !exp.dataInicio || !isValidDate(exp.dataInicio),
                dataFim: exp.dataFim
                    ? (!isValidDate(exp.dataFim) ||
                        new Date(exp.dataFim) < new Date(exp?.dataInicio || ""))
                    : false,
                descricao: (exp?.descricao?.length || 0) > 1000
            }

            if (Object.values(error).some(Boolean)) {
                isValid = false
            }

            return error
        })

        setErrors(newErrors)
        return isValid
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && onNext) {
            onNext()
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleNext}>

            {experiences.map((exp, index) => {
                const isExpanded = expandedIndex === index

                return (
                    <div key={index}>
                        <div key={index}>
                            <div className="border rounded overflow-hidden">

                                <div className='bg-gray-100 flex justify-between'>
                                    {/* HEADER COLAPSADO */}
                                    <div className="w-full p-4 cursor-pointer flex justify-between items-center"
                                         onClick={() =>
                                             setExpandedIndex(isExpanded ? null : index)
                                         }
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {exp.cargo || "Cargo não definido"} - <span
                                                className="text-sm font-medium text-gray-500">{exp.empresa || "Empresa não definida"}</span>
                                            </p>
                                        </div>
                                        <span className="text-sm">
                                  {isExpanded ? "▲" : "▼"}
                                </span>
                                    </div>
                                    <div className='flex justify-center items-center px-1'>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:underline"
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
                                    <div className="space-y-4 p-4">

                                        <div>
                                            <Label>Cargo/Função*</Label>
                                            <Input
                                                type="text"
                                                value={exp.cargo}
                                                onChange={(e) =>
                                                    handleChange(index, "cargo", e.target.value)
                                                }
                                                className={errors[index]?.cargo ? "border-red-500" : ""}
                                            />
                                        </div>

                                        <div>
                                            <Label>Empresa*</Label>
                                            <Input
                                                type="text"
                                                value={exp.empresa}
                                                onChange={(e) =>
                                                    handleChange(index, "empresa", e.target.value)
                                                }
                                                className={errors[index]?.empresa ? "border-red-500" : ""}
                                            />
                                        </div>

                                        <div>
                                            <Label>Local</Label>
                                            <Input
                                                type="text"
                                                value={exp.local}
                                                onChange={(e) =>
                                                    handleChange(index, "local", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Data Início*</Label>
                                                <Input
                                                    type="date"
                                                    value={exp.dataInicio}
                                                    onChange={(e) =>
                                                        handleChange(index, "dataInicio", e.target.value)
                                                    }
                                                    className={errors[index]?.dataInicio ? "border-red-500" : ""}
                                                />
                                            </div>

                                            <div>
                                                <Label>Data de Término</Label>
                                                <Input
                                                    type="date"
                                                    value={exp.dataFim}
                                                    onChange={(e) =>
                                                        handleChange(index, "dataFim", e.target.value)
                                                    }
                                                    className={errors[index]?.dataFim ? "border-red-500" : ""}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Principais Atividades</Label>
                                            <Textarea
                                                value={exp.descricao}
                                                onChange={(e) =>
                                                    handleChange(index, "descricao", e.target.value)
                                                }
                                                className={errors[index]?.descricao ? "border-red-500" : ""}
                                            />
                                            <div className={`text-sm ${(exp?.descricao?.length || 0) > 1000
                                                ? "text-red-500"
                                                : "text-gray-500"
                                            }`}>
                                                {(exp.descricao?.length || 0)}/1000 caracteres
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                )
            })}
            <AlertConfirmacao
                open={open}
                setOpen={setOpen}
                title={'Deseja remover esta experiência?'}
                onConfirm={async () => {
                    if (selectedIndex !== null) {
                        removeExperience(selectedIndex)
                        setSelectedIndex(null)
                    }
                    setOpen(false)
                }}
            />

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

