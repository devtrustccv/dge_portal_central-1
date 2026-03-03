"use client"

import {Label} from "@/components/atoms/label"
import {Input} from "@/components/atoms/input"
import {useEffect, useState} from "react"
import {Personal} from "@/services/get-curriculo-cv/type";

type PersonalDataFormProps = {
    data: Personal | undefined
    onChange: (data: any) => void
    onNext?: () => void
    onBack?: () => void
}

export function PersonalDataForm({data, onChange, onNext, onBack}: PersonalDataFormProps) {
    const [formState, setFormState] = useState({
        nome: "",
        socialMidia: "",
        email: "",
        telefone: "",
        endereco: "",
        foto: ""
    })

    // Guarda os dados da API sem sobrescrever formState
    const [defaultData, setDefaultData] = useState<typeof formState | null>(null)

    const [errors, setErrors] = useState({
        nome: false,
        email: false,
        telefone: false,
        endereco: false
    })

    // Atualiza apenas defaultData com valores da API
    useEffect(() => {
        if (data) {
            setDefaultData({
                nome: data.nome || "",
                socialMidia: data.socialMidia || "",
                email: data.email || "",
                telefone: data.telefone || "",
                endereco: data.endereco || "",
                foto: data.foto || ""
            })
        }
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target
        const updated = {...formState, [id]: value}
        setFormState(updated)
        onChange(updated)

        // Limpa erro ao digitar
        if (errors[id as keyof typeof errors] && value.trim()) {
            setErrors(prev => ({...prev, [id]: false}))
        }
    }

    const validateForm = () => {
        const newErrors = {
            nome: !(formState.nome || defaultData?.nome)?.trim(),
            email: !(formState.email || defaultData?.email)?.trim(),
            telefone: !(formState.telefone || defaultData?.telefone)?.trim(),
            endereco: !(formState.endereco || defaultData?.endereco)?.trim()
        }

        setErrors(newErrors)
        return !Object.values(newErrors).some(error => error)
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm() && onNext) {
            onNext()
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleNext}>
            <div>
                <Label htmlFor="foto">Foto de Perfil</Label>
                <Input
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                                const base64 = reader.result as string
                                const updated = {...formState, foto: base64}
                                setFormState(updated)
                                onChange(updated)
                            }
                            reader.readAsDataURL(file)
                        }
                    }}
                />
                {(formState.foto || defaultData?.foto) && (
                    <img
                        src={defaultData?.foto || formState.foto}
                        alt="Foto de perfil"
                        className="mt-2 h-24 w-24 object-cover rounded-full"
                    />
                )}

                <Label htmlFor="nome">Nome Completo*</Label>
                <Input
                    required
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={defaultData?.nome || formState.nome}
                    onChange={handleChange}
                    className={errors.nome ? "border-red-500" : ""}
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">Por favor, preencha seu nome</p>}
            </div>

            <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                    required
                    id="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    value={defaultData?.email || formState.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">Por favor, preencha seu email</p>}
            </div>

            <div>
                <Label htmlFor="telefone">Telefone*</Label>
                <Input
                    id="telefone"
                    type="tel"
                    placeholder="+238 900 0000"
                    value={defaultData?.telefone || formState.telefone}
                    onChange={handleChange}
                    className={errors.telefone ? "border-red-500" : ""}
                />
                {errors.telefone && <p className="text-red-500 text-sm mt-1">Por favor, preencha seu telefone</p>}
            </div>

            <div>
                <Label htmlFor="endereco">Endereço*</Label>
                <Input
                    id="endereco"
                    type="text"
                    placeholder="Cidade, Bairro, Rua..."
                    value={defaultData?.endereco || formState.endereco}
                    onChange={handleChange}
                    className={errors.endereco ? "border-red-500" : ""}
                />
                {errors.endereco && <p className="text-red-500 text-sm mt-1">Por favor, preencha seu endereço</p>}
            </div>

            <div>
                <Label htmlFor="socialMidia">LinkedIn / Website Pessoal</Label>
                <Input
                    id="socialMidia"
                    type="text"
                    placeholder="http://"
                    value={defaultData?.socialMidia || formState.socialMidia}
                    onChange={handleChange}
                />
            </div>

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
                        disabled={!(formState.nome || defaultData?.nome) ||
                            !(formState.email || defaultData?.email) ||
                            !(formState.telefone || defaultData?.telefone) ||
                            !(formState.endereco || defaultData?.endereco)}
                    >
                        Avançar
                    </button>
                )}
            </div>
        </form>
    )
}