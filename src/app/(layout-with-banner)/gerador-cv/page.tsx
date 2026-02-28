/*
"use client"

import {useEffect, useState} from "react"
import {Banner} from "@/components/atoms/banner"
import {PersonalDataForm} from "@/components/template/GeradorCV/forms/PersonalDataForm"
import {ExperienceForm} from "@/components/template/GeradorCV/forms/ExperienceForm"
import {EducationForm} from "@/components/template/GeradorCV/forms/EducationForm"
import {SkillsForm} from "@/components/template/GeradorCV/forms/SkillsForm"
import {SummaryForm} from "@/components/template/GeradorCV/forms/SummaryForm"
import {LanguageForm} from "@/components/template/GeradorCV/forms/LanguageForm"
import {CertificatesForm} from "@/components/template/GeradorCV/forms/CertificatesForm"
import {ReferencesForm} from "@/components/template/GeradorCV/forms/ReferencesForm"
import {ProjectsForm} from "@/components/template/GeradorCV/forms/ProjectsForm"
import {LayoutsColumns} from "@/components/template/GeradorCV/forms/components";
import {Award, Brain, Briefcase, FileText, FolderOpen, GraduationCap, Handshake, Languages, User} from "lucide-react";
import {logDownloadCV} from "@/services/logDownloadCV";

const STORAGE_KEY = "cv_form_data"

export default function CVGeneratorPage() {

    const [openSection, setOpenSection] = useState<string | null>("personal")

    const [formData, setFormData] = useState({
        personal: {nome: "", email: "", telefone: "", endereco: "", socialMidia: "", foto: ""},
        summary: "",
        experience: [],
        education: [],
        skills: [],
        idiomas: [],
        references: [],
        projects: [],
        certificates: []
    })

    useEffect(() => {
        const storedData = localStorage.getItem(STORAGE_KEY)
        if (storedData) {
            setFormData(JSON.parse(storedData))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }, [formData])

    const updateFormData = (section: string, data: any) => {
        setFormData((prev) => ({...prev, [section]: data}))
    }

    const handleDownloadPDF = async () => {
        const element = document.getElementById("cv-preview");
        
        logDownloadCV({
            nome: formData.personal.nome,
            email: formData.personal.email,
            telefone: formData.personal.telefone,
            endereco: formData.personal.endereco
        })

        if (element) {
            const html2pdf = (await import("html2pdf.js")).default;

            const titles = element.querySelectorAll('h3');
            titles.forEach(el => el.style.paddingBottom = '10px');

            const opt = {
                margin: 0,
                filename: "meu-curriculo.pdf",
                image: {type: "jpeg", quality: 1},
                html2canvas: {scale: 4, useCORS: true},
                jsPDF: {unit: "in", format: "a4", orientation: "portrait"},
            };


            html2pdf().set(opt).from(element).toPdf().get('pdf').then(() => {
                titles.forEach(el => el.style.paddingBottom = '0px');
            }).save();
        }
    };

    const sections = [
        {
            key: "personal",
            title: "Dados Pessoais",
            icon: User,
            component: (
                <PersonalDataForm
                    data={formData.personal}
                    onChange={(data) => updateFormData("personal", data)}
                />
            ),
        },
        {
            key: "summary",
            title: "Resumo Profissional",
            icon: FileText,
            component: (
                <SummaryForm
                    data={formData.summary}
                    onChange={(data) => updateFormData("summary", data)}
                />
            ),
        },
        {
            key: "experience",
            title: "Experiência",
            icon: Briefcase,
            component: (
                <ExperienceForm
                    data={formData.experience}
                    onChange={(data) => updateFormData("experience", data)}
                />
            ),
        },

        {
            key: "education",
            title: "Formação Académica",
            icon: GraduationCap,
            component: (
                <EducationForm
                    data={formData.education}
                    onChange={(data) => updateFormData("education", data)}
                />
            ),
        },
        {
            key: "skills",
            title: "Competências",
            icon: Brain,
            component: (
                <SkillsForm
                    data={formData.skills}
                    onChange={(data) => updateFormData("skills", data)}
                />
            ),
        },

        {
            key: "idiomas",
            title: "Idiomas",
            icon: Languages,
            component: (
                <LanguageForm
                    data={formData.idiomas}
                    onChange={(data) => updateFormData("idiomas", data)}
                />
            ),
        },
        {
            key: "certificates",
            title: "Certificados",
            icon: Award,
            component: (
                <CertificatesForm
                    data={formData.certificates}
                    onChange={(data) => updateFormData("certificates", data)}
                />
            ),
        },
        {
            key: "references",
            title: "Referências",
            icon: Handshake,
            component: (
                <ReferencesForm
                    data={formData.references}
                    onChange={(data) => updateFormData("references", data)}
                />
            ),
        },
        {
            key: "projects",
            title: "Projetos",
            icon: FolderOpen,
            component: (
                <ProjectsForm
                    data={formData.projects}
                    onChange={(data) => updateFormData("projects", data)}
                />
            ),
        },
    ]

    return (
        <main>
            <Banner
                title="Orientacao"
                subTitle="Gerador de Curriculum Vitae"
                image="/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png"
            />

            <div className="flex flex-col md:flex-row gap-6 mt-6">

                {/!* FORMULÁRIO *!/}
                <div className="w-full md:w-1/2 bg-white p-6 rounded shadow">
                    <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
                        Gerador de Curriculum Vitae
                    </h1>

                    <div className="space-y-3">
                        {sections.map((section) => {
                            const Icon = section.icon

                            return (
                                <div key={section.key} className="border rounded shadow-sm">
                                    <button
                                        onClick={() =>
                                            setOpenSection(openSection === section.key ? null : section.key)
                                        }
                                        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-4 h-4 text-gray-600"/>
                                            <span className="font-medium">{section.title}</span>
                                        </div>

                                        <span>{openSection === section.key ? "▲" : "▼"}</span>
                                    </button>

                                    {openSection === section.key && (
                                        <div className="p-4 bg-white">
                                            {section.component}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Baixar PDF
                        </button>
                    </div>
                </div>

                {/!* PREVIEW DO CV *!/}
                <div className="w-full md:w-1/2 bg-white rounded shadow">

                    <div className="col-span-2">
                        <LayoutsColumns
                            formData={formData}
                            capitalization="uppercase"
                        />
                    </div>
                </div>
            </div>

        </main>
    )
}*/

"use client"

import {useEffect, useState} from "react"
import {LayoutsColumns} from "@/components/template/GeradorCV/forms/components"
import {Award, Brain, Briefcase, FileText, FolderOpen, GraduationCap, Handshake, Languages, User,} from "lucide-react"
import {Banner} from "@/components/atoms/banner";
import {CertificatesForm} from "@/components/template/GeradorCV/forms/CertificatesForm";
import {ReferencesForm} from "@/components/template/GeradorCV/forms/ReferencesForm";
import {ProjectsForm} from "@/components/template/GeradorCV/forms/ProjectsForm";
import {LanguageForm} from "@/components/template/GeradorCV/forms/LanguageForm";
import {SkillsForm} from "@/components/template/GeradorCV/forms/SkillsForm";
import {EducationForm} from "@/components/template/GeradorCV/forms/EducationForm";
import {ExperienceForm} from "@/components/template/GeradorCV/forms/ExperienceForm";
import {SummaryForm} from "@/components/template/GeradorCV/forms/SummaryForm";
import {PersonalDataForm} from "@/components/template/GeradorCV/forms/PersonalDataForm";
import {logDownloadCV} from "@/services/logDownloadCV";

const STORAGE_KEY = "cv_form_data"

export default function CVGeneratorPage() {
    const [openSection, setOpenSection] = useState<string | null>("personal")
    const [formData, setFormData] = useState({
        personal: {nome: "", email: "", telefone: "", endereco: "", socialMidia: "", foto: ""},
        summary: "",
        experience: [],
        education: [],
        skills: [],
        idiomas: [],
        references: [],
        projects: [],
        certificates: []
    })

    useEffect(() => {
        const storedData = localStorage.getItem(STORAGE_KEY)
        if (storedData) {
            setFormData(JSON.parse(storedData))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }, [formData])

    const updateFormData = (section: string, data: any) => {
        setFormData((prev) => ({...prev, [section]: data}))
    }

    const handleDownloadPDF = async () => {
        const element = document.getElementById("cv-preview");

        logDownloadCV({
            nome: formData.personal.nome,
            email: formData.personal.email,
            telefone: formData.personal.telefone,
            endereco: formData.personal.endereco
        })

        if (element) {
            const html2pdf = (await import("html2pdf.js")).default;

            const titles = element.querySelectorAll('h3');
            titles.forEach(el => el.style.paddingBottom = '10px');

            const opt = {
                margin: 0,
                filename: "meu-curriculo.pdf",
                image: {type: "jpeg", quality: 1},
                html2canvas: {scale: 4, useCORS: true},
                jsPDF: {unit: "in", format: "a4", orientation: "portrait"},
            };


            html2pdf().set(opt).from(element).toPdf().get('pdf').then(() => {
                titles.forEach(el => el.style.paddingBottom = '0px');
            }).save();
        }
    };

    const sections = [
        {
            key: "personal",
            title: "Dados Pessoais",
            icon: User,
            component: (
                <PersonalDataForm
                    data={formData.personal}
                    onChange={(data) => updateFormData("personal", data)}
                />
            ),
        },
        {
            key: "summary",
            title: "Resumo Profissional",
            icon: FileText,
            component: (
                <SummaryForm
                    data={formData.summary}
                    onChange={(data) => updateFormData("summary", data)}
                />
            ),
        },
        {
            key: "experience",
            title: "Experiência",
            icon: Briefcase,
            component: (
                <ExperienceForm
                    data={formData.experience}
                    onChange={(data) => updateFormData("experience", data)}
                />
            ),
        },

        {
            key: "education",
            title: "Formação Académica",
            icon: GraduationCap,
            component: (
                <EducationForm
                    data={formData.education}
                    onChange={(data) => updateFormData("education", data)}
                />
            ),
        },
        {
            key: "skills",
            title: "Competências",
            icon: Brain,
            component: (
                <SkillsForm
                    data={formData.skills}
                    onChange={(data) => updateFormData("skills", data)}
                />
            ),
        },

        {
            key: "idiomas",
            title: "Idiomas",
            icon: Languages,
            component: (
                <LanguageForm
                    data={formData.idiomas}
                    onChange={(data) => updateFormData("idiomas", data)}
                />
            ),
        },
        {
            key: "certificates",
            title: "Certificados",
            icon: Award,
            component: (
                <CertificatesForm
                    data={formData.certificates}
                    onChange={(data) => updateFormData("certificates", data)}
                />
            ),
        },
        {
            key: "references",
            title: "Referências",
            icon: Handshake,
            component: (
                <ReferencesForm
                    data={formData.references}
                    onChange={(data) => updateFormData("references", data)}
                />
            ),
        },
        {
            key: "projects",
            title: "Projetos",
            icon: FolderOpen,
            component: (
                <ProjectsForm
                    data={formData.projects}
                    onChange={(data) => updateFormData("projects", data)}
                />
            ),
        },
    ]

    return (
        <main>
            <Banner
                title="Orientacao"
                subTitle="Gerador de Curriculum Vitae"
                image="/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png"
            />

            <div className="flex flex-col md:flex-row gap-6 mt-6">
                {/* FORMULÁRIO */}
                <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
                        Gerador de Curriculum Vitae
                    </h2>

                    <div className="space-y-3">
                        {sections.map((section) => {
                            const Icon = section.icon

                            return (
                                <div key={section.key} className="border rounded-lg shadow-sm overflow-hidden">
                                    <button
                                        onClick={() =>
                                            setOpenSection(openSection === section.key ? null : section.key)
                                        }
                                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-4 h-4 text-indigo-600"/>
                                            <span className="font-medium text-gray-700">{section.title}</span>
                                        </div>

                                        <span className="text-gray-400">
                                                {openSection === section.key ? "▲" : "▼"}
                                            </span>
                                    </button>

                                    {openSection === section.key && (
                                        <div className="p-4 bg-white">
                                            {section.component}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Baixar PDF
                        </button>
                    </div>
                </div>

                {/* PREVIEW DO CV (só aparece em desktop) */}
                <div className="hidden md:block w-full md:w-1/2 bg-white rounded-lg shadow overflow-hidden">
                    <LayoutsColumns formData={formData} capitalization="uppercase" onDownload={handleDownloadPDF}/>
                </div>
            </div>

            {/* Em mobile, o LayoutsColumns renderiza o botão "Previsualizar" fixo */}
            <div className="md:hidden">
                <LayoutsColumns formData={formData} capitalization="uppercase" onDownload={handleDownloadPDF}/>
            </div>
        </main>
    )
}
