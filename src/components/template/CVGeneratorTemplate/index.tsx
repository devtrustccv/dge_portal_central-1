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
import {useNavigation} from "@/context/NavigationContext";
import {saveCV} from "@/services/post-save-cv";
import {toast} from "sonner";
import {CurriculoCv} from "@/services/ofertas/getAllOfertas/type";

const STORAGE_KEY = "cv_form_data"

interface CVGeneratorTemplateProps {
    data: CurriculoCv[] | null
}

export default function CVGeneratorTemplate(props: CVGeneratorTemplateProps) {

    const {data} = props;

    const [openSection, setOpenSection] = useState<string | null>("personal")
    const [formData, setFormData] = useState({
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
    })
    const {hasSession} = useNavigation();

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

    const handleSaveCV = async (formData: any) => {
        if (!formData) {
            console.warn("handleSaveCV → formData vazio");
            return;
        }

        try {
            await saveCV(formData);

            toast.success("Curriculo salvo com sucesso!");
        } catch (error) {
            console.error("handleSaveCV → erro ao salvar CV:", error);
            toast.error("Erro inesperado ao salvar.");
        }
    };

    const sections = [
        {
            key: "personal",
            title: "Dados Pessoais",
            icon: User,
            component: (
                <PersonalDataForm
                    data={data?.[0]?.content?.personal || formData.personal}
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
                    data={data?.[0]?.content?.summary || formData.summary}
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
                    data={data?.[0]?.content?.experience || formData.experience}
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
                    data={data?.[0]?.content?.education || formData.education}
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
                    data={data?.[0]?.content?.skills || formData.skills}
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
                    data={data?.[0]?.content?.idiomas || formData.idiomas}
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
                    data={data?.[0]?.content?.certificates || formData.certificates}
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
                    data={data?.[0]?.content?.references || formData.references}
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
                    data={data?.[0]?.content?.projects || formData.projects}
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

                                        <span className="text-gray-400">{openSection === section.key ? "▲" : "▼"}</span>
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

                    <div className="mt-6 flex justify-end gap-2">
                        {
                            hasSession ? (
                                <>
                                    <button
                                        onClick={() => handleSaveCV(formData)}
                                        className='bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium'>
                                        Guardar Curriculo
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="relative group">
                                        <button
                                            className='cursor-not-allowed bg-gray-400 text-white px-6 py-2 rounded-lg'
                                            disabled={!hasSession}
                                        >
                                            Guardar Curriculo
                                        </button>
                                        <div
                                            className="absolute bottom-full mb-2 w-max max-w-xs whitespace-normal hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded text-left">
                                            <p> ⚠️ ( Para guardar seu curriculo registe-se ou faça login ).</p>
                                        </div>
                                    </div>
                                </>
                            )
                        }

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
                    <LayoutsColumns data={data} formData={formData} capitalization="uppercase"
                                    onDownload={handleDownloadPDF}/>
                </div>
            </div>

            {/* Em mobile, o LayoutsColumns renderiza o botão "Previsualizar" fixo */}
            <div className="md:hidden">
                <LayoutsColumns data={data} formData={formData} capitalization="uppercase"
                                onDownload={handleDownloadPDF}/>
            </div>
        </main>
    )
}
