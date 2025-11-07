"use client"

import { Label } from "@/components/atoms/label"
import { Textarea } from "@/components/atoms/textarea"
import { useEffect, useState } from "react"

type SummaryFormProps = {
    data: string
    onChange: (data: string) => void
    onNext?: () => void
    onBack?: () => void
}

export function SummaryForm({ data, onChange, onNext, onBack }: SummaryFormProps) {
    const [summary, setSummary] = useState("")

    useEffect(() => {
        setSummary(data || "")
    }, [data])

    const handleChange = (value: string) => {
        setSummary(value)
        onChange(value)
    }

    return (
        <div className="space-y-4">
            <Label htmlFor="summary">Objetivos Profissional</Label>
            <Textarea
                id="summary"
                placeholder="Fale brevemente sobre você, suas competências e objetivos profissionais."
                value={summary}
                onChange={(e) => handleChange(e.target.value)}
                rows={6}
            />
            <div className="flex justify-between mt-6">
                {onBack && (
                    <button onClick={onBack} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                        Voltar
                    </button>
                )}
                {onNext && (
                    <button onClick={onNext} className="bg-[#2BB071] text-white px-4 py-2 rounded hover:bg-[#23995F]">
                        Avançar
                    </button>
                )}
            </div>
        </div>
    )
}
