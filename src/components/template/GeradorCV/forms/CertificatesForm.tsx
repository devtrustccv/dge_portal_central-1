"use client"

import {useEffect, useState} from "react"
import {Label} from "@/components/atoms/label"
import {Input} from "@/components/atoms/input"
import {Trash2} from "lucide-react";
import {AlertConfirmacao} from "@/app/(layout-with-banner)/gerador-cv/AlertConfirmacao";
import {Certificate} from "@/services/ofertas/getAllOfertas/type";

type CertificatesFormProps = {
    data: Certificate[] | undefined
    onChange: (data: Certificate[]) => void
    onNext?: () => void
    onBack?: () => void
}

export function CertificatesForm({data, onChange, onNext, onBack}: CertificatesFormProps) {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    console.log("========================");
    console.log({CertificatesForm: data});
    console.log("========================");
    const [errors, setErrors] = useState<Array<{
        nome: boolean
        entidade: boolean
        dataInicio: boolean
        dataConclusao: boolean
    }>>([])
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    useEffect(() => {
        const safeData = data || []
        setCertificates(safeData)
        setErrors(safeData.map(() => ({nome: false, entidade: false, dataInicio: false, dataConclusao: false})))
        if (safeData.length > 0) setExpandedIndex(safeData.length - 1)
    }, [data])

    const handleChange = (index: number, field: keyof Certificate, value: string) => {
        const updated = [...certificates]
        updated[index][field] = value
        setCertificates(updated)
        onChange(updated)

        if (errors[index]?.[field]) {
            const newErrors = [...errors]
            newErrors[index] = {...newErrors[index], [field]: false}
            setErrors(newErrors)
        }
    }

    const addCertificate = () => {
        const updated = [...certificates, {nome: "", entidade: "", dataInicio: "", dataConclusao: ""}]
        setCertificates(updated)
        onChange(updated)
        setErrors([...errors, {nome: false, entidade: false, dataInicio: false, dataConclusao: false}])
        setExpandedIndex(updated.length - 1)
    }

    const removeCertificate = (index: number) => {
        const updated = certificates.filter((_, i) => i !== index)
        setCertificates(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)

        if (expandedIndex === index) {
            setExpandedIndex(updated.length > 0 ? updated.length - 1 : null)
        }
    }

    const isValidDate = (dateString: string) => {
        if (!dateString) return false
        return !isNaN(Date.parse(dateString))
    }

    const validateForm = () => {
        if (certificates.length === 0) return true

        const newErrors = certificates.map(cert => ({
            nome: !cert.nome.trim(),
            entidade: !cert?.entidade?.trim(),
            dataInicio: !cert.dataInicio || !isValidDate(cert.dataInicio),
            dataConclusao: cert.dataConclusao ?
                (!isValidDate(cert.dataConclusao) || new Date(cert.dataConclusao) < new Date(cert.dataInicio || "")) : false
        }))

        setErrors(newErrors)
        return !newErrors.some(err => err.nome || err.entidade || err.dataInicio || err.dataConclusao)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm() && onNext) onNext()
    }

    return (
        <form className="space-y-4" onSubmit={handleNext}>
            <h3 className="text-lg font-semibold">Certificados e Cursos Complementares</h3>

            {certificates.map((cert, index) => {
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
                                    <div>
                                        <p className="font-semibold">
                                            {cert.nome || "Nome do Certificado"} -
                                            <span
                                                className="text-sm font-medium text-gray-500">
                                        {cert.entidade || "Entidade não definida"}
                                    </span>
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
                                        <Label>Nome do Curso/Certificado*</Label>
                                        <Input
                                            value={cert.nome}
                                            onChange={(e) => handleChange(index, "nome", e.target.value)}
                                            placeholder="Ex: Curso de UX Design"
                                            className={errors[index]?.nome ? "border-red-500" : ""}
                                        />
                                    </div>

                                    <div>
                                        <Label>Entidade Emissora*</Label>
                                        <Input
                                            value={cert.entidade}
                                            onChange={(e) => handleChange(index, "entidade", e.target.value)}
                                            placeholder="Ex: Coursera, Udemy"
                                            className={errors[index]?.entidade ? "border-red-500" : ""}
                                        />
                                    </div>

                                    <div>
                                        <Label>Data de Início*</Label>
                                        <Input
                                            type="date"
                                            value={cert.dataInicio}
                                            onChange={(e) => handleChange(index, "dataInicio", e.target.value)}
                                            className={errors[index]?.dataInicio ? "border-red-500" : ""}
                                        />
                                    </div>

                                    <div>
                                        <Label>Data de Conclusão</Label>
                                        <Input
                                            type="date"
                                            value={cert.dataConclusao}
                                            onChange={(e) => handleChange(index, "dataConclusao", e.target.value)}
                                            className={errors[index]?.dataConclusao ? "border-red-500" : ""}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <AlertConfirmacao
                            open={open}
                            setOpen={setOpen}
                            title={'Deseja remover este certificado?'}
                            onConfirm={async () => {
                                if (selectedIndex !== null) {
                                    removeCertificate(selectedIndex)
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
