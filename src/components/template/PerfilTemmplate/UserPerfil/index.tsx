"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"
import { Info } from "../Info"
import { useNavigation } from "@/context/NavigationContext"
import { CursoCard } from "../CursosCard"


export interface CandidaturaQualificacao {
    denominacaoQualif: string;
    ordemPreferencia: number;
    statusCandidatura: 'CANDIDATURA' | string;
    pontuacao: number | null;
    name: string;
    dateCreate: string;
}
type Props = {
    candidaturas?: CandidaturaQualificacao[];
}

export function UserPerfil({  candidaturas }: Props) {
    const { user } = useNavigation();

    return (
        <div className=" bg-background mt-16">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={user?.pessoa_info?.foto} />
                            <AvatarFallback>
                                {user?.pessoa_info?.nome
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <h1 className="text-xl font-semibold text-foreground">{user?.name || user?.pessoa_info?.nome}</h1>
                </div>
                <Tabs defaultValue="profile" className="w-full">
                    <div className="">
                        <TabsList className="h-10 w-full justify-start gap-6 rounded-none bg-transparent p-0 border-x-0 border-t-0 border-b ">
                            <TabsTrigger
                                value="profile"
                                className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                            >
                                Perfil
                            </TabsTrigger>
                            <TabsTrigger
                                value="application"
                                className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                            >
                                <span className="flex items-center gap-2">
                                    Minha Candidatura
                                    {candidaturas && candidaturas?.length > 0 && (
                                        <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-600">
                                            {candidaturas?.length}
                                        </span>
                                    )}
                                </span>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="application" className="mt-6">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-lg font-semibold text-foreground">Status da Candidatura</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            {candidaturas
                                ?.slice()
                                .sort((a, b) => a.ordemPreferencia - b.ordemPreferencia)
                                .map((step, index) => (
                                    <CursoCard key={index} {...step} />
                                ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="profile" className="mt-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-foreground">Informações Pessoais</h2>
                            {/*<Button variant="default" size="sm" iconLeft={<Edit className="mr-2 h-4 w-4" />}>
                                Editar Perfil
                            </Button>*/}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <Info label="Nome Completo" value={user?.pessoa_info?.nome || ""} />
                            <Info label="Email" value={user?.email || user?.pessoa_info?.email || ""} />
                            <Info label="Tipo de documento" value={user?.pessoa_info?.tipo_documento || ""} />
                            <Info label="Nº de documento" value={user?.pessoa_info?.num_documento || ""} />
                            <Info label="Telefone" value={user?.pessoa_info?.telefone || ""} />
                            <Info label="NIF" value={user?.pessoa_info?.nif || ""} />
                            <Info label="Data de Nascimento" value={user?.pessoa_info?.data_nasc || ""} />
                            <Info label="Endereço" value={user?.pessoa_info?.bairro || ""} />
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                <span className="text-foreground font-medium">{"Conta ativa"}</span>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
