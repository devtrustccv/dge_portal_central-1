"use client";

import React from "react";
import {
    User,
    Star,
    Pencil,
    Book,
    Sparkles,
    Calendar,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"
import { PerfilTemplateProps } from ".";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import ArchivedApplicationsTable from "./CandidaturaArquivadas";

export function ProfileContent({ candidaturas, pessoaInfo }: PerfilTemplateProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="bg-white rounded-3xl px-8 py-16">
                        <Tabs defaultValue="profile" className="w-full">
                            <div className="mb-16 w-full flex justify-center">
                                <TabsList className=" justify-center gap-16 rounded-none bg-transparent p-0  flex-wrap ">
                                    <TabsTrigger
                                        value="profile"

                                        className="group w-full sm:w-fit relative h-fit rounded-none border-none bg-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none
                                            data-[state=active]:border-b-primary
                                            data-[state=active]:text-foreground
                                            data-[state=active]:shadow-none"
                                    >
                                        <div className="flex flex-col sm:flex-row items-center gap-6 opacity-50 group-data-[state=active]:opacity-100 transition-opacity duration-300">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#61C3A8] to-[#2470B8] flex items-center justify-center transform rotate-3 group-data-[state=active]:grayscale-0 grayscale">
                                                    <User className="w-10 h-10 text-white" />
                                                </div>
                                                <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin-slow group-data-[state=active]:opacity-100 opacity-30" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold group-data-[state=active]:text-gray-900 text-gray-400">Informações Pessoais</h2>
                                                <p className=" group-data-[state=active]:text-gray-500 text-gray-400">Seus dados cadastrais</p>
                                            </div>
                                        </div>

                                    </TabsTrigger>
                                    {candidaturas && (candidaturas?.candidaturas_activas?.length > 0 ) && <TabsTrigger
                                        value="application"
                                        className="group w-full sm:w-fit relative h-fit rounded-none border-none bg-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none
                                        data-[state=active]:border-b-primary
                                        data-[state=active]:text-foreground
                                        data-[state=active]:shadow-none"
                                    >
                                        <div className="flex flex-col sm:flex-row items-center gap-6 opacity-50 group-data-[state=active]:opacity-100 transition-opacity duration-300">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#61C3A8] to-[#2470B8] flex items-center justify-center transform rotate-3 group-data-[state=active]:grayscale-0 grayscale">
                                                    <Book className="w-10 h-10 text-white" />
                                                </div>
                                                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin-slow" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-800">Minhas Candidaturas</h2>
                                                <p className="text-gray-500">Informações da sua candidatura</p>
                                            </div>
                                        </div>
                                    </TabsTrigger>}
                                </TabsList>
                            </div>

                            <TabsContent key="profile" value="profile" className="">

                                {<div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-500">Nome Completo</p>
                                            <p className="text-gray-800 font-medium">{pessoaInfo?.nome}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="text-gray-800 font-medium">{pessoaInfo?.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-500">Tipo de documento</p>
                                            <p className="text-gray-800 font-medium">{pessoaInfo?.tipo_documento}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-500">Nº de documento</p>
                                            <p className="text-gray-800 font-medium">{pessoaInfo?.num_documento}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-500">NIF</p>
                                            <p className="text-gray-800 font-medium">{pessoaInfo?.nif}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-500">Telefone</p>
                                            <p className="text-gray-800 font-medium">{pessoaInfo?.telefone}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-500">Data de Nascimento</p>
                                            <p className="text-gray-800 font-medium">{pessoaInfo?.data_nasc ? formatDate(pessoaInfo?.data_nasc) : ""}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-sm text-gray-500">Endereço</p>
                                            <p className="text-gray-800 font-medium">{pessoaInfo?.bairro}</p>
                                        </div>
                                    </div>
                                    <>

                                        {/*<div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CreditCard className="w-4 h-4 text-[#61C3A8]" />
                                                <p className="text-sm text-gray-500">NIA</p>
                                            </div>
                                            <p className="text-gray-800 font-medium">{""}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-2 mb-1">
                                                <FileQuestion className="w-4 h-4 text-[#2470B8]" />
                                                <p className="text-sm text-gray-500">Problemas de Saúde</p>
                                            </div>
                                            <p className="text-gray-800 font-medium">{""}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Calendar className="w-4 h-4 text-[#61C3A8]" />
                                            <p className="text-sm text-gray-500">Período Disponível</p>
                                        </div>
                                        <p className="text-gray-800 font-medium">{""}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <GraduationCap className="w-5 h-5 text-[#61C3A8]" />
                                            <h3 className="text-lg font-semibold text-gray-800">Informações Acadêmicas</h3>
                                        </div>
                                        {pessoaInfo?.academicInfo.map((info, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-xl">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Ano Escolar</p>
                                                        <p className="text-gray-800 font-medium">{info.schoolYear}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Área de Estudo</p>
                                                        <p className="text-gray-800 font-medium">{info.studyArea}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Média</p>
                                                        <p className="text-gray-800 font-medium">{info.average}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                        */}
                                    </>
                                </div>
                                }
                            </TabsContent>
                            {candidaturas && candidaturas?.candidaturas_activas?.length > 0 && <TabsContent key="application" value="application" >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {candidaturas?.candidaturas_activas?.map((candidato, index) => (<div key={candidato.id ?? `${candidato.id}-${index}`} className="border border-dashed rounded-2xl p-4">
                                        <div className="mb-8" >
                                            <div className="p-6 bg-gradient-to-r from-[#61C3A8]/10 to-[#2470B8]/10 rounded-2xl">
                                                <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between mb-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Código da Candidatura</p>
                                                        <p className="text-xl font-semibold text-gray-800">{candidato.codigoCandidatura}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 bg-[#61C3A8] rounded-full animate-pulse"></div>
                                                        <span className="text-sm font-medium text-[#61C3A8]">{candidato.statusCandidatura}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4" />
                                                    <span><strong>Prazo final:</strong> {candidato?.dataFimCandidatura ? formatDate(candidato?.dataFimCandidatura) : ""}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800">Cursos Selecionados</h3>
                                                <Link href={`/ofertas-formativas/candidatura/${candidato.codigoCandidatura}`}>
                                                    <button
                                                        className="p-2 text-[#61C3A8] hover:bg-[#61C3A8]/10 rounded-lg"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                </Link>
                                            </div>
                                            {candidato?.cursos?.map((course, index) => (
                                                <div
                                                    key={course.cursoCandatoId}
                                                    className={`p-6 rounded-2xl transition-all duration-300 ${index === 0
                                                        ? 'bg-gradient-to-r from-[#61C3A8]/10 to-[#2470B8]/10 border border-[#61C3A8]/20'
                                                        : 'bg-gradient-to-r from-[#2470B8]/10 to-[#61C3A8]/10 border border-[#2470B8]/20'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className={`
                                                    px-3 py-1 rounded-full text-sm font-medium
                                                    ${index === 0 ? 'bg-[#61C3A8] text-white' : 'bg-[#2470B8] text-white'}
                                                    `}>
                                                            {course.ordemPreferencia}ª Opção
                                                        </span>
                                                    </div>
                                                    <h3 className="font-medium text-gray-900">{course.denominacaoQualif + (course?.nivel ? ` - ${course?.nivel}` : "")} </h3>
                                                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                                        <span className="px-2 py-1 bg-gray-100 rounded">{course?.nomeEntidade}</span>
                                                        {course.concelho && <>
                                                            <span className="text-primary">•</span>
                                                            <span>{course.concelho}</span>
                                                        </>}
                                                        {course.dataInicioCurso && <>
                                                            <span className="text-primary">•</span>
                                                            <span>{formatDate(course.dataInicioCurso)}</span>
                                                        </>}
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>))
                                    }
                                </div>

                            </TabsContent>}
                        </Tabs>
                    </div>
                </div>
            </div>
            {candidaturas?.candidaturas_arquivadas && candidaturas?.candidaturas_arquivadas?.length > 0 && <ArchivedApplicationsTable applications={candidaturas?.candidaturas_arquivadas || []} />}
        </div>
    );
}
