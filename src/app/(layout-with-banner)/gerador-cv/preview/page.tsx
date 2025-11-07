"use client"

import { useEffect, useState } from "react"
import {Banner} from "@/components/atoms/banner";

const STORAGE_KEY = "cv_form_data"

export default function CVPreviewPage() {
    const [formData, setFormData] = useState<any>(null)

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            setFormData(JSON.parse(stored))
        }
    }, [])

    if (!formData) return <p className="p-6">Carregando...</p>

    return (
        <main >
            <Banner title={"Preview"} subTitle={"Curriculun Vitae"} image={"/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png"}/>

            <div className="mt-4 mb-4 p-8 max-w-3xl mx-auto bg-white shadow-md rounded">


            <h1 className="text-2xl font-bold text-[#2BB071] mb-6">Curriculum Vitae</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold">Dados Pessoais</h2>
                <p><strong>Nome:</strong> {formData.personal?.name}</p>
                <p><strong>Email:</strong> {formData.personal?.email}</p>
                <p><strong>Telefone:</strong> {formData.personal?.phone}</p>
                <p><strong>LinkedIn:</strong> {formData.personal?.linkedin}</p>
                <p><strong>GitHub:</strong> {formData.personal?.github}</p>
            </section>

            {formData.experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold">Experiência</h2>
                    {formData.experience.map((exp: any, i: number) => (
                        <div key={i} className="mb-2">
                            <p className="font-medium">{exp.cargo} — {exp.empresa}</p>
                            <p className="text-sm text-gray-600">{exp.periodo}</p>
                            <p className="text-sm">{exp.descricao}</p>
                        </div>
                    ))}
                </section>
            )}

            {formData.education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold">Educação</h2>
                    {formData.education.map((edu: any, i: number) => (
                        <div key={i}>
                            <p className="font-medium">{edu.curso}</p>
                            <p className="text-sm">{edu.instituicao}</p>
                            <p className="text-sm">{edu.periodo}</p>
                        </div>
                    ))}
                </section>
            )}

            {formData.skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold">Competências</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills.map((s: string, i: number) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </section>
            )}

            {formData.summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold">Resumo</h2>
                    <p>{formData.summary}</p>
                </section>
            )}
            </div>
        </main>
    )
}
