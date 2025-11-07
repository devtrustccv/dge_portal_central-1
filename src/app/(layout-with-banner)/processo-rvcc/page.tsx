import { ProcessoRVCCTemplate } from "@/components/template/ProcessoRVCCTemplate/processoRVCCTemplate";
import { getDataProcessoRVCC } from "@/services/getDataProcessoRVCC";
import { getAllEntidades } from "@/services/entidades/getAllEntidades";
import { getAllDocumentos } from "@/services/getDocumentoList/getAllDocumentos";
import {getAllServices} from "@/services/services/getAllServices";

export default async function Page() {
    const data = await getDataProcessoRVCC();
    const entidades = await getAllEntidades({}, {}, ["publishedAt:desc"]);
    const serviceData = await getAllServices({
        topic_services: {
            name: {
                eq: data?.homeBanner?.banner?.cms_topico?.name
            }
        },
    })
    const documentoData = await getAllDocumentos({
        topicos_servicos: {
            name: {
                eq: data?.homeBanner?.banner?.cms_topico?.name
            }
        },
    });

    const latestEntidades = entidades?.nodes.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(0);
            const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(0);
            return dateB.getTime() - dateA.getTime(); // Ordena decrescentemente pelas datas
        }).slice(0, 8); // Pega os 8 últimos

    return <ProcessoRVCCTemplate docs={documentoData} services={serviceData?.nodes} entidades={latestEntidades ?? []} data={data}/>
}
