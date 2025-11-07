export const dynamic = "force-dynamic";
import DocumentosTemplate from "@/components/template/DocumentoListaTemplate";
import {getPageListDocumentos} from "@/services/page-list-documentos/getPageListDocuments";
import {notFound} from "next/navigation";
import {getDocumentoByMeiliSearch} from "@/services/getDocumentoList/getDocumentosByMeiliSearch";
import {getFiltersOptionsDoc} from "@/services/getDocumentoList/getFiltersOptions";

export default async function ListaDocumentos({
    searchParams
                                        }:{
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;

}){
    try {
        const params = await searchParams;
        const dataPage = await getPageListDocumentos();
        if (!dataPage) return notFound();


        const page = params?.page ? Number(params.page) || 1 : 1;
        const searchQuery = String(params?.search || "");
        const tipo_documento = params?.tipo_documento ? String(params.tipo_documento) : undefined;
        const politicas_ativas = params?.politicas_ativas ? String(params.politicas_ativas) : undefined;
        const topicos_servicos = params?.topicos_servicos ? String(params.topicos_servicos) : undefined;
        const data_fim = params?.data_fim ? String(params.data_fim) : undefined;
        const data_inicio = params?.data_inicio ? String(params.data_inicio) : undefined;
        const filterObject = {
            tipo_documento,
            topicos_servicos,
            politicas_ativas,
            data_fim,
            data_inicio,
        }
        const DocumentoMeili = await getDocumentoByMeiliSearch({
            search: searchQuery,
            page,
            perPage: 6,
            filterObject
        })
         const filtersConfig = await getFiltersOptionsDoc()

        return <DocumentosTemplate
            filtersConfigs={filtersConfig || []}
            initialDocumentos={DocumentoMeili}
            searchParams={params || {}} {...dataPage}

        />
    }catch (error) {
        console.error("Error to get service:", error);
        return notFound();
    }

}