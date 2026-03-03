"use client"

import {Label} from "@/components/atoms/label"
import {Input} from "@/components/atoms/input"
import {Textarea} from "@/components/atoms/textarea"
import {useEffect, useState} from "react"
import {Trash2} from "lucide-react";
import {AlertConfirmacao} from "@/app/(layout-with-banner)/gerador-cv/AlertConfirmacao";
import {Education} from "@/services/get-curriculo-cv/type";

type EducationFormProps = {
    data: Education[] | undefined
    onChange: (data: Education[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function EducationForm({data, onChange, onNext, onBack}: EducationFormProps) {
    const [educations, setEducations] = useState<Education[]>([])
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const [errors, setErrors] = useState<Array<{
        instituicao: boolean
        curso: boolean
        dataInicio: boolean
        dataFim: boolean
    }>>([])

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    useEffect(() => {
        const safeData = data || []
        setEducations(safeData)
        setErrors(safeData.map(() => ({
            instituicao: false,
            curso: false,
            dataInicio: false,
            dataFim: false
        })))
        if (safeData.length > 0) {
            setExpandedIndex(safeData.length - 1)
        }
    }, [data])

    const isValidDate = (dateString: string) => {
        if (!dateString) return false
        return !isNaN(Date.parse(dateString))
    }

    const handleChange = (index: number, field: keyof Education, value: string) => {
        const updated = [...educations]
        updated[index][field] = value as any
        setEducations(updated)
        onChange(updated)

        if (errors[index]?.[field as keyof typeof errors[number]]) {
            const newErrors = [...errors]
            newErrors[index] = {...newErrors[index], [field]: false}
            setErrors(newErrors)
        }
    }

    const addEducation = () => {
        const newEdu: Education = {
            instituicao: "",
            curso: "",
            dataInicio: "",
            dataFim: "",
            observacoes: ""
        }

        const updated = [...educations, newEdu]
        setEducations(updated)
        onChange(updated)
        setErrors([...errors, {
            instituicao: false,
            curso: false,
            dataInicio: false,
            dataFim: false
        }])

        setExpandedIndex(updated.length - 1)
    }

    const removeEducation = (index: number) => {
        const updated = educations.filter((_, i) => i !== index)
        setEducations(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)

        if (expandedIndex === index) {
            setExpandedIndex(updated.length > 0 ? updated.length - 1 : null)
        }
    }

    const validateForm = () => {
        if (educations.length === 0) return true

        const newErrors = educations.map(edu => ({
            instituicao: !edu.instituicao.trim(),
            curso: !edu.curso.trim(),
            dataInicio: !edu.dataInicio || !isValidDate(edu.dataInicio),
            dataFim: edu.dataFim ? (!isValidDate(edu.dataFim) || new Date(edu.dataFim) < new Date(edu.dataInicio || "")) : false
        }))

        setErrors(newErrors)

        return !newErrors.some(err => err.instituicao || err.curso || err.dataInicio || err.dataFim)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm() && onNext) onNext()
    }

    return (
        <form className="space-y-6" onSubmit={handleNext}>

            {educations.map((edu, index) => {
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
                                            {edu.instituicao || "Instituição não definida"} - <span
                                            className="text-sm font-medium text-gray-500">{edu.curso || "Curso não definido"}</span>
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
                                <div className="space-y-4 p-4">
                                    <div>
                                        <Label>Instituição de Ensino*</Label>
                                        <Input
                                            type="text"
                                            value={edu.instituicao}
                                            onChange={(e) => handleChange(index, "instituicao", e.target.value)}
                                            className={errors[index]?.instituicao ? "border-red-500" : ""}
                                        />
                                    </div>

                                    <div>
                                        <Label>Curso/Área de Estudo*</Label>
                                        <Input
                                            type="text"
                                            value={edu.curso}
                                            onChange={(e) => handleChange(index, "curso", e.target.value)}
                                            className={errors[index]?.curso ? "border-red-500" : ""}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Data de Início*</Label>
                                            <Input
                                                type="date"
                                                value={edu.dataInicio}
                                                onChange={(e) => handleChange(index, "dataInicio", e.target.value)}
                                                className={errors[index]?.dataInicio ? "border-red-500" : ""}
                                            />
                                        </div>

                                        <div>
                                            <Label>Data de Conclusão</Label>
                                            <Input
                                                type="date"
                                                value={edu.dataFim}
                                                onChange={(e) => handleChange(index, "dataFim", e.target.value)}
                                                className={errors[index]?.dataFim ? "border-red-500" : ""}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Observações</Label>
                                        <Textarea
                                            value={edu.observacoes}
                                            onChange={(e) => handleChange(index, "observacoes", e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <AlertConfirmacao
                            open={open}
                            setOpen={setOpen}
                            title={'Deseja remover esta formação?'}
                            onConfirm={async () => {
                                if (selectedIndex !== null) {
                                    removeEducation(selectedIndex)
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
                className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F]"
                onClick={addEducation}
            >
                Adicionar Formação
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
