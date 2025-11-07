import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/atoms/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/atoms/select";
import { ProgramaGenerico } from "@/components/organisms/DetalheQualificacao/ProgramaGenerico";
import { INode } from "@/services/catalogo/getDetalheQualificacao/Types/type";
import React, { useEffect, useState } from "react";
import {NoItemsFound} from "@/components/organisms/NotItemnsFound";

export function TabsData({
     data,
}: {
    data: INode[] | undefined
}) {
    const defaultTabValue = "formacao"; // valor padrão da aba
    const [selectedTab, setSelectedTab] = useState(defaultTabValue);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // Verifica se a tela é mobile
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Função para obter o conteúdo da aba selecionada em mobile
    const getSelectedTabContent = () => {
        if (!data) return null;

        switch (selectedTab) {
            case "formacao":
                return (
                    <ProgramaGenerico
                        data={data}
                        formacaoTitle={{ denominacao: "Denominação", duracao: "Duração" }}
                        tipo="formacao"
                    />
                );
            case "certificacao":
                return (
                    <ProgramaGenerico
                        data={data}
                        formacaoTitle={{ denominacao: "Denominação", codigo: "Código" }}
                        tipo="certificacao"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="mt-16 grid">
            {/* Add to Kevin Sousa => Desing apresenta um espaço de 40px, mais se add esse espaçamento acaba de ficar com bastante espaço - mb-10*/}
            <h1 className="font-poppins font-medium text-[28px] md:text-[32px] leading-[30px] tracking-[0%] text-[#334155]">
                Via de acesso a Qualificação
            </h1>

            {/* Alterna entre Select (Mobile) e Tabs (Desktop) bg-[#EFF2F5]*/}
            {isMobile ? (
                <Select value={selectedTab} onValueChange={setSelectedTab}>
                    <SelectTrigger className="w-full h-[44px] rounded-xl border-none mt-8 text-wrap text-left">
                        <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent className={`border-none w-[64%] ml-6 text-wrap text-left`}>
                        <SelectItem value="formacao">
                            Formação
                        </SelectItem>
                        <SelectItem value="certificacao">
                            Reconhecimento, Validação e Certificação de Competências
                        </SelectItem>
                    </SelectContent>
                </Select>
            ) : (
                <Tabs defaultValue={defaultTabValue} value={selectedTab} onValueChange={setSelectedTab} className="w-full mt-10">
                    <TabsList className="grid h-[52px] gap-1 grid-cols-2 bg-[#EFF2F5] text-[#616E85]">
                        <TabsTrigger value="formacao" className="h-[40px] md:text-sm data-[state=active]:text-[#334155]">
                            Formação
                        </TabsTrigger>

                        <TabsTrigger
                            value="certificacao"
                            className={`h-[40px] md:text-sm data-[state=active]:text-[#334155] whitespace-normal break-words text-wrap overflow-hidden text-ellipsis`}
                        >
                            Reconhecimento, Validação e Certificação de Competências
                        </TabsTrigger>
                    </TabsList>

                    {/* Conteúdo das abas */}
                    {data?.[0]?.formacao && data[0]?.formacao.length > 0 ? (
                        <TabsContent value="formacao">
                            <ProgramaGenerico
                                data={data}
                                formacaoTitle={{ denominacao: "Denominação", duracao: "Duração" }}
                                tipo="formacao"
                            />
                        </TabsContent>
                    ) : (<TabsContent value="formacao"> <NoItemsFound title={'Nenhum item encontrado'}/></TabsContent>)}

                    {data?.[0]?.certificado && data[0]?.certificado.length > 0 ? (
                        <TabsContent value="certificacao">
                            <ProgramaGenerico
                                data={data}
                                formacaoTitle={{ denominacao: "Denominação", codigo: "Código" }}
                                tipo="certificacao"
                            />
                        </TabsContent>
                    ) : (<TabsContent value="certificacao"> <NoItemsFound title={'Nenhum item encontrado'}/></TabsContent>)}
                </Tabs>
            )}

            {/* Exibe o conteúdo da aba selecionada no mobile */}
            {isMobile && (
                <div className="mt-8">
                    {getSelectedTabContent()}
                </div>
            )}
        </div>
    );
}