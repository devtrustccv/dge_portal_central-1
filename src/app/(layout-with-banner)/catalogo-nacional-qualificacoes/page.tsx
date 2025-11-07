import {getPageCatalogoNacionalQualificacoes} from "@/services/catalogo/getDataCatalogSNG";
import {FormacoesCatalogoTemplate} from "@/components/template/CatalogoNacionalTemplate";
import {getDetalheQualificacao} from "@/services/catalogo/getDetalheQualificacao";
import {getCatalogoByMeiliSearch} from "@/services/catalogo/getDataMeilliSeachCatalogo/getaDataMeilliSearchCatalogo";
import {notFound} from "next/navigation";

export default async function Page({
    searchParams
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const params = await searchParams;

    const page = params?.page ? Number(params.page) || 1 : 1;
    const searchQuery = String(params?.search || "");

    const nivel = params?.nivel ? String(params.nivel) : undefined;

    const familia = params?.familia ? String(params.familia) : undefined;

    const requisito_acesso = params?.requisito_acesso ? String(params.requisito_acesso) : undefined;

    const flag_catalogo = params?.flag_catalogo !== undefined ? params.flag_catalogo === 'true' : undefined;

    const ref_rvcc = params?.ref_rvcc !== undefined ? params.ref_rvcc === 'true' : undefined;

    const filterObject = {
        nivel,
        familia,
        requisito_acesso,
        ref_rvcc,
        flag_catalogo
    };

    const dataPageInfoCatalog = await getPageCatalogoNacionalQualificacoes();
    const highlightedCatalogo = await getDetalheQualificacao({}, { page: 1, pageSize: 3 });

    const data = await getCatalogoByMeiliSearch({
        search: searchQuery,
        page,
        perPage: 4,
        filterObject
    });

    if (!dataPageInfoCatalog) return notFound();

    return <FormacoesCatalogoTemplate
                highlightedData={highlightedCatalogo?.nodes || []}
                {...dataPageInfoCatalog}
                initialDataMeilli={data}
                searchParams={params || {}}
            />
}