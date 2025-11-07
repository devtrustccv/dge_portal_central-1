import { ServiceTemplate } from "@/components/template/ServicesDetailsTemplate";
import { getAllServices } from "@/services/services/getAllServices";
import { getService } from "@/services/services/getService";
import { notFound } from "next/navigation";
import {pageDetalheServicosDigitais} from "@/services/services/page-detalhe-servicos-digitais";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    const service = await getService({
        "slug": {
            "eq": slug
        }
    })
    if (!service) return notFound();
    const topicIds = service?.topicServices
        ?.map((ts) => ts.documentId)
        .join(",");
    const relatedServices = await getAllServices({
        "topic_services": {
            "documentId": {
                "in": topicIds,
            }
        },
        "slug": {
            "ne": service?.slug
        }, 
        "profile": {
            "documentId": {
                "eq": service?.profile?.documentId
            }
        }
    }, { page: 1, pageSize: 4 });

    const pageDetalheService = await pageDetalheServicosDigitais();
    return (
        <ServiceTemplate {...service} dataDetalhe={pageDetalheService} relatedServices={relatedServices?.nodes || []} />
    )
}


