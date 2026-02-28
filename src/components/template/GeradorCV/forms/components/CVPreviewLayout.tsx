/*
import {MdEmail, MdLanguage, MdLocationCity, MdPhone} from "react-icons/md";
import {AiFillLinkedin} from "react-icons/ai";
import {Brain} from "lucide-react";
import React from "react";

interface CVPreviewLayoutProps {
    formData: any;
    personalStyle: string;
    getAlignment: () => string;
}

export function CVPreviewLayout(props: CVPreviewLayoutProps) {

    const {formData, personalStyle, getAlignment} = props;
    return (
        <>
            {/!* 1. COMPONENTE DE DETALHES PESSOAIS *!/}
            {personalStyle === 'sidebar' ? (
                /!* LADO ESQUERDO (SIDEBAR PADRÃO) *!/
                <div className="bg-gray-100 w-[300px] p-4 rounded space-y-4">

                    {formData.personal.foto && (
                        <img
                            src={formData.personal.foto}
                            alt="Foto"
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                    )}

                    {formData.personal.nome && (
                        <div className="text-center">
                            <h2 className="text-lg font-semibold">{formData.personal.nome}</h2>

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
                                {formData.skills.map((skill: any, i: number) => (
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
                                {formData.idiomas.map((idioma: any, i: number) => (
                                    <li key={i}>
                                        {idioma.idioma} - {idioma.nivel}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                /!* CABEÇALHO SUPERIOR (LEFT, CENTER, RIGHT) *!/
                <header className={`w-full p-8 bg-gray-100 border-b-2 border-gray-100 flex flex-col ${getAlignment()}`}>
                    <div
                        className={`flex gap-8 items-center ${personalStyle === 'right' ? 'flex-row-reverse' : 'flex-row'} ${personalStyle === 'center' ? 'flex-col' : ''}`}>
                        {formData.personal.foto && (
                            <img src={formData.personal.foto} alt="Foto"
                                 className="w-28 h-28 rounded-full object-cover border-4 border-gray-50 shadow-md"/>
                        )}
                        <div className={`flex flex-col ${getAlignment()}`}>
                            <h1 className="text-4xl font-extrabold text-gray-900">{formData.personal.nome}</h1>
                            <div className={`flex flex-wrap gap-x-6 gap-y-2 mt-4 text-gray-600 ${getAlignment()}`}>
                                    <span className="flex items-center gap-1.5"><MdEmail
                                        className="text-blue-600"/> {formData.personal.email}</span>
                                <span className="flex items-center gap-1.5"><MdPhone
                                    className="text-blue-600"/> {formData.personal.telefone}</span>
                                <span className="flex items-center gap-1.5"><MdLocationCity
                                    className="text-blue-600"/> {formData.personal.endereco}</span>
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </>
    )
}*/

import {Brain, Globe, Linkedin, Mail, MapPin, Phone} from "lucide-react"
import React from "react"

interface CVPreviewLayoutProps {
    formData: any
    personalStyle: string
    getAlignment: () => string
}

export function CVPreviewLayout(props: CVPreviewLayoutProps) {
    const {formData, personalStyle, getAlignment} = props

    return (
        <>
            {personalStyle === "sidebar" ? (
                /* LADO ESQUERDO (SIDEBAR PADRÃO) */
                <div
                    className="sm:h-[calc(200vh-100px)] md:h-[calc(100vh-100px)] bg-gray-100 w-[300px] p-4 rounded space-y-4 shrink-0">
                    {formData.personal.foto && (
                        <img
                            src={formData.personal.foto}
                            alt="Foto"
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                    )}

                    {formData.personal.nome && (
                        <div className="text-center">
                            <h2 className="text-lg font-semibold">{formData.personal.nome}</h2>

                            <div className="flex gap-2 items-center mt-4 mb-2">
                                <div className="border border-gray-500 rounded-full p-1">
                                    <Mail className="w-4 h-4"/>
                                </div>
                                <p className="text-sm">{formData.personal.email}</p>
                            </div>

                            <div className="flex gap-2 items-center mb-2">
                                <div className="border border-gray-500 rounded-full p-1">
                                    <Phone className="w-4 h-4"/>
                                </div>
                                <p className="text-sm">{formData.personal.telefone}</p>
                            </div>

                            <div className="flex gap-2 items-center mb-2">
                                <div className="border border-gray-500 rounded-full p-1">
                                    <MapPin className="w-4 h-4"/>
                                </div>
                                <p className="text-sm">{formData.personal.endereco}</p>
                            </div>

                            {formData.personal.socialMidia && (
                                <div className="flex gap-2 items-center mb-2">
                                    <div className="border border-gray-500 rounded-full p-1">
                                        <Linkedin className="w-4 h-4"/>
                                    </div>
                                    <a href={formData.personal.socialMidia} className="text-sm underline"
                                       target="_blank">
                                        LinkedIn
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {formData.skills.length > 0 && (
                        <div>
                            <div className="flex gap-2 items-center mb-2">
                                <div className="border border-gray-500 rounded-full p-1">
                                    <Brain className="w-4 h-4 text-gray-500"/>
                                </div>
                                <h3 className="font-bold">Competências</h3>
                            </div>
                            <ul className="list-disc list-inside text-sm">
                                {formData.skills.map((skill: any, i: number) => (
                                    <li key={i}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {formData.idiomas.length > 0 && (
                        <div>
                            <div className="flex gap-2 items-center mb-2">
                                <div className="border border-gray-500 rounded-full p-1">
                                    <Globe className="w-4 h-4"/>
                                </div>
                                <h3 className="font-bold">Idiomas</h3>
                            </div>
                            <ul className="list-disc list-inside text-sm">
                                {formData.idiomas.map((idioma: any, i: number) => (
                                    <li key={i}>
                                        {idioma.idioma} - {idioma.nivel}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                /* CABEÇALHO SUPERIOR (LEFT, CENTER, RIGHT) */
                <header className={`w-full p-8 bg-gray-100 border-b-2 border-gray-100 flex flex-col ${getAlignment()}`}>
                    <div
                        className={`flex gap-8 items-center ${personalStyle === "right" ? "flex-row-reverse" : "flex-row"} ${personalStyle === "center" ? "flex-col" : ""}`}
                    >
                        {formData.personal.foto && (
                            <img
                                src={formData.personal.foto}
                                alt="Foto"
                                className="w-28 h-28 rounded-full object-cover border-4 border-gray-50 shadow-md"
                            />
                        )}
                        <div className={`flex flex-col ${getAlignment()}`}>
                            <h1 className="text-4xl font-extrabold text-gray-900">{formData.personal.nome}</h1>
                            <div className={`flex flex-wrap gap-x-6 gap-y-2 mt-4 text-gray-600 ${getAlignment()}`}>
                                <span className="flex items-center gap-1.5">
                                    <Mail className="w-4 h-4 text-blue-600"/> {formData.personal.email}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4 text-blue-600"/> {formData.personal.telefone}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-blue-600"/> {formData.personal.endereco}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </>
    )
}
