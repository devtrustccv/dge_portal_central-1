"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/atoms/label"
import { Input } from "@/components/atoms/input"

export type Certificate = {
    nome: string
    entidade: string
    dataInicio: string
    dataConclusao: string
}

type CertificatesFormProps = {
    data: Certificate[]
    onChange: (data: Certificate[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function CertificatesForm({ data, onChange, onNext, onBack }: CertificatesFormProps) {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [errors, setErrors] = useState<Array<{
        nome: boolean
        entidade: boolean
        dataInicio: boolean
        dataConclusao: boolean
    }>>([])

    useEffect(() => {
        setCertificates(data || [])
        setErrors((data || []).map(() => ({
            nome: false,
            entidade: false,
            dataInicio: false,
            dataConclusao: false
        })))
    }, [data])

    const handleChange = (index: number, field: keyof Certificate, value: string) => {
        const updated = [...certificates]
        updated[index][field] = value
        setCertificates(updated)
        onChange(updated)

        // Clear error when user types
        if (errors[index]?.[field]) {
            const newErrors = [...errors]
            newErrors[index] = { ...newErrors[index], [field]: false }
            setErrors(newErrors)
        }
    }

    const addCertificate = () => {
        const updated = [...certificates, { nome: "", entidade: "", dataInicio: "", dataConclusao: "" }]
        setCertificates(updated)
        onChange(updated)
        setErrors([...errors, { nome: false, entidade: false, dataInicio: false, dataConclusao: false }])
    }

    const removeCertificate = (index: number) => {
        const updated = certificates.filter((_, i) => i !== index)
        setCertificates(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)
    }

    const isValidDate = (dateString: string) => {
        if (!dateString) return false
        return !isNaN(Date.parse(dateString))
    }

    const validateForm = () => {
        if (certificates.length === 0) return true // Permite avançar sem certificados

        const newErrors = certificates.map(cert => ({
            nome: !cert.nome.trim(),
            entidade: !cert.entidade.trim(),
            dataInicio: !cert.dataInicio || !isValidDate(cert.dataInicio),
            dataConclusao: cert.dataConclusao ?
                (!isValidDate(cert.dataConclusao) || new Date(cert.dataConclusao) < new Date(cert.dataInicio)) : false
        }))

        setErrors(newErrors)

        // Verifica se todos os certificados estão válidos
        return !newErrors.some(err => err.nome || err.entidade || err.dataInicio || err.dataConclusao)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && onNext) {
            onNext()
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleNext}>
            <h3 className="text-lg font-semibold">Certificados e Cursos Complementares</h3>

            {certificates.map((cert, index) => (
                <div key={index} className="space-y-2 border p-4 rounded-md">
                    <div>
                        <Label htmlFor={`nome-${index}`}>Nome do Curso/Certificado*</Label>
                        <Input
                            id={`nome-${index}`}
                            value={cert.nome}
                            onChange={(e) => handleChange(index, "nome", e.target.value)}
                            placeholder="Ex: Curso de UX Design"
                            className={errors[index]?.nome ? "border-red-500" : ""}
                        />
                        {errors[index]?.nome && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor={`entidade-${index}`}>Entidade Emissora*</Label>
                        <Input
                            id={`entidade-${index}`}
                            value={cert.entidade}
                            onChange={(e) => handleChange(index, "entidade", e.target.value)}
                            placeholder="Ex: Coursera, Udemy, etc."
                            className={errors[index]?.entidade ? "border-red-500" : ""}
                        />
                        {errors[index]?.entidade && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor={`dataInicio-${index}`}>Data de Início*</Label>
                        <Input
                            id={`dataInicio-${index}`}
                            type="date"
                            value={cert.dataInicio}
                            onChange={(e) => handleChange(index, "dataInicio", e.target.value)}
                            className={errors[index]?.dataInicio ? "border-red-500" : ""}
                        />
                        {errors[index]?.dataInicio && (
                            <p className="text-red-500 text-sm mt-1">
                                {!cert.dataInicio ? "Este campo é obrigatório" : "Data inválida"}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor={`dataConclusao-${index}`}>Data de Conclusão</Label>
                        <Input
                            id={`dataConclusao-${index}`}
                            type="date"
                            value={cert.dataConclusao}
                            onChange={(e) => handleChange(index, "dataConclusao", e.target.value)}
                            className={errors[index]?.dataConclusao ? "border-red-500" : ""}
                        />
                        {errors[index]?.dataConclusao && (
                            <p className="text-red-500 text-sm mt-1">
                                {!isValidDate(cert.dataConclusao) ? "Data inválida" : "A data de conclusão deve ser após a data de início"}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => removeCertificate(index)}
                        className="text-red-600 text-sm hover:underline"
                    >
                        Remover
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addCertificate}
                className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F]"
            >
                Adicionar Certificado/Curso
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