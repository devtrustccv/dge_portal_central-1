"use client"

import { useState, useEffect } from "react"

type Reference = {
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

export const ReferencesForm = ({ data, onChange, onNext, onBack }: Props) => {
    const [references, setReferences] = useState<Reference[]>([])
    const [errors, setErrors] = useState<Array<{
        nome: boolean
        empresa: boolean
        cargo: boolean
        telefone: boolean
        email: boolean
    }>>([])

    useEffect(() => {
        setReferences(data || [])
        setErrors((data || []).map(() => ({
            nome: false,
            empresa: false,
            cargo: false,
            telefone: false,
            email: false
        })))
    }, [data])

    const handleChange = (index: number, field: keyof Reference, value: string) => {
        const updated = [...references]
        updated[index][field] = value
        setReferences(updated)
        onChange(updated)

        // Clear error when user types
        if (errors[index]?.[field]) {
            const newErrors = [...errors]
            newErrors[index] = { ...newErrors[index], [field]: false }
            setErrors(newErrors)
        }
    }

    const addReference = () => {
        const updated = [...references, { nome: "", empresa: "", cargo: "", telefone: "", email: "" }]
        setReferences(updated)
        onChange(updated)
        setErrors([...errors, { nome: false, empresa: false, cargo: false, telefone: false, email: false }])
    }

    const removeReference = (index: number) => {
        const updated = references.filter((_, i) => i !== index)
        setReferences(updated)
        onChange(updated)
        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)
    }

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const isValidPhone = (phone: string) => {
        return /^[\d\s+-]+$/.test(phone)
    }

    const validateForm = () => {
        if (references.length === 0) return true // Permite avançar sem referências

        const newErrors = references.map(ref => ({
            nome: !ref.nome.trim(),
            empresa: !ref.empresa.trim(),
            cargo: !ref.cargo.trim(),
            telefone: !ref.telefone.trim() || !isValidPhone(ref.telefone),
            email: !ref.email.trim() || !isValidEmail(ref.email)
        }))

        setErrors(newErrors)

        // Verifica se todas as referências estão válidas
        return !newErrors.some(err => err.nome || err.empresa || err.cargo || err.telefone || err.email)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && onNext) {
            onNext()
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleNext}>
            <h2 className="text-xl font-semibold mb-4">Referências</h2>

            {references.map((ref, index) => (
                <div key={index} className="space-y-2 mb-6 border-b pb-4">
                    <div>
                        <label className="block font-medium">Nome da Pessoa*</label>
                        <input
                            type="text"
                            value={ref.nome}
                            onChange={(e) => handleChange(index, "nome", e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${errors[index]?.nome ? "border-red-500" : ""}`}
                        />
                        {errors[index]?.nome && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Empresa/Instituição*</label>
                        <input
                            type="text"
                            value={ref.empresa}
                            onChange={(e) => handleChange(index, "empresa", e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${errors[index]?.empresa ? "border-red-500" : ""}`}
                        />
                        {errors[index]?.empresa && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Cargo*</label>
                        <input
                            type="text"
                            value={ref.cargo}
                            onChange={(e) => handleChange(index, "cargo", e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${errors[index]?.cargo ? "border-red-500" : ""}`}
                        />
                        {errors[index]?.cargo && (
                            <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Telefone*</label>
                        <input
                            type="text"
                            value={ref.telefone}
                            onChange={(e) => handleChange(index, "telefone", e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${errors[index]?.telefone ? "border-red-500" : ""}`}
                            placeholder="Ex: +238 123 4567"
                        />
                        {errors[index]?.telefone && (
                            <p className="text-red-500 text-sm mt-1">
                                {!ref.telefone.trim() ? "Este campo é obrigatório" : "Formato inválido"}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Email*</label>
                        <input
                            type="email"
                            value={ref.email}
                            onChange={(e) => handleChange(index, "email", e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${errors[index]?.email ? "border-red-500" : ""}`}
                            placeholder="Ex: exemplo@email.com"
                        />
                        {errors[index]?.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {!ref.email.trim() ? "Este campo é obrigatório" : "Email inválido"}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => removeReference(index)}
                        className="text-red-600 mt-2 hover:underline"
                    >
                        Remover
                    </button>
                </div>
            ))}

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