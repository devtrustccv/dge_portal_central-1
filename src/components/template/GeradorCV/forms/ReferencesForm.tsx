"use client"

import {useEffect, useState} from "react"
import {Trash2} from "lucide-react";
import {AlertConfirmacao} from "@/app/(layout-with-banner)/gerador-cv/AlertConfirmacao";

export type Reference = {
    nome: string
    empresa: string
    cargo: string
    telefone: string
    email: string
}

type Props = {
    data: Reference[]
    onChange: (data: Reference[]) => void
    onNext?: () => void
    onBack?: () => void
}

export const ReferencesForm = ({data, onChange, onNext, onBack}: Props) => {
    const [references, setReferences] = useState<Reference[]>([])
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const [errors, setErrors] = useState<Array<{
        nome: boolean
        empresa: boolean
        cargo: boolean
        telefone: boolean
        email: boolean
    }>>([])
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    useEffect(() => {
        const safeData = data || []
        setReferences(safeData)
        setErrors(safeData.map(() => ({
            nome: false,
            empresa: false,
            cargo: false,
            telefone: false,
            email: false
        })))
        if (safeData.length > 0) setExpandedIndex(safeData.length - 1)
    }, [data])

    const handleChange = (index: number, field: keyof Reference, value: string) => {
        const updated = [...references]
        updated[index][field] = value
        setReferences(updated)
        onChange(updated)

        if (errors[index]?.[field]) {
            const newErrors = [...errors]
            newErrors[index] = {...newErrors[index], [field]: false}
            setErrors(newErrors)
        }
    }

    const addReference = () => {
        const updated = [...references, {nome: "", empresa: "", cargo: "", telefone: "", email: ""}]
        setReferences(updated)
        onChange(updated)
        setErrors([...errors, {nome: false, empresa: false, cargo: false, telefone: false, email: false}])
        setExpandedIndex(updated.length - 1)
    }

    const removeReference = (index: number) => {
        const updated = references.filter((_, i) => i !== index)
        setReferences(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)

        if (expandedIndex === index) {
            setExpandedIndex(updated.length > 0 ? updated.length - 1 : null)
        }
    }

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isValidPhone = (phone: string) => /^[\d\s+-]+$/.test(phone)

    const validateForm = () => {
        if (references.length === 0) return true

        const newErrors = references.map(ref => ({
            nome: !ref.nome.trim(),
            empresa: !ref.empresa.trim(),
            cargo: !ref.cargo.trim(),
            telefone: !ref.telefone.trim() || !isValidPhone(ref.telefone),
            email: !ref.email.trim() || !isValidEmail(ref.email)
        }))

        setErrors(newErrors)
        return !newErrors.some(err => err.nome || err.empresa || err.cargo || err.telefone || err.email)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm() && onNext) onNext()
    }

    return (
        <form className="space-y-4" onSubmit={handleNext}>
            <h2 className="text-xl font-semibold mb-4">Referências</h2>

            {references.map((ref, index) => {
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
                                    <div className='flex justify-center items-center gap-1'>
                                        <p className="font-semibold">{ref.nome || "Nome da Pessoa"}</p> -
                                        <span
                                            className="text-sm font-medium text-gray-500">{ref.empresa || "Empresa/Instituição"}</span>
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
                                        <label className="block font-medium">Nome da Pessoa*</label>
                                        <input
                                            type="text"
                                            value={ref.nome}
                                            onChange={(e) => handleChange(index, "nome", e.target.value)}
                                            className={`w-full border rounded px-3 py-2 ${errors[index]?.nome ? "border-red-500" : ""}`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium">Empresa/Instituição*</label>
                                        <input
                                            type="text"
                                            value={ref.empresa}
                                            onChange={(e) => handleChange(index, "empresa", e.target.value)}
                                            className={`w-full border rounded px-3 py-2 ${errors[index]?.empresa ? "border-red-500" : ""}`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium">Cargo*</label>
                                        <input
                                            type="text"
                                            value={ref.cargo}
                                            onChange={(e) => handleChange(index, "cargo", e.target.value)}
                                            className={`w-full border rounded px-3 py-2 ${errors[index]?.cargo ? "border-red-500" : ""}`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium">Telefone*</label>
                                        <input
                                            type="text"
                                            value={ref.telefone}
                                            onChange={(e) => handleChange(index, "telefone", e.target.value)}
                                            placeholder="Ex: +238 123 4567"
                                            className={`w-full border rounded px-3 py-2 ${errors[index]?.telefone ? "border-red-500" : ""}`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium">Email*</label>
                                        <input
                                            type="email"
                                            value={ref.email}
                                            onChange={(e) => handleChange(index, "email", e.target.value)}
                                            placeholder="Ex: exemplo@email.com"
                                            className={`w-full border rounded px-3 py-2 ${errors[index]?.email ? "border-red-500" : ""}`}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <AlertConfirmacao
                            open={open}
                            setOpen={setOpen}
                            title={'Deseja remover esta referência?'}
                            onConfirm={async () => {
                                if (selectedIndex !== null) {
                                    removeReference(selectedIndex)
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
                onClick={addReference}
                className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F]"
            >
                Adicionar Referência
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
