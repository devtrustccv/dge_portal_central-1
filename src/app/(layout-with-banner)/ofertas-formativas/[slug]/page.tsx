import { CourseDetails } from "@/components/organisms/OfertaFormativas/DetalheOferta";
import { getAllOfertaFormativaAtivas } from "@/services/ofertas/getDataDetailOferta";
import { getAllOfertaFormativaArquivadas } from "@/services/ofertas/getDataDetailOfertaArquivadas";
import { getPageInfoDetail } from "@/services/page-detalhe-oferta/getPageOfertasDetalhes";

export default async function PageCourseDetails({
    params,
    searchParams
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
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
