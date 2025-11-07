"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/atoms/accordion";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/atoms/select";
import React, { useEffect, useState } from "react";

interface SectionRequisitosProps {
    geral: {
        id?: string,
        title: string;
        description: string;
        tabs: {
            id?: string,
            label: string;
            description: string;
            list_contents: {
                id?: string;
                questions: string;
                response: string;
            }[];
        }[];
    };
}

const SectionRequisitos: React.FC<SectionRequisitosProps> = ({ geral }) => {
    const defaultTabValue = geral?.tabs?.[0]?.label || "";
    const [selectedTab, setSelectedTab] = useState(defaultTabValue);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <section className="container">
            <p className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155] leading-9 md:leading-[56px] tracking-[0]">
                {geral?.title}
            </p>
            <h1 className="font-poppins font-light text-[16px] leading-[28px] tracking-[1%] mt-8 text-editor"
                dangerouslySetInnerHTML={{ __html: geral?.description || "" }}
            />

            {/* Alterna entre Select (Mobile) e Tabs (Desktop) */}
            {isMobile ? (
               <div className="mt-7 mb-7">
                   <Select value={selectedTab} onValueChange={setSelectedTab} >
                       <SelectTrigger className="w-full h-[44px] bg-[#EFF2F5] rounded-xl border-none mb-4">
                           <SelectValue placeholder="Selecione uma opção" />
                       </SelectTrigger>
                       <SelectContent className="border-none">
                           {geral?.tabs.map((item, index) => (
                               <SelectItem key={index} value={item.label}>
                                   {item.label}
                               </SelectItem>
                           ))}
                       </SelectContent>
                   </Select>
               </div>
            ) : (
                <Tabs defaultValue={defaultTabValue} value={selectedTab} onValueChange={setSelectedTab} className="w-full mb-8 mt-8">
                    <TabsList className="w-full h-[44px] flex rounded-[16px] bg-[#EFF2F5]">
                        {geral?.tabs.map((item, index) => (
                            <TabsTrigger key={index} value={item.label} className="w-full h-[36px] md:px-1 lg:px-4 text-md md:text-md lg:text-lg rounded-[13px] text-[#616E85] data-[state=active]:text-[#334155] data-[state=active]:bg-[#FFFFFF] whitespace-nowrap">
                                {item.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            )}

            {/* Exibição do conteúdo baseado na aba selecionada */}
            <Tabs value={selectedTab} className="w-full">
                {geral?.tabs.map((item, index) => (
                    <TabsContent key={index} value={item.label}>
                        <h1 className="font-poppins font-light text-[16px] leading-[28px] tracking-[1%] text-editor text-[#616E85]"
                            dangerouslySetInnerHTML={{ __html: item?.description || "" }}
                        />
                        <div className="mt-8">
                            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                                {item?.list_contents?.map((content, index) => {
                                    const hasResponse = !!content?.response;
                                    return(
                                            <AccordionItem key={index} value={`item-${index}`} display="custom">
                                                <AccordionTrigger hasResponse={hasResponse} className="text-[#334155]">
                                                    {content?.questions}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="text-editor text-[#616E85]"
                                                        dangerouslySetInnerHTML={{ __html: content?.response || "" }}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                    )
                                })}
                            </Accordion>

                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
};

export default SectionRequisitos;
