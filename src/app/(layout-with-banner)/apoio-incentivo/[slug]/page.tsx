import PageDetalheApoiIncentivoTemplate from "@/components/template/ApoioIncentivoTemplate/detalhe";
import {
    getPageDetalheApoioIncentivo
} from "@/services/apoioIncentivo/page-detalhe-apoio-incentivo/getPageApoioIncentivo";
import {getDetalhesApoiIncentivo} from "@/services/apoioIncentivo/getAllApoio";
import {getAllDocumentos} from "@/services/getDocumentoList/getAllDocumentos";
import {getAllServices} from "@/services/services/getAllServices";
import {IPageDetalheApoioIncentivoData} from "@/services/apoioIncentivo/page-detalhe-apoio-incentivo/types";
import {notFound} from "next/navigation";

export default async function DetalheApoio({
    params
                                           }:{
    params: Promise<{ slug: string }>
}){

    const slug = (await params).slug
    const apoio = await getDetalhesApoiIncentivo({
        "slug": {
            "eq": slug
        }
    })
    if (!apoio) return notFound();





    const data = await getPageDetalheApoioIncentivo();
    const pageInfo: IPageDetalheApoioIncentivoData | null | undefined = data

    const documentoData = await getAllDocumentos({
        topicos_servicos: {
            name: {
                eq: data?.cms_topico?.name
            }
        },
    });

    const serviceData = await getAllServices({
        topic_services: {
            name: {
                eq: pageInfo?.cms_topico?.name
            }
        },
    });


    return(
        <PageDetalheApoiIncentivoTemplate data={pageInfo ?? undefined}
                                          dataFindId={apoio}
                                          documentoData={documentoData}
                                          serviceData={serviceData?.nodes}
        />
    )
}