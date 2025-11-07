"use client";

import React from "react";
import {
    Pencil,
    Calendar,
} from "lucide-react"
import { PerfilTemplateProps } from ".";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import ArchivedApplicationsTable from "./CandidaturaArquivadas";

export function ProfileContent({ candidaturas, pessoaInfo }: PerfilTemplateProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
            <div className="container mx-auto space-y-12">
                <div className="bg-white rounded-3xl p-4  md:p-6 lg:px-8 space-y-4 md:space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Informações Pessoais</h2>
                        <p className="text-gray-500 mt-2">Seus dados cadastrais</p>
                    </div>
                    <div className="space-y-6">
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
                                <p className="text-gray-800 font-medium">{pessoaInfo?.nif || "Não informado"}</p>
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
                    </div>
                </div>
                {candidaturas && (candidaturas?.candidaturas_activas?.length > 0) && <div className="bg-white rounded-3xl p-4  md:p-6 lg:px-8 space-y-4 md:space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Minhas Candidaturas</h2>
                        <p className="text-gray-500 mt-2">Informações da sua candidatura</p>
                    </div>
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
                </div>}
                {candidaturas?.candidaturas_arquivadas && candidaturas?.candidaturas_arquivadas?.length > 0 && <ArchivedApplicationsTable applications={candidaturas?.candidaturas_arquivadas || []} />}
            </div>

        </div>
    );
}
