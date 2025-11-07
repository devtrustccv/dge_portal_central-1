export const dynamic = "force-dynamic";
import EntidadeListTemplate from "@/components/template/EntidadeListTemplate";
import {getPageListEntidade} from "@/services/page-list-entidade/getPageListService";
import {notFound} from "next/navigation";
import {getEntidadesByMeiliSearch} from "@/services/entidades/getEntidadesByMeiliSearch";
import {getAllEntidades} from "@/services/entidades/getAllEntidades";

export default async function EntidadesFormadoras({
                                                      searchParams,
                                                  }: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    try {
        const params = await searchParams;

        const data = await getPageListEntidade();
        if (!data) return notFound();

        const page = params?.page ? Number(params.page) || 1 : 1;
        const searchQuery = String(params?.search || "");

        const concelho = params?.ilha ? String(params.ilha) : undefined;
        const familia = params?.familia ? String(params.familia) : undefined;
        const modalidade = params?.modalidade ? String(params.modalidade) : undefined;
        const metodologia = params?.metodologia ? String(params.metodologia) : undefined;

        const filterObject = {
            concelho,
            familia,
            modalidade,
            metodologia,
        };

        const entidadeByMeili = await getEntidadesByMeiliSearch({
            search: searchQuery,
            page,
            perPage: 8,
            filterObject,
        }) || { hits: [], page: 1, total: 0, totalPages: 1 };

        const allEntidades = await getEntidadesByMeiliSearch({
            search: "",
            all: true,
        }) || { hits: [], total: 0 };

        const highlightedEntidadesResult = await getAllEntidades({}, { page: 1, pageSize: 3 });
        const highlightedEntidades = highlightedEntidadesResult?.nodes || [];

        return (
            <EntidadeListTemplate
                highlightedEntidades={highlightedEntidades}
                {...data}
                initialEntidades={entidadeByMeili}
                allEntidades={allEntidades}
                searchParams={params || {}}
            />
        );
    } catch (error) {
        console.error("Error to get service:", error);
        return notFound();
    }
}