/*
"use client"

import { useEffect, useState } from "react"
import { StepIndicator } from "@/components/template/GeradorCV/StepIndicator"
import { PersonalDataForm } from "@/components/template/GeradorCV/forms/PersonalDataForm"
import { ExperienceForm } from "@/components/template/GeradorCV/forms/ExperienceForm"
import { EducationForm } from "@/components/template/GeradorCV/forms/EducationForm"
import { SkillsForm } from "@/components/template/GeradorCV/forms/SkillsForm"
import { SummaryForm } from "@/components/template/GeradorCV/forms/SummaryForm"
import { Banner } from "@/components/atoms/banner"
import {LanguageForm} from "@/components/template/GeradorCV/forms/LanguageForm";
import {CertificatesForm} from "@/components/template/GeradorCV/forms/CertificatesForm";
import {ReferencesForm} from "@/components/template/GeradorCV/forms/ReferencesForm";
import {ProjectsForm} from "@/components/template/GeradorCV/forms/ProjectsForm";
import {MdEmail, MdLocationCity, MdPhone} from "react-icons/md";
import {IoMdGlobe} from "react-icons/io";
import {AiFillLinkedin} from "react-icons/ai";

const STORAGE_KEY = "cv_form_data"

export default function CVGeneratorPage() {

    const handleDownloadPDF = async () => {
        const element = document.getElementById("cv-preview")
        if (element) {
            const html2pdf = (await import("html2pdf.js")).default

            html2pdf()
                .set({
                    margin: 0,
                    filename: "meu-curriculo.pdf",
                    image: { type: "jpeg", quality: 1 },
                    html2canvas: { scale: 4 },
                    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
                })
                .from(element)
                .save()
        }
    }


    const [currentStep, setCurrentStep] = useState(1)

    const [formData, setFormData] = useState({
        personal: { nome: "", email: "", telefone: "", endereco: "", socialMidia: "", foto: ""},
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
        setFormData((prev) => ({ ...prev, [section]: data }))
    }

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 9))
    }

    const previousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const renderForm = () => {
/!*
        const propsBase = { formData, updateFormData, onNext: nextStep, onBack: previousStep }
*!/
        switch (currentStep) {
            case 1:
                return <PersonalDataForm data={formData.personal} onChange={(data) => updateFormData("personal", data)} onNext={nextStep} />
            case 2:
                return <SummaryForm data={formData.summary} onChange={(data) => updateFormData("summary", data)} onNext={nextStep} onBack={previousStep} />
            case 3:
                return <ExperienceForm data={formData.experience} onChange={(data) => updateFormData("experience", data)} onNext={nextStep} onBack={previousStep} />
            case 4:
                return <EducationForm data={formData.education} onChange={(data) => updateFormData("education", data)} onNext={nextStep} onBack={previousStep} />
            case 5:
                return <SkillsForm data={formData.skills} onChange={(data) => updateFormData("skills", data)} onNext={nextStep} onBack={previousStep} />
            case 6:
                return <LanguageForm data={formData.idiomas} onChange={(data) => updateFormData("idiomas", data)} onNext={nextStep} onBack={previousStep} />
            case 7:
                return <CertificatesForm data={formData.certificates} onChange={(data) => updateFormData("certificates", data)} onNext={nextStep} onBack={previousStep} />
            case 8:
                return <ReferencesForm data={formData.references} onChange={(data) => updateFormData("references", data)} onNext={nextStep} onBack={previousStep} />
            case 9:
                return <ProjectsForm data={formData.projects} onChange={(data) => updateFormData("projects", data)} onBack={previousStep} />
             default:
                return null
        }
    }

    return (
        <main>
            <Banner
                title={"Orientacao"}
                subTitle={"Gerador de Curriculum Vitae"}
                image={"/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png"}
            />
            <div className="flex flex-col md:flex-row gap-6 mt-6">
                {/!* Formulário *!/}
                <div className="w-full md:w-1/2 bg-white p-6 rounded shadow">
                    <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">Gerador de Curriculum
                        Vitae</h1>
                    <StepIndicator currentStep={currentStep}/>
                    <div className="mt-4">{renderForm()}</div>
                    {currentStep === 9 && (
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                onClick={handleDownloadPDF}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Baixar PDF
                            </button>
                        </div>
                    )}
                </div>

                {/!* Visualização do CV *!/}
                <div
                    className={`w-full h-[1123px] md:w-1/2 bg-white rounded shadow ${currentStep === 9 ? "block" : "hidden md:block"}`}
                    id="cv-preview">
                    <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/!* Coluna lateral *!/}
                        <div className="col-span-1 bg-gray-100 p-4 rounded space-y-4">
                            {formData.personal.foto && (
                                <img src={formData.personal.foto} alt="Foto de perfil"
                                     className="w-24 h-24 mt-4 rounded-full object-cover mx-auto"/>
                            )}
                            {formData.personal.nome && (
                                <div className="text-center">
                                    <h2 className="text-lg font-semibold">{formData.personal.nome}</h2>
                                    <div className="flex gap-2 items-center mt-4">
                                        <MdEmail className="text-gray-600"/>
                                        <p className="text-sm text-gray-600">{formData.personal.email}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <MdPhone className="text-gray-600"/>
                                        <p className="text-sm text-gray-600">{formData.personal.telefone}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <MdLocationCity className="text-gray-600"/>
                                        <p className="text-sm text-gray-600">{formData.personal.endereco}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        {/!*<IoMdGlobe/>*!/}<AiFillLinkedin className="text-gray-600"/>
                                        <a href={formData.personal.socialMidia} className="text-sm text-gray-600 underline">LinkedLin</a>
                                    </div>

                                </div>
                            )}

                            {formData.skills.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-700 mb-1">Competências</h3>
                                    <ul className="list-disc list-inside text-sm">
                                        {formData.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                                    </ul>
                                </div>
                            )}
                            {formData.idiomas.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-gray-700 mb-1">Idiomas</h3>
                                    <ul className="list-disc list-inside text-sm">
                                        {formData.idiomas.map((idioma: any, i: number) => <li
                                            key={i}>{idioma.idioma} - {idioma.nivel}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/!* Coluna principal *!/}
                        <div className="col-span-2 space-y-4 mt-4">
                            {formData.experience.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-600  pb-1">Experiência</h3>
                                    {formData.experience.map((exp: any, i: number) => (
                                        <div key={i} className="text-sm border-l pl-1">
                                            <p className="font-medium">{exp.cargo} - {exp.empresa}</p>
                                            <p className="text-gray-600">{exp.local} | {exp.dataInicio} a {exp.dataFim}</p>
                                            <p>{exp.descricao}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {formData.education.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-600 pb-1">Formação Académica</h3>
                                    {formData.education.map((edu: any, i: number) => (
                                        <div key={i} className="text-sm border-l pl-1">
                                            <p className="font-medium">{edu.curso} - {edu.instituicao}</p>
                                            <p className="text-gray-600">{edu.dataInicio} a {edu.dataFim}</p>
                                            <p className="text-gray-600">{edu.observacoes}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {formData.projects.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-600 pb-1">Projetos</h3>
                                    {formData.projects.map((proj: any, index: number) => (
                                        <div key={index} className="text-sm border-l pl-1">
                                            <p className="font-medium">{proj.nome}</p>
                                            <p>{proj.descricao}</p>
                                            {proj.link && <a href={proj.link} className="text-blue-600 text-sm"
                                                             target="_blank">{proj.link}</a>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {formData.certificates.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-600 pb-1">Certificados</h3>
                                    {formData.certificates.map((cert: any, i: number) => (
                                        <div key={i} className="text-sm border-l pl-1">
                                            <p className="font-medium">{cert.nome}</p>
                                            <p>{cert.entidade} - {cert.dataInicio} a {cert.dataConclusao}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {formData.references.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-600 pb-1">Referências</h3>
                                    {formData.references.map((ref: any, i: number) => (
                                        <div key={i} className="text-sm border-l-[0.1px] pl-1">
                                            <p className="font-medium">{ref.nome} - {ref.empresa}</p>
                                            <p>{ref.cargo} | {ref.email} | {ref.telefone}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {formData.summary && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-600 pb-1">Resumo
                                        Profissional</h3>
                                    <p className="text-sm border-l-[0.1px] pl-1">{formData.summary}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
*/
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
        const element = document.getElementById("cv-preview")
        if (element) {
            const html2pdf = (await import("html2pdf.js")).default

            html2pdf()
                .set({
                    margin: 0,
                    filename: "meu-curriculo.pdf",
                    image: {type: "jpeg", quality: 1},
                    html2canvas: {scale: 4},
                    jsPDF: {unit: "in", format: "a4", orientation: "portrait"},
                })
                .from(element)
                .save()
        }
    }

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

                {/* PREVIEW DO CV */}
                <div className="w-full md:w-1/2 bg-white rounded shadow">
                    {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                         COLUNA LATERAL
                        <div className="bg-gray-100 p-4 rounded space-y-4">
                            {formData.personal.foto && (
                                <img
                                    src={formData.personal.foto}
                                    alt="Foto"
                                    className="w-24 h-24 rounded-full object-cover mx-auto"
                                />
                            )}

                            {formData.personal.nome && (
                                <div className="text-center">
                                    <h2 className="text-lg font-semibold">
                                        {formData.personal.nome}
                                    </h2>

                                    <div className="flex gap-2 items-center mt-4 mb-2">
                                        <div className='border border-gray-500 rounded-full p-1'>
                                            <MdEmail/>
                                        </div>
                                        <p className="text-sm">{formData.personal.email}</p>
                                    </div>

                                    <div className="flex gap-2 items-center mb-2">
                                        <div className='border border-gray-500 rounded-full p-1'>
                                            <MdPhone/>
                                        </div>
                                        <p className="text-sm">{formData.personal.telefone}</p>
                                    </div>

                                    <div className="flex gap-2 items-center mb-2">
                                        <div className='border border-gray-500 rounded-full p-1'>

                                            <MdLocationCity/>
                                        </div>
                                        <p className="text-sm">{formData.personal.endereco}</p>
                                    </div>

                                    {formData.personal.socialMidia && (
                                        <div className="flex gap-2 items-center mb-2">
                                            <div className='border border-gray-500 rounded-full p-1'>

                                                <AiFillLinkedin/>
                                            </div>
                                            <a
                                                href={formData.personal.socialMidia}
                                                className="text-sm underline"
                                                target="_blank"
                                            >
                                                LinkedIn
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            {formData.skills.length > 0 && (
                                <div>
                                    <div className="flex gap-2 items-center mb-2">
                                        <div className='border border-gray-500 rounded-full p-1'>
                                            <Brain className='w-4 h-4 text-gray-500'/>
                                        </div>
                                        <h3 className="font-bold">Competências</h3>
                                    </div>
                                    <ul className="list-disc list-inside text-sm">
                                        {formData.skills.map((skill, i) => (
                                            <li key={i}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {formData.idiomas.length > 0 && (
                                <div>
                                    <div className="flex gap-2 items-center mb-2">
                                        <div className='border border-gray-500 rounded-full p-1'>
                                            <MdLanguage className='w-4 h-4'/>
                                        </div>
                                        <h3 className="font-bold">Idiomas</h3>
                                    </div>
                                    <ul className="list-disc list-inside text-sm">
                                        {formData.idiomas.map((idioma: any, i) => (
                                            <li key={i}>
                                                {idioma.idioma} - {idioma.nivel}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                         COLUNA PRINCIPAL
                        <div className="col-span-2 space-y-4">

                            {formData.summary && (
                                <div className='flex flex-col gap-4'>
                                    <div className='bg-[#f3f3f3] flex gap-2 justify-center items-center'>
                                        <FileText className='w-4 h-4'/>
                                        <h3 className="font-bold text-[#626262]">Resumo Profissional</h3>
                                    </div>
                                    <p className="text-sm">{formData.summary}</p>
                                </div>
                            )}

                            {formData.experience.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <div className='bg-[#f3f3f3] flex gap-2 justify-center items-center'>
                                        <Activity className='w-4 h-4'/>
                                        <h3 className="font-bold text-[#626262]">Experiência</h3>
                                    </div>
                                    {formData.experience.map((exp: any, i) => (
                                        <div key={i} className="text-sm">
                                            <p className="font-semibold">
                                                {exp.cargo} - {exp.empresa}
                                            </p>
                                            <p>
                                                {exp.local} | {exp.dataInicio} a {exp.dataFim}
                                            </p>
                                            <p>{exp.descricao}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {formData.education.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <div className='bg-[#f3f3f3] flex gap-2 justify-center items-center'>
                                        <School className='w-4 h-4'/>
                                        <h3 className="font-bold text-[#626262]">Formação Académica</h3>
                                    </div>
                                    {formData.education.map((edu: any, i) => (
                                        <div key={i} className="text-sm">
                                            <p className="font-semibold">
                                                {edu.curso} - {edu.instituicao}
                                            </p>
                                            <p>
                                                {edu.dataInicio} a {edu.dataFim}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {formData.projects.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <div className='bg-[#f3f3f3] flex gap-2 justify-center items-center'>
                                        <FolderOpen className='w-4 h-4'/>
                                        <h3 className="font-bold text-[#626262]">Projetos</h3>
                                    </div>
                                    {formData.projects.map((proj: any, i) => (
                                        <div key={i} className="text-sm">
                                            <p className="font-semibold">{proj.nome}</p>
                                            <p>{proj.descricao}</p>
                                            {proj.link && (
                                                <a
                                                    href={proj.link}
                                                    target="_blank"
                                                    className="text-blue-600"
                                                >
                                                    {proj.link}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {formData.certificates.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <div className='bg-[#f3f3f3] flex gap-2 justify-center items-center'>
                                        <Award className='w-4 h-4'/>
                                        <h3 className="font-bold text-[#626262]">Certificados</h3>
                                    </div>
                                    {formData.certificates.map((cert: any, i) => (
                                        <div key={i} className="text-sm">
                                            <p className="font-semibold">{cert.nome}</p>
                                            <p>
                                                {cert.entidade} - {cert.dataInicio} a {cert.dataConclusao}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {formData.references.length > 0 && (
                                <div className='flex flex-col gap-4'>
                                    <div className='bg-[#f3f3f3] flex gap-2 justify-center items-center'>
                                        <Handshake className='w-4 h-4'/>
                                        <h3 className="font-bold text-[#626262]">Referências</h3>
                                    </div>
                                    {formData.references.map((ref: any, i) => (
                                        <div key={i} className="text-sm">
                                            <p className="font-semibold">
                                                {ref.nome} - {ref.empresa}
                                            </p>
                                            <p>
                                                {ref.cargo} | {ref.email} | {ref.telefone}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>*/}
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
}