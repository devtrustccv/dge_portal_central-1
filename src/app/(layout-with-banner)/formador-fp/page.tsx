export const dynamic = "force-dynamic";
import FotmadorFpTemplate from "@/components/template/FotmadorFpTemplate";
import NotFound from "next/dist/client/components/not-found-error";
import {getPageFormadorFp} from "@/services/page-formador-fp/getPageFormadorFp";
import {getAllDocumentos} from "@/services/getDocumentoList/getAllDocumentos";
import {getAllServices} from "@/services/services/getAllServices";

export default async function FormadorFp(){

    const data = await getPageFormadorFp();

    if (!data) return <NotFound/>;

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
                eq: data?.cms_topico?.name
            }
        },
    });




    return <FotmadorFpTemplate documentoData={documentoData} data={data}  serviceData={serviceData?.nodes}/>
}