/*
"use client"

import React, {useState} from "react"
import {Activity, Award, FileText, FolderOpen, Handshake, School} from "lucide-react"

// Componentes de Seleção (Cards)
import {CVPreviewLayout} from "@/components/template/GeradorCV/forms/components/CVPreviewLayout";
import {ModalCustomization} from "@/components/template/GeradorCV/forms/components/ModalCustomization";

export type Capitalization = "normal" | "uppercase"
export type LayoutType = "one" | "two" | "mix"
export type PersonalStyle = "left" | "center" | "right" | "sidebar"

interface LayoutsColumnsProps {
    formData: any
    capitalization?: Capitalization
}

export function LayoutsColumns(props: LayoutsColumnsProps) {
    const {formData, capitalization = "normal"} = props;
    const [open, setOpen] = useState<boolean>(false);

    // Estados de Controle
    const [headingStyle, setHeadingStyle] = useState<1 | 2 | 3 | 4>(1)
    const [layoutType, setLayoutType] = useState<LayoutType>("one")
    const [personalStyle, setPersonalStyle] = useState<PersonalStyle>("sidebar")

    // --- Lógica de Estilização de Títulos ---
    const headingClass = (base: string) => {
        let style = ""
        switch (headingStyle) {
            case 1:
                style = "flex justify-start items-center gap-1 text-blue-600 border-b-4 border-gray-500 mb-2"
                break
            case 2:
                style = "bg-[#f3f3f3] flex gap-2 justify-center items-center mb-2 p-1"
                break
            case 3:
                style = "flex justify-start items-center px-2 gap-1 border border-gray-500 rounded-full mb-2"
                break
            case 4:
                style = "flex justify-center items-center gap-1 border-b-2 border-t-2 border-gray-500 mb-2"
                break
        }
        const caps = capitalization === "uppercase" ? "uppercase" : ""
        return `${base} ${style} ${caps}`
    }

    const renderSectionHeading = (icon: React.ReactNode, title: string) => (
        <div className={headingClass("flex justify-start items-center gap-1")}>
            {icon}
            <h3 className={`font-bold text-[#626262] pdf-title-adjust live-preview-title`}>
                {title}
            </h3>
        </div>
    )

    const isMix = layoutType === "mix"
    const mainColSpan = layoutType === "one" ? "w-full" : layoutType === "two" ? "grid grid-cols-2 gap-6" : "w-full"
    const flexCols = layoutType === "one" ? "flex" : layoutType === "two" ? "flex gap-7" : "grid-cols-3"

    // Classes de alinhamento para os estilos de topo (Header)
    const getAlignment = () => {
        if (personalStyle === 'center') return "text-center items-center justify-center";
        if (personalStyle === 'right') return "text-right items-end justify-end ml-auto";
        return "text-left items-start justify-start";
    }

    return (
        <>
            {/!* === PAINEL DE CONFIGURAÇÃO (OS CARDS) === *!/}
            <ModalCustomization
                open={open}
                setOpen={setOpen}
                headingStyle={headingStyle}
                setHeadingStyle={setHeadingStyle}
                layoutType={layoutType}
                setLayoutType={setLayoutType}
                personalStyle={personalStyle}
                setPersonalStyle={setPersonalStyle}
            />

            <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">

                {/!* === ÁREA DE VISUALIZAÇÃO DO CV === *!/}
                <div id="cv-preview"
                     className={`${flexCols} gap-4 p-4 ${isMix ? "flex gap-7" : ""} ${personalStyle === 'sidebar' ? 'flex-row' : 'flex-col'}`}>
                    <CVPreviewLayout
                        formData={formData}
                        personalStyle={personalStyle}
                        getAlignment={getAlignment}
                    />

                    {/!* === Coluna principal (alterável conforme layout) === *!/}
                    <div className={`${mainColSpan} ${isMix ? "grid grid-cols-2 gap-4" : ""}`}>

                        {formData.summary && (
                            <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                                {renderSectionHeading(<FileText className='w-4 h-4'/>, "Resumo Profissional")}
                                <p>{formData.summary}</p>
                            </div>
                        )}

                        {formData.experience.length > 0 && (
                            <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                                {renderSectionHeading(<Activity className='w-4 h-4'/>, "Experiência")}
                                {formData.experience.map((exp: any, i: number) => (
                                    <div key={i} className="text-sm mb-2">
                                        <p className="font-semibold">{exp.cargo} - {exp.empresa}</p>
                                        <p>{exp.local} | {exp.dataInicio} a {exp.dataFim}</p>
                                        <p>{exp.descricao}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {formData.education.length > 0 && (
                            <div className={isMix ? "col-span-1 bg-[#f3f3f3] p-2 rounded" : ""}>
                                {renderSectionHeading(<School className='w-4 h-4'/>, "Formação Académica")}
                                {formData.education.map((edu: any, i: number) => (
                                    <div key={i} className="text-sm mb-2">
                                        <p className="font-semibold">{edu.curso} - {edu.instituicao}</p>
                                        <p>{edu.dataInicio} a {edu.dataFim}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {formData.projects.length > 0 && (
                            <div className={isMix ? "col-span-1 bg-[#f3f3f3] p-2 rounded" : ""}>
                                {renderSectionHeading(<FolderOpen className='w-4 h-4'/>, "Projetos")}
                                {formData.projects.map((p: any, i: number) => (
                                    <div key={i} className="text-sm mb-2">
                                        <p className="font-semibold">{p.nome}</p>
                                        <p>{p.descricao}</p>
                                        {p.link &&
                                            <a href={p.link} target="_blank"
                                               className="text-blue-600 underline">{p.link}</a>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {formData.certificates.length > 0 && (
                            <div className={isMix ? "col-span-1 bg-[#f3f3f3] p-2 rounded" : ""}>
                                {renderSectionHeading(<Award className='w-4 h-4'/>, "Certificados")}
                                {formData.certificates.map((c: any, i: number) => (
                                    <div key={i} className="text-sm mb-2">
                                        <p className="font-semibold">{c.nome}</p>
                                        <p>{c.entidade} - {c.dataInicio} a {c.dataConclusao}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {formData.references.length > 0 && (
                            <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                                {renderSectionHeading(<Handshake className='w-4 h-4'/>, "Referências")}
                                {formData.references.map((r: any, i: number) => (
                                    <div key={i} className="text-sm mb-2">
                                        <p className="font-semibold">{r.nome} - {r.empresa}</p>
                                        <p>{r.cargo} | {r.email} | {r.telefone}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}*/

"use client"

import React, {useState} from "react"
import {Activity, Award, Brain, Eye, FileText, FolderOpen, Handshake, School} from "lucide-react"

import {CVPreviewLayout} from "@/components/template/GeradorCV/forms/components/CVPreviewLayout"
import {ModalCustomization} from "@/components/template/GeradorCV/forms/components/ModalCustomization"
import {MobilePreviewModal} from "@/components/template/GeradorCV/componente/MobilePreviewModal"
import {normalizeRichTextValue} from "@/lib/rich-text"

export type Capitalization = "normal" | "uppercase"
export type LayoutType = "one" | "two" | "mix"
export type PersonalStyle = "left" | "center" | "right" | "sidebar"

function RichTextPreview({value}: { value?: string }) {
    if (!value) return null

    return (
        <div
            className="text-editor"
            dangerouslySetInnerHTML={{__html: normalizeRichTextValue(value)}}
        />
    )
}

interface LayoutsColumnsProps {
    formData: any
    capitalization?: Capitalization
    onDownload?: () => void
}

export function LayoutsColumns(props: LayoutsColumnsProps) {
    const {formData, capitalization = "normal", onDownload} = props
    const [open, setOpen] = useState<boolean>(false)
    const [showMobilePreview, setShowMobilePreview] = useState<boolean>(false)

    // Estados de Controle
    const [headingStyle, setHeadingStyle] = useState<1 | 2 | 3 | 4>(1)
    const [layoutType, setLayoutType] = useState<LayoutType>("one")
    const [personalStyle, setPersonalStyle] = useState<PersonalStyle>("sidebar")

    // --- Lógica de Estilização de Títulos ---
    const headingClass = (base: string) => {
        let style = ""
        switch (headingStyle) {
            case 1:
                style = "flex justify-start items-center gap-1 text-blue-600 border-b-4 border-gray-500 mb-2"
                break
            case 2:
                style = "bg-[#f3f3f3] flex gap-2 justify-center items-center mb-2 p-1"
                break
            case 3:
                style = "flex justify-start items-center px-2 gap-1 border border-gray-500 rounded-full mb-2"
                break
            case 4:
                style = "flex justify-center items-center gap-1 border-b-2 border-t-2 border-gray-500 mb-2"
                break
        }
        const caps = capitalization === "uppercase" ? "uppercase" : ""
        return `${base} ${style} ${caps}`
    }

    const renderSectionHeading = (icon: React.ReactNode, title: string) => (
        <div className={headingClass("flex justify-start items-center gap-1")}>
            {icon}
            <h3 className="font-bold text-[#626262] pdf-title-adjust live-preview-title">{title}</h3>
        </div>
    )

    const isMix = layoutType === "mix"
    const mainColSpan = layoutType === "one" ? "w-full" : layoutType === "two" ? "grid grid-cols-2 gap-6" : "w-full"
    const flexCols = layoutType === "one" ? "flex" : layoutType === "two" ? "flex gap-7" : "grid-cols-3"

    // Classes de alinhamento para os estilos de topo (Header)
    const getAlignment = () => {
        if (personalStyle === "center") return "text-center items-center justify-center"
        if (personalStyle === "right") return "text-right items-end justify-end ml-auto"
        return "text-left items-start justify-start"
    }

    const handleDownload = () => {
        if (onDownload) {
            onDownload()
        }
    }

    // Conteúdo do CV Preview (reutilizado em desktop e mobile)
    const CVContent = (
        <div id="cv-preview"
             className={`${flexCols} gap-4 p-4 ${isMix ? "flex gap-7" : ""} ${personalStyle === "sidebar" ? "flex-row" : "flex-col"}`}
        >
            <CVPreviewLayout formData={formData} personalStyle={personalStyle} getAlignment={getAlignment}/>

            {/* === Coluna principal (alterável conforme layout) === */}
            <div className={`${mainColSpan} ${isMix ? "grid grid-cols-2 gap-4" : ""}`}>

                {formData.summary && (
                    <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                        {renderSectionHeading(<FileText className="w-4 h-4"/>, "Resumo Profissional")}
                        <RichTextPreview value={formData.summary}/>
                    </div>
                )}

                {formData.experience.length > 0 && (
                    <div className="mt-5">
                        <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                            {renderSectionHeading(<Activity className="w-4 h-4"/>, "Experiência")}
                            {formData.experience.map((exp: any, i: number) => (
                                <div key={i} className="text-sm mb-2">
                                    <p className="font-semibold">
                                        {exp.cargo} - {exp.empresa}
                                    </p>
                                    <p>
                                        {exp.local} | {exp.dataInicio} a {exp.dataFim}
                                    </p>
                                    <RichTextPreview value={exp.descricao}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {formData.education.length > 0 && (
                    <div className="mt-5">
                        <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                            {renderSectionHeading(<School className="w-4 h-4"/>, "Formação Académica")}
                            {formData.education.map((edu: any, i: number) => (
                                <div key={i} className="text-sm mb-2">
                                    <p className="font-semibold">
                                        {edu.curso} - {edu.instituicao}
                                    </p>
                                    <p>
                                        {edu.dataInicio} a {edu.dataFim}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {formData.skills.length > 0 && (
                    <div className="mt-5">
                        <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                            {renderSectionHeading(<Brain className="w-4 h-4"/>, "Competências")}
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-4">
                                {formData.skills.map((skill: any, i: number) => (
                                    <li key={i} className="min-w-0 break-words rounded bg-gray-50 px-2 py-1">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {formData.projects.length > 0 && (
                    <div className="mt-5">
                        <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                            {renderSectionHeading(<FolderOpen className="w-4 h-4"/>, "Projectos")}
                                {formData.projects.map((p: any, i: number) => (
                                <div key={i} className="text-sm mb-2">
                                    <p className="font-semibold">{p.nome}</p>
                                    <RichTextPreview value={p.descricao}/>
                                    {p.link && (
                                        <a href={p.link} target="_blank" className="text-blue-600 underline">
                                            {p.link}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {formData.certificates.length > 0 && (
                    <div className="mt-5">
                        <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                            {renderSectionHeading(<Award className="w-4 h-4"/>, "Certificados")}
                            {formData.certificates.map((c: any, i: number) => (
                                <div key={i} className="text-sm mb-2">
                                    <p className="font-semibold">{c.nome}</p>
                                    <p>
                                        {c.entidade} - {c.dataInicio} a {c.dataConclusao}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {formData.references.length > 0 && (
                    <div className="mt-5">
                        <div className={isMix ? "col-span-2 bg-[#f3f3f3] p-2 rounded" : ""}>
                            {renderSectionHeading(<Handshake className="w-4 h-4"/>, "Referências")}
                            {formData.references.map((r: any, i: number) => (
                                <div key={i} className="text-sm mb-2">
                                    <p className="font-semibold">
                                        {r.nome} - {r.empresa}
                                    </p>
                                    <p>
                                        {r.cargo} | {r.email} | {r.telefone}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )

    return (
        <>
            {/* === PAINEL DE CONFIGURAÇÃO (DESKTOP) === */}
            <div className="hidden md:block">
                <ModalCustomization
                    open={open}
                    setOpen={setOpen}
                    headingStyle={headingStyle}
                    setHeadingStyle={setHeadingStyle}
                    layoutType={layoutType}
                    setLayoutType={setLayoutType}
                    personalStyle={personalStyle}
                    setPersonalStyle={setPersonalStyle}
                />
            </div>

            {/* === ÁREA DE VISUALIZAÇÃO DO CV (DESKTOP) === */}
            <div className="hidden md:flex flex-col gap-8 w-full max-w-5xl mx-auto">{CVContent}</div>

            {/* === BOTÃO DE PREVISUALIZAR (MOBILE) === */}
            <button
                onClick={() => setShowMobilePreview(true)}
                className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white md:hidden bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full shadow-lg z-40 flex items-center gap-2"
            >
                <Eye className="w-4 h-4"/>
                <span>Previsualizar</span>
            </button>

            {/* === MODAL DE PREVIEW MOBILE === */}
            <MobilePreviewModal
                isOpen={showMobilePreview}
                onClose={() => setShowMobilePreview(false)}
                onDownload={handleDownload}
                headingStyle={headingStyle}
                setHeadingStyle={setHeadingStyle}
                layoutType={layoutType}
                setLayoutType={setLayoutType}
                personalStyle={personalStyle}
                setPersonalStyle={setPersonalStyle}
            >
                {CVContent}
            </MobilePreviewModal>
        </>
    )
}
