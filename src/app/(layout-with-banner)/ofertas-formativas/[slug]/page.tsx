import { CourseDetails } from "@/components/organisms/OfertaFormativas/DetalheOferta";
import { getAllOfertaFormativaAtivas } from "@/services/ofertas/getDataDetailOferta";
import { getAllOfertaFormativaArquivadas } from "@/services/ofertas/getDataDetailOfertaArquivadas";
import { getPageInfoDetail } from "@/services/page-detalhe-oferta/getPageOfertasDetalhes";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function PageCourseDetails(props: {
    params: Params
    searchParams: SearchParams
}) {
    const params = await props.params
    const searchParams = await props.searchParams

    const slug = params.slug;

    const tab = (searchParams.tab as string) || "ativas";

    const pageInfoDetail = await getPageInfoDetail();

    const data = tab === "arquivada" ? await getAllOfertaFormativaArquivadas({ slug: { eq: slug } }) : await getAllOfertaFormativaAtivas({ slug: { eq: slug } });

    return (
        <div className="space-y-6">
            <CourseDetails
                pageInfoDetail={pageInfoDetail || undefined}
                data={data || undefined}
            />
        </div>
    );
}
