import {DetalhesQualificacaoTemplate} from "@/components/template/DetalhesQualificacao";
import {getDetalheQualificacao} from "@/services/catalogo/getDetalheQualificacao";
import {getAllOfertaFormativa} from "@/services/ofertas/getOferta";
import NotFound from "@/app/not-found";
import {getPageDetalhesCng} from "@/services/page-detalhes-cng";

export default async function Page({
   params,
} : {
    params: Promise<{slug: string}>
}){
    const slug = ( await params).slug

    const pageInfo = await getPageDetalhesCng();

    const data = await getDetalheQualificacao({
        "slug": {
            "eq": slug
        }
    });

    const catalogo = await getAllOfertaFormativa();

    if (!data?.nodes?.length) return <NotFound/>;

    return <DetalhesQualificacaoTemplate data={data?.nodes} catalogo={catalogo}{...pageInfo}/>
}