"use client"

import { Label } from "@/components/atoms/label"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { useEffect, useState } from "react"



type Education = {
    instituicao: string
    curso: string

    dataInicio: string
    dataFim: string
    observacoes: string
}

type EducationFormProps = {
    data: Education[]
    onChange: (data: Education[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function EducationForm({ data, onChange, onNext, onBack }: EducationFormProps) {
    const [educations, setEducations] = useState<Education[]>([])
    const [errors, setErrors] = useState<Array<{
        instituicao: boolean
        curso: boolean

        dataInicio: boolean
        dataFim: boolean
    }>>([])

    useEffect(() => {
        setEducations(data || [])
        setErrors((data || []).map(() => ({
            instituicao: false,
            curso: false,

            dataInicio: false,
            dataFim: false
        })))
    }, [data])

    const handleChange = (index: number, field: keyof Education, value: string) => {
        const updated = [...educations]
        updated[index][field] = value as any
        setEducations(updated)
        onChange(updated)

        if (errors[index]?.[field as keyof typeof errors[number]]) {
            const newErrors = [...errors]
            newErrors[index] = { ...newErrors[index], [field]: false }
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
    }

    const removeEducation = (index: number) => {
        const updated = educations.filter((_, i) => i !== index)
        setEducations(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)
    }

    const isValidDate = (dateString: string) => {
        if (!dateString) return false
        return !isNaN(Date.parse(dateString))
    }

    const validateForm = () => {
        if (educations.length === 0) return true // Permite avançar sem formações

        const newErrors = educations.map(edu => {
            return {
                instituicao: !edu.instituicao.trim(),
                curso: !edu.curso.trim(),
                dataInicio: !edu.dataInicio || !isValidDate(edu.dataInicio),
                dataFim: edu.dataFim ?
                    (!isValidDate(edu.dataFim) || new Date(edu.dataFim) < new Date(edu.dataInicio)) : false
            }
        })

        setErrors(newErrors)

        // Verifica se todas as formações estão válidas
        return !newErrors.some(err =>
            err.instituicao || err.curso || err.dataInicio || err.dataFim
        )
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && onNext) {
            onNext()
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleNext}>
            {educations.map((edu, index) => (
                <div key={index} className="space-y-4 border rounded p-4">
                    <div>
                        <Label htmlFor={`instituicao-${index}`}>Instituição de Ensino*</Label>
                        <Input
                            id={`instituicao-${index}`}
                            type="text"
                            placeholder="Ex: Universidade de Cabo Verde"
                            value={edu.instituicao}
                            onChange={(e) => handleChange(index, "instituicao", e.target.value)}
                            className={errors[index]?.instituicao ? "border-red-500" : ""}
                        />
                        {errors[index]?.instituicao && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor={`curso-${index}`}>Curso/Área de Estudo*</Label>
                        <Input
                            id={`curso-${index}`}
                            type="text"
                            placeholder="Ex: Engenharia Informática"
                            value={edu.curso}
                            onChange={(e) => handleChange(index, "curso", e.target.value)}
                            className={errors[index]?.curso ? "border-red-500" : ""}
                        />
                        {errors[index]?.curso && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor={`dataInicio-${index}`}>Data de Início*</Label>
                            <Input
                                id={`dataInicio-${index}`}
                                type="date"
                                value={edu.dataInicio}
                                onChange={(e) => handleChange(index, "dataInicio", e.target.value)}
                                className={errors[index]?.dataInicio ? "border-red-500" : ""}
                            />
                            {errors[index]?.dataInicio && (
                                <p className="text-red-500 text-sm mt-1">
                                    {!edu.dataInicio ? "Este campo é obrigatório" : "Data inválida"}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor={`dataFim-${index}`}>Data de Conclusão</Label>
                            <Input
                                id={`dataFim-${index}`}
                                type="date"
                                value={edu.dataFim}
                                onChange={(e) => handleChange(index, "dataFim", e.target.value)}
                                className={errors[index]?.dataFim ? "border-red-500" : ""}
                            />
                            {errors[index]?.dataFim && (
                                <p className="text-red-500 text-sm mt-1">
                                    {!isValidDate(edu.dataFim) ? "Data inválida" : "A data de conclusão deve ser após a data de início"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor={`observacoes-${index}`}>Observações</Label>
                        <Textarea
                            id={`observacoes-${index}`}
                            placeholder="Observações opcionais"
                            value={edu.observacoes}
                            onChange={(e) => handleChange(index, "observacoes", e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className="text-red-500 hover:underline mt-2"
                        onClick={() => removeEducation(index)}
                    >
                        Remover
                    </button>
                </div>
            ))}

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