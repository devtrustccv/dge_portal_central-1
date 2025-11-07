'use client'
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SidebarFilter } from "@/components/molecules/FiltersBeta";
import { SaibaMais } from "@/components/atoms/saiba-mais";
import { IPageListaServicoData } from "@/services/page-list-oferta/type";
import { setCookie } from "nookies";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/atoms/tabs";
import { CandidaturasAbertas } from "@/components/template/OfertaFormativaTemplates/components/CandidaturasAbertas";
import { FormacoesEmExecucao } from "@/components/template/OfertaFormativaTemplates/components/FormacoesEmExecucao";

export interface IPageOfertaFormativaData extends IPageListaServicoData {
    searchParams: { [key: string]: string | string[] | undefined };
}

export function ListaOfertaFormativaTemplates({
  configs,
  saiba_mais,
  searchParams,
}: IPageOfertaFormativaData) {
    const router = useRouter();
    const params = useSearchParams();

    const [activeTab, setActiveTab] = useState<string>(
        (params.get("tab") as string) || "ativas"
    );

    const [loading, setLoading] = useState(true);
    const [oferta, setOferta] = useState<{
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    }>({ hits: [], total: 0, page: 1, perPage: 3 });
    const [ofertaArquivadas, setOfertaArquivadas] = useState<{
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    }>({ hits: [], total: 0, page: 1, perPage: 3 });
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);

    const page = searchParams?.page ? Number(searchParams.page) : 1;

    const handleLogin = () => {
        const redirectPath = `${process.env.NEXT_PUBLIC_SITE_URL}/ofertas-formativas/candidatura?cursos=${selectedItems?.join(",")}`;
        setCookie(null, "redirect_path", redirectPath, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });
        const callbackUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
        const loginUrl = `${process.env.NEXT_PUBLIC_CENTRAL_BASE_URL}/api/auth/external/login?redirectUrl=${encodeURIComponent(callbackUrl)}`;
        window.location.href = loginUrl;
    };

    const handleSelectCard = (documentId: string) => {
        if (selectedItems.includes(documentId)) {
            const updatedItems = selectedItems.filter(item => item !== documentId);
            setSelectedItems(updatedItems);
            if (showAlert && updatedItems.length < 3) setShowAlert(false);
        } else if (selectedItems.length < 3) {
            setSelectedItems([...selectedItems, documentId]);
        } else {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 10000);
        }
    };

    function capitalizeFirstLetter(str: string) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const formattedConfigs = configs?.map((group: any) => ({
        ...group,
        items: group.items.map((item: any) => ({
            ...item,
            label: capitalizeFirstLetter(item.label)
        }))
    }));

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        const newParams = new URLSearchParams(window.location.search);
        newParams.set("tab", value);
        router.replace(`?${newParams.toString()}`, { scroll: false });
    };

    useEffect(() => {
        const currentTab = params.get("tab");
        if (!currentTab) {
            router.replace("?tab=ativas", { scroll: false });
            setActiveTab("ativas");
        } else if (currentTab !== activeTab) {
            setActiveTab(currentTab);
        }
    }, [params]);

    return (
        <div className="container w-auto h-auto mt-16 flex flex-col justify-center">
            <div className="grid grid-cols-0 lg:grid-cols-[auto_1fr] gap-x-0 md:gap-x-12">
                {configs && (
                    <div className="text-white hidden lg:block h-auto py-3">
                        <SidebarFilter data={(formattedConfigs as any) ?? []}/>
                    </div>
                )}

                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full h-[44px] grid-cols-2 bg-[#EFF2F5] text-[#616E85]">
                        <TabsTrigger value="ativas" className="w-full h-[36px] md:px-1 lg:px-4 text-md lg:text-lg rounded-[13px]
                         text-[#616E85] data-[state=active]:text-[#334155]
                         data-[state=active]:bg-[#FFFFFF] whitespace-nowrap"
                        >
                            Candidaturas Abertas
                        </TabsTrigger>

                        <TabsTrigger value="arquivada" className="w-full h-[36px] md:px-1 lg:px-4 text-md lg:text-lg rounded-[13px]
                         text-[#616E85] data-[state=active]:text-[#334155]
                         data-[state=active]:bg-[#FFFFFF] whitespace-nowrap"
                        >
                            Formações em Execução
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="ativas">
                        <CandidaturasAbertas
                            formattedConfigs={formattedConfigs}
                            loading={loading}
                            setLoading={setLoading}
                            oferta={oferta}
                            setOferta={setOferta}
                            handleLogin={handleLogin}
                            showAlert={showAlert}
                            setShowAlert={setShowAlert}
                            selectedItems={selectedItems}
                            handleSelectCard={handleSelectCard}
                            page={page}
                            searchParams={searchParams}
                            pathname={""}
                        />
                    </TabsContent>

                    <TabsContent value="arquivada">
                        <FormacoesEmExecucao
                            formattedConfigs={formattedConfigs}
                            loading={loading}
                            setLoading={setLoading}
                            ofertaArquivadas={ofertaArquivadas}
                            setOfertaArquivadas={setOfertaArquivadas}
                            handleLogin={handleLogin}
                            showAlert={showAlert}
                            setShowAlert={setShowAlert}
                            page={page}
                            searchParams={searchParams}
                            pathname={""}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            <div className="mt-16">
                {saiba_mais && <SaibaMais title="Saiba Mais" data={saiba_mais} />}
            </div>
        </div>
    );
}
