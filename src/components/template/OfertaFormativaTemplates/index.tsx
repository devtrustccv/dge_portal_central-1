'use client'
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SidebarFilter } from "@/components/molecules/FiltersBeta";
import { SaibaMais } from "@/components/atoms/saiba-mais";
import { IPageListaServicoData } from "@/services/page-list-oferta/type";
import { setCookie } from "nookies";
import {
    Tabs,
    TabsContent
} from "@/components/atoms/tabs";
import { CandidaturasAbertas } from "@/components/template/OfertaFormativaTemplates/components/CandidaturasAbertas";
import { FormacoesEmExecucao } from "@/components/template/OfertaFormativaTemplates/components/FormacoesEmExecucao";
import {OfertaTabsList} from "@/components/template/OfertaFormativaTemplates/components/OfertaTabsList";
import {FormacoesPrevista} from "@/components/template/OfertaFormativaTemplates/components/FormacoesPrevista";

export interface IPageOfertaFormativaData extends IPageListaServicoData {
    searchParams: { [key: string]: string | string[] | undefined };
    data: any | null
}

export function ListaOfertaFormativaTemplates({
  searchParams,
  data
}: IPageOfertaFormativaData) {
    const router = useRouter();
    const params = useSearchParams();
    //const [formattedConfigs, setFormattedConfigs] = useState<any>()

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
    const [ofertaFormacaoPrevista, setOfertaFormacaoPrevista] = useState<{ hits: any[]; total: number; page: number; perPage: number; }>({ hits: [], total: 0, page: 1, perPage: 3 });

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

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

    const formattedConfigs = data?.map((group: any) => ({
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
    }, [activeTab, params, router]);

    return (
        <div className="container w-auto h-auto mt-16 flex flex-col justify-center">
            <div className="grid grid-cols-0 lg:grid-cols-[auto_1fr] gap-x-0 md:gap-x-12">
                {data && data.length > 0 ? (
                    <div className="h-full text-white hidden lg:block py-3">
                        <SidebarFilter data={(formattedConfigs as any) ?? {}}/>
                    </div>
                ):(
                    <div className="h-[100px] flex justify-center items-center bg-[#2370BB] p-6 rounded-2xl">
                        <p className='text-white'>Sem filtros no momento</p>
                    </div>
                )}

                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    {isMobile ? (
                        <div className="w-full mb-4">
                            <select
                                className="w-full h-[40px] bg-[#EFF2F5] rounded-xl px-3 text-[#334155]"
                                value={activeTab}
                                onChange={(e) => handleTabChange(e.target.value)}
                            >
                                <option value="ativas">Candidaturas Abertas</option>
                                <option value="arquivada">Formações em Execução</option>
                            </select>
                        </div>
                    ) : (
                        /* TabsList */
                        <OfertaTabsList/>
                    )}

                    {/* TAB CONTENT ATIVAS */}
                    <TabsContent value="ativas">
                        <CandidaturasAbertas
                            oferta={oferta}
                            setOferta={setOferta}
                            formattedConfigs={formattedConfigs}
                            loading={loading}
                            setLoading={setLoading}
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

                    {/* TAB CONTENT PREVISTAS */}
                    <TabsContent value="formacao_prevista">
                        <FormacoesPrevista
                            ofertaFormacaoPrevista={ofertaFormacaoPrevista}
                            setOfertaFormacaoPrevista={setOfertaFormacaoPrevista}
                            formattedConfigs={formattedConfigs}
                            loading={loading}
                            setLoading={setLoading}
                            handleLogin={handleLogin}
                            showAlert={showAlert}
                            setShowAlert={setShowAlert}
                            selectedItems={selectedItems}
                            page={page}
                            searchParams={searchParams}
                            pathname={""}
                        />
                    </TabsContent>

                    {/* TAB CONTENT ARQUIVADAS */}
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
                {data?.saiba_mais && <SaibaMais title="Saiba Mais" data={data?.saiba_mais} />}
            </div>
        </div>
    );
}
