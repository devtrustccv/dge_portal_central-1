"use client"
import { SaibaMais } from "@/components/atoms/saiba-mais";
import { Banner } from "@/components/atoms/banner";
import SectionEstatistica from "@/components/molecules/ProcessoAcreditacao/sectionEstatistica";
import { IPageMedidasApoio } from "@/services/page-medidas-apoio/type";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import SectionDocumentosRelevantes from "@/components/molecules/ProcessoAcreditacao/sectionDocumentos";
import ConcursosSection from "./concursos";
import React, {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/atoms/select";

export function MedidasDeApoioPageTemplate({
  title,
  subtitle,
  subtitle2,
  description,
  saiba_mais,
  headerImage,
  session_statistic,
  session_entity,
  session_concursos,
  medidas,
  concursos,
}: IPageMedidasApoio) {

    const defaultTabValue = medidas?.[0]?.documentId || "";
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
    <div>
      <Banner
        title={title}
        subTitle={subtitle}
        subTitle2={subtitle2}
        image={
          headerImage?.url ||
            "/unsplash_d3nKNw1ILdM.png"
        }
      />

      <div className="container mt-16">
        <h1
          className="text-editor text-[#616E85]"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </div>

        <div className="container w-auto h-auto mt-[60px]">
            <div className="mb-[39px]">
                <h1 className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155]  tracking-[0%]">
                    {session_entity?.title}
                </h1>
                <p
                    className="text-editor text-[#616E85]"
                    dangerouslySetInnerHTML={{__html: session_entity?.description || ""}}
                />
            </div>

                {isMobile ? (
                    <div className="mt-7 mb-7">
                        <Select value={selectedTab} onValueChange={setSelectedTab}>
                            <SelectTrigger className="w-full h-[44px] bg-[#EFF2F5] rounded-xl border-none mb-4">
                                <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                            <SelectContent className="border-none">
                                {medidas?.map((item) => (
                                    <SelectItem key={item.documentId} value={item.documentId}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ) : (
                    <Tabs
                        defaultValue={defaultTabValue}
                        value={selectedTab}
                        onValueChange={setSelectedTab}
                        className="w-full mb-8 mt-8"
                    >
                        <TabsList className="w-full h-[44px] flex rounded-[16px] bg-[#EFF2F5] border-0">
                            {medidas?.map((tab) => (
                                <TabsTrigger
                                    key={tab.documentId}
                                    value={tab.documentId}
                                    className="w-full h-[36px] md:px-1 lg:px-4 text-md md:text-md lg:text-lg rounded-[13px] text-[#616E85] data-[state=active]:text-[#334155] data-[state=active]:bg-[#FFFFFF] whitespace-nowrap"
                                >
                                    {tab.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                )}

                {/* Conteúdo das Tabs, sempre exibido conforme a aba selecionada */}
                <Tabs value={selectedTab} className="w-full">
                    {medidas?.map((tab) => (
                        <TabsContent key={tab.documentId} value={tab.documentId}>
                            <div className="flex flex-col gap-5 lg:gap-20 md:flex-row md:items-center w-full">
                                <div
                                    className="text-editor mt-6 text-[#616E85] text-[14px] md:text-base "
                                    dangerouslySetInnerHTML={{ __html: tab?.description || "" }}
                                />
                            </div>
                            <div className="mt-[100px]">
                                {tab?.documents_relevant && (
                                    <SectionDocumentosRelevantes
                                        data={{
                                            description: tab?.documents_relevant.description,
                                            label: tab?.documents_relevant.title,
                                        }}
                                        documentos={tab?.documents_relevant?.document_list || []}
                                    />
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>


        </div>

        {session_statistic?.title && (
            <div className="mt-20">
                <SectionEstatistica statistics={session_statistic}/>
            </div>

        )}

        {session_concursos?.title && (
            <ConcursosSection
                data={session_concursos}
          concursos={concursos ?? []}
        />
      )}



      <div className="container w-auto h-auto">
        {saiba_mais && <SaibaMais title={"Saiba Mais"} data={saiba_mais} />}
      </div>
    </div>
  );
}
