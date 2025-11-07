import {CourseDetails} from "@/components/organisms/OfertaFormativas/DetalheOferta";
import {getAllOfertaFormativa} from "@/services/ofertas/getDataDetailOferta";
import {getPageInfoDetail} from "@/services/page-detalhe-oferta/getPageOfertasDetalhes";

export default async function PageCourseDetails({
    params
} : {
    params: Promise<{ slug: string }>
}) {
    const slug = ( await params).slug

    const pageInfoDetail = await getPageInfoDetail();

    const data = await getAllOfertaFormativa(
        {
            "slug": {
                "eq": slug
            }
        }
    );

    return (
        <div className="space-y-6">
            <CourseDetails
                pageInfoDetail={pageInfoDetail || undefined}
                data={data || undefined}
            />
        </div>
    );
}