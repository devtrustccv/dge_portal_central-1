'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card";
import { IGetCSNQ } from "@/services/getDataSNQ/types/type";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/atoms/select";
import {useEffect, useState} from "react";

export function FrameworkOfQualifications({ data }: { data: IGetCSNQ | null | undefined }) {
    // Definir a primeira aba do tabs como padrão
    const defaultTabValue = data?.nivels_connection?.niveis?.[0]?.documentId || "";
    const [selectedTab, setSelectedTab] = useState(defaultTabValue);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar tamanho da tela e alternar entre Tabs e Select
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <div className="mb-12 md:mb-32]">
            <div>
                <h2 className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155] leading-9 md:leading-[56px] tracking-[0] mb-[32px]">
                    {data?.qualificao_title?.denominacao}
                </h2>
                <p>{data?.qualificao_title?.label}</p>
            </div>

            <div>
                {data?.nivels_connection?.niveis && data?.nivels_connection?.niveis.length > 0 && (
                    <>
                        <h1 className="font-poppins py-6 text-[#334155] font-medium text-[20px] leading-[24px] tracking-[0%] uppercase mt-[40px] mb-6">
                            {data?.nivels_connection?.estruturaTitle}
                        </h1>

                        <Tabs defaultValue={defaultTabValue} value={selectedTab} onValueChange={setSelectedTab}
                              className="w-full overflow-hidden">
                            {isMobile ? (

                                <Select value={selectedTab} onValueChange={setSelectedTab}>
                                    <SelectTrigger className="w-full h-[36px] bg-[#EFF2F5] rounded-xl border-none">
                                        <SelectValue placeholder="Selecione um nível"/>
                                    </SelectTrigger>
                                    <SelectContent className="border-none">
                                        {data?.nivels_connection?.niveis?.map((item) => (
                                            <SelectItem key={item?.documentId} value={item?.documentId}>
                                                {item?.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <TabsList className="grid w-full h-[40px] lg:h-[46px] grid-cols-8 bg-[#EFF2F5] border-none">
                                    {data?.nivels_connection?.niveis?.map((item) => (
                                        <TabsTrigger
                                            key={item?.documentId}
                                            value={item?.documentId}
                                            className="text-[12px] md:text-[18px] lg:text-[16px] h-[36px] hover:bg-transparent data-[state=active]:text-[#0D1421]"
                                        >
                                            {item?.title}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            )}

                            {data?.nivels_connection?.niveis?.map((item) => {
                                const tabContent = item?.descriptions || [];

                                return (
                                    <TabsContent key={item?.documentId} value={item?.documentId} className="mt-10">
                                        {tabContent.length > 0 ? (
                                            tabContent.map((description, contentIndex) => (
                                                <Card key={contentIndex}
                                                      className="rounded-none border-none shadow-none">
                                                    <CardHeader>
                                                        <CardTitle
                                                            className="font-medium text-editor text-[#334155]"
                                                            dangerouslySetInnerHTML={
                                                                {__html: description.label}
                                                            }
                                                        />
                                                        <CardDescription
                                                            className="text-editor text-[#616E85]"
                                                            dangerouslySetInnerHTML={
                                                                {__html: description?.denominacao}
                                                            }
                                                        />
                                                    </CardHeader>
                                                </Card>
                                            ))
                                        ) : (
                                            <Card className="rounded-none border-none shadow-none">
                                                <CardHeader>
                                                    <CardTitle>{item.title}</CardTitle>
                                                    <CardDescription>Sem descrição.</CardDescription>
                                                </CardHeader>
                                            </Card>
                                        )}
                                    </TabsContent>
                                );
                            })}
                        </Tabs>
                    </>
                )}
            </div>
        </div>
    );
}
