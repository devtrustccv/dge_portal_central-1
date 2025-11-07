import {getAllDocumentos} from "@/services/getDocumentoList/getAllDocumentos";

export const dynamic = "force-dynamic";
import {ComponentesSistemaQualificacoesTemplate} from "@/components/template/ComponenteSNQTemplate";
import {getPageSNQData} from "src/services/getDataSNQ";

export default async function Page() {

    const dataSnq = await getPageSNQData()

    const documentoData = await getAllDocumentos({
        topicos_servicos: {
            name: {
                eq: dataSnq?.homeBanner?.banner?.cms_topico?.name
            }
        },
    });

    return <ComponentesSistemaQualificacoesTemplate
        data={dataSnq}
        documentoData={documentoData}
    />
}