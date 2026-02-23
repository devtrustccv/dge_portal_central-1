import {Banner} from "@/components/atoms/banner";
import {ListaOfertaFormativaTemplates} from "@/components/template/OfertaFormativaTemplates";
import {notFound} from "next/navigation";
import {getPageListaOfertasFormativas} from "@/services/page-list-oferta/getPageOferta";
import {getPageListaOfertaFormativaArquivadas} from "@/services/pageListaOfertaFormativaArquivadas";
import {getPageListaOfertaFormativaPrevista} from "@/services/pageListaOfertasFormativaPrevista";
export const dynamic = "force-dynamic";
type TabType = 'ativas' | 'formacao_prevista' | 'arquivada';

export default async function PageOfertaFormativas({searchParams}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    try {
        const params = await searchParams;

        const data = await getPageListaOfertasFormativas();
        const dataPrevista = await getPageListaOfertaFormativaPrevista();
        const dataArquivadas = await getPageListaOfertaFormativaArquivadas();

        if (!data || !dataArquivadas || !dataPrevista) return

        const tab = (params?.tab as TabType) ?? 'ativas';

        const titleByTab: Record<TabType, string | undefined> = {
            ativas: data?.title,
            arquivada: dataArquivadas?.title,
            formacao_prevista: dataPrevista?.title,
        };
        const configsByTab: Record<TabType, unknown> = {
            ativas: data?.configs,
            arquivada: dataArquivadas?.configs,
            formacao_prevista: dataPrevista?.configs,
        };
        const subTitleByTab: Record<TabType, string | undefined> = {
            ativas: data?.subtitle,
            arquivada: dataArquivadas?.subtitle,
            formacao_prevista: dataPrevista?.subtitle,
        };

        const rawConfigs = configsByTab[tab];

        const validConfigs = Array.isArray(rawConfigs) ? rawConfigs : undefined;

        return (
            <div>
                <Banner
                    title={titleByTab[tab]}
                    subTitle={subTitleByTab[tab]}
                    image={data?.headerImage?.formats?.medium?.url}
                />
                <ListaOfertaFormativaTemplates
                    searchParams={params || {}}
                    data={validConfigs}
                />
            </div>
        );
    } catch (error) {
        console.error("Error to get service:", error);
        return notFound();
    }
}
