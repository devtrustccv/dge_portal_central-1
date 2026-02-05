import { CourseDetails } from "@/components/organisms/OfertaFormativas/DetalheOferta";
import { getAllOfertaFormativaAtivas } from "@/services/ofertas/getDataDetailOferta";
import { getAllOfertaFormativaArquivadas } from "@/services/ofertas/getDataDetailOfertaArquivadas";
import { getAllOfertaFormativaPrevista } from "@/services/ofertas/getDataDetailOfertaPrevista";
import { getPageInfoDetail } from "@/services/page-detalhe-oferta/getPageOfertasDetalhes";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PageCourseDetails(props: {
    params: Params;
    searchParams: SearchParams;
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const slug = params.slug;

    const tab = (searchParams.tab as string) ?? "ativas";

    const pageInfoDetail = await getPageInfoDetail();

    const dataFetchers: Record<string, () => Promise<any>> = {
        ativas: () => getAllOfertaFormativaAtivas({ slug: { eq: slug } }),
        formacao_prevista: () => getAllOfertaFormativaPrevista({ slug: { eq: slug } }),
        arquivada: () => getAllOfertaFormativaArquivadas({ slug: { eq: slug } }),
    };

    const fetchData = dataFetchers[tab] ?? dataFetchers["ativas"];
    const allData = await fetchData();

    const flatData: any[] = Array.isArray(allData.nodes)
        ? allData.nodes
        : Array.isArray(allData)
            ? allData
            : [];

    const ofertaUnica = flatData.find((item: any) => item.slug === slug);

    const dataForComponent = {
        nodes: ofertaUnica ? [ofertaUnica] : [],
    };

    return (
        <div className="space-y-6">
            <CourseDetails
                tab={tab}
                pageInfoDetail={pageInfoDetail || undefined}
                data={dataForComponent}
            />
        </div>
    );
}
