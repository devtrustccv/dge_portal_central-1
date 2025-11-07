export const dynamic = "force-dynamic";
import ProcessoAcreditacaoTemplate from "@/components/template/ProcessoAcreditacaoTemplate";
import {getPageProcessoAcreditacao} from "@/services/page-processo-de-acreditacao/getPageProcessoAcreditacao";
import {getAllServices} from "@/services/services/getAllServices";
import {getAllEntidades} from "@/services/entidades/getAllEntidades";
import NotFound from "next/dist/client/components/not-found-error";
import {getAllDocumentos} from "@/services/getDocumentoList/getAllDocumentos";

export default async function ProcessoAcreditacao(){
    const data = await getPageProcessoAcreditacao();

    const serviceData = await getAllServices({
        topic_services: {
            name: {
                eq: data?.cms_topico?.name
            }
        },
    });
    const entidadeData = await getAllEntidades(
        {}, // Sem filtros específicos
        { page: 1, pageSize: 8 }, // Pegamos apenas os 8 últimos
        ["publishedAt:desc"] // Ordenar do mais recente para o mais antigo
    );
    const documentoData = await getAllDocumentos({
        topicos_servicos: {
            name: {
                eq: data?.cms_topico?.name
            }
        },
    });

    if (!data) return <NotFound/>;

    return <ProcessoAcreditacaoTemplate documentoData={documentoData} data={data} serviceData={serviceData?.nodes} entidades={entidadeData?.nodes}/>;
}