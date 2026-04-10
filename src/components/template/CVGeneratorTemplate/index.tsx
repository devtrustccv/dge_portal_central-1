"use client"
import {useEffect, useState} from "react"
import {LayoutsColumns} from "@/components/template/GeradorCV/forms/components"
import {Award, Brain, Briefcase, FileText, FolderOpen, GraduationCap, Handshake, Languages, User} from "lucide-react"
import {Banner} from "@/components/atoms/banner"
import {CertificatesForm} from "@/components/template/GeradorCV/forms/CertificatesForm"
import {ReferencesForm} from "@/components/template/GeradorCV/forms/ReferencesForm"
import {ProjectsForm} from "@/components/template/GeradorCV/forms/ProjectsForm"
import {LanguageForm} from "@/components/template/GeradorCV/forms/LanguageForm"
import {SkillsForm} from "@/components/template/GeradorCV/forms/SkillsForm"
import {EducationForm} from "@/components/template/GeradorCV/forms/EducationForm"
import {ExperienceForm} from "@/components/template/GeradorCV/forms/ExperienceForm"
import {SummaryForm} from "@/components/template/GeradorCV/forms/SummaryForm"
import {PersonalDataForm} from "@/components/template/GeradorCV/forms/PersonalDataForm"
import {logDownloadCV} from "@/services/logDownloadCV"
import {useNavigation} from "@/context/NavigationContext"
import {saveCV, updateCV} from "@/services/post-save-cv"
import {toast} from "sonner"
import {CurriculoContent, CurriculoCv} from "@/services/get-curriculo-cv/type"
import {useRouter} from "next/navigation";

const EMPTY_FORM_DATA: CurriculoContent = {
    personal: {
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
        socialMidia: "",
        foto: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    idiomas: [],
    references: [],
    projects: [],
    certificates: []
}

const normalizeCVContent = (content?: Partial<CurriculoContent> | null): CurriculoContent => ({
    personal: {
        nome: content?.personal?.nome || "",
        email: content?.personal?.email || "",
        telefone: content?.personal?.telefone || "",
        endereco: content?.personal?.endereco || "",
        socialMidia: typeof content?.personal?.socialMidia === "string" ? content.personal.socialMidia : "",
        foto: content?.personal?.foto || ""
    },
    summary: content?.summary || "",
    experience: content?.experience || [],
    education: content?.education || [],
    skills: content?.skills || [],
    idiomas: content?.idiomas || [],
    references: content?.references || [],
    projects: content?.projects || [],
    certificates: content?.certificates || []
})

interface CVGeneratorTemplateProps {
    data: CurriculoCv[] | null
    ownerEmail: string
}

export default function CVGeneratorTemplate({data, ownerEmail}: CVGeneratorTemplateProps) {
    const {hasSession} = useNavigation()
    const [openSection, setOpenSection] = useState<string | null>("personal")
    const [isDirty, setIsDirty] = useState(false)
    const [hasHydrated, setHasHydrated] = useState(false)
    const [initialData, setInitialData] = useState<CurriculoContent>(EMPTY_FORM_DATA)
    const [formData, setFormData] = useState<CurriculoContent>(EMPTY_FORM_DATA)
    const storageKey = `cv_form_data:${ownerEmail || "anonymous"}`

    const router = useRouter();
    // Flag para saber se já existe CV no backend
    const hasSavedCV = !!data?.[0]?.content && Object.keys(data[0].content).length > 0

    // Se já existe CV salvo no backend, a API é a fonte inicial.
    // O rascunho local só é usado quando ainda não existe CV salvo.
    useEffect(() => {
        const apiData = normalizeCVContent(data?.[0]?.content)
        const storedData = localStorage.getItem(storageKey)

        let nextFormData = apiData

        if (!hasSavedCV && storedData) {
            try {
                nextFormData = normalizeCVContent(JSON.parse(storedData))
            } catch (error) {
                console.error("Erro ao ler rascunho do currículo:", error)
                localStorage.removeItem(storageKey)
            }
        }

        setInitialData(apiData)
        setFormData(nextFormData)
        setHasHydrated(true)
    }, [data, hasSavedCV, storageKey])

    // Calcula alteração real entre o estado atual e o conteúdo salvo.
    useEffect(() => {
        if (!hasHydrated) return
        setIsDirty(JSON.stringify(normalizeCVContent(formData)) !== JSON.stringify(normalizeCVContent(initialData)))
    }, [formData, initialData, hasHydrated])

    // Salva automaticamente no localStorage
    useEffect(() => {
        if (!hasHydrated) return
        localStorage.setItem(storageKey, JSON.stringify(formData))
    }, [formData, hasHydrated, storageKey])

    const updateFormData = <K extends keyof CurriculoContent>(section: K, value: CurriculoContent[K]) => {
        setFormData(prev => ({...prev, [section]: value}))
    }

    // Download PDF
    const handleDownloadPDF = async () => {
        const element = document.getElementById("cv-preview")

        logDownloadCV({
            nome: formData.personal.nome,
            email: formData.personal.email,
            telefone: formData.personal.telefone,
            endereco: formData.personal.endereco
        })

        if (!element) return

        const html2pdf = (await import("html2pdf.js")).default
        const titles = element.querySelectorAll('h3')
        titles.forEach(el => el.style.paddingBottom = '10px')

        const opt = {
            margin: 0,
            filename: "meu-curriculo.pdf",
            image: {type: "jpeg", quality: 1},
            html2canvas: {scale: 4, useCORS: true},
            jsPDF: {unit: "in", format: "a4", orientation: "portrait"}
        }

        html2pdf().set(opt).from(element).toPdf().get('pdf').then(() => {
            titles.forEach(el => el.style.paddingBottom = '0px')
        }).save()
    }

    // Função para salvar CV
    const handleSaveCV = async (formData: any) => {
        if (!formData) return
        try {
            await saveCV({
                ownerEmail,
                content: formData
            })
            setInitialData(normalizeCVContent(formData))
            setIsDirty(false)
            toast.success("Currículo salvo com sucesso!")
            router.refresh();
        } catch (error) {
            console.error("Erro ao salvar CV:", error)
            toast.error(error instanceof Error ? error.message : "Erro inesperado ao salvar.")
        }
    }

    // Função para atualizar CV
    const handleUpdateCV = async () => {
        try {
            await updateCV({
                ownerEmail,
                content: formData
            })
            setInitialData(normalizeCVContent(formData))
            setIsDirty(false)
            toast.success("Currículo atualizado com sucesso!")
            router.refresh();
        } catch (error) {
            console.error("Erro ao atualizar CV:", error)
            toast.error(error instanceof Error ? error.message : "Erro inesperado ao atualizar.")
        }
    }

    // Decide se salva ou atualiza
    const handleSaveOrUpdate = async () => {
        if (hasSavedCV) {
            await handleUpdateCV()
        } else {
            await handleSaveCV(formData)
        }
    }

    const sections = [
        {
            key: "personal",
            title: "Dados Pessoais",
            icon: User,
            component: <PersonalDataForm data={formData.personal}
                                         onChange={d => updateFormData("personal", d)}/>
        },
        {
            key: "summary",
            title: "Resumo Profissional",
            icon: FileText,
            component: <SummaryForm data={formData.summary}
                                    onChange={d => updateFormData("summary", d)}/>
        },
        {
            key: "experience",
            title: "Experiência",
            icon: Briefcase,
            component: <ExperienceForm data={formData.experience}
                                       onChange={d => updateFormData("experience", d)}/>
        },
        {
            key: "education",
            title: "Formação Académica",
            icon: GraduationCap,
            component: <EducationForm data={formData.education}
                                      onChange={d => updateFormData("education", d)}/>
        },
        {
            key: "skills",
            title: "Competências",
            icon: Brain,
            component: <SkillsForm data={formData.skills}
                                   onChange={d => updateFormData("skills", d)}/>
        },
        {
            key: "idiomas",
            title: "Idiomas",
            icon: Languages,
            component: <LanguageForm data={formData.idiomas}
                                     onChange={d => updateFormData("idiomas", d)}/>
        },
        {
            key: "certificates",
            title: "Certificados",
            icon: Award,
            component: <CertificatesForm data={formData.certificates}
                                         onChange={d => updateFormData("certificates", d)}/>
        },
        {
            key: "references",
            title: "Referências",
            icon: Handshake,
            component: <ReferencesForm data={formData.references}
                                       onChange={d => updateFormData("references", d)}/>
        },
        {
            key: "projects",
            title: "Projetos",
            icon: FolderOpen,
            component: <ProjectsForm data={formData.projects}
                                     onChange={d => updateFormData("projects", d)}/>
        }
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
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Gerador de Curriculum
                        Vitae</h2>

                    <div className="space-y-3">
                        {sections.map(section => {
                            const Icon = section.icon
                            return (
                                <div key={section.key} className="border rounded-lg shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
                                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-4 h-4 text-indigo-600"/>
                                            <span className="font-medium text-gray-700">{section.title}</span>
                                        </div>
                                        <span className="text-gray-400">{openSection === section.key ? "▲" : "▼"}</span>
                                    </button>
                                    {openSection === section.key &&
                                        <div className="p-4 bg-white">{section.component}</div>}
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                        {hasSession ? (
                            <button
                                onClick={handleSaveOrUpdate}
                                disabled={!isDirty}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                    isDirty
                                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                        : "bg-gray-400 text-white cursor-not-allowed"
                                }`}
                            >
                                {hasSavedCV ? "Atualizar" : "Guardar"}
                            </button>
                        ) : (
                            <div className="relative group">
                                <button className="cursor-not-allowed bg-gray-400 text-white px-6 py-2 rounded-lg"
                                        disabled>
                                    Guardar Curriculo
                                </button>
                                <div
                                    className="absolute bottom-full mb-2 w-max max-w-xs whitespace-normal hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded text-left">
                                    <p>⚠️ (Para guardar seu curriculo registe-se ou faça login).</p>
                                </div>
                            </div>
                        )}

                        <button onClick={handleDownloadPDF}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                            Baixar PDF
                        </button>
                    </div>
                </div>

                {/* PREVIEW DO CV (desktop) */}
                <div className="hidden md:block w-full md:w-1/2 bg-white rounded-lg shadow overflow-hidden">
                    <LayoutsColumns
                        formData={formData}
                        capitalization="uppercase"
                        onDownload={handleDownloadPDF}
                    />
                </div>
            </div>

            {/* PREVIEW MOBILE */}
            <div className="md:hidden">
                <LayoutsColumns
                    formData={formData}
                    capitalization="uppercase"
                    onDownload={handleDownloadPDF}
                />
            </div>
        </main>
    )
}
