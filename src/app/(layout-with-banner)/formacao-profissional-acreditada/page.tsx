import {notFound} from "next/navigation";
import {FormacaoAcreditadaTemplate} from "@/components/template/FormacaoAcreditadaTemplate";
import {getPageListaQualificacaoAcreditada} from "@/services/page-list-formacao-acreditada/getListQualificacaoAcreditada";

import {
    getQualificacaoAcreditadaByMeiliSearch
} from "@/services/page-list-formacao-acreditada/getListQualificacaoAcreditadaMeille";
export default async function Page({
   searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    //============== Pegando valor da url ====================
       /* const headersList = await headers();
        const referer = headersList.get("referer") || "";
        const url = referer.split("/").pop();*///
    //========================================================

    const params = await searchParams;

    const page = params?.page ? Number(params.page) || 1 : 1;
    const searchQuery = String(params?.search || "");

    const nivel = params?.nivel ? String(params.nivel) : undefined;

    const familia = params?.familia ? String(params.familia) : undefined;

    const modalidade = params?.modalidade ? String(params.modalidade) : undefined;

    const metodologia = params?.metodologia ? String(params.metodologia) : undefined;

    const flag_catalogo = params?.flag_catalogo !== undefined ? params.flag_catalogo === 'true' : undefined;

    const filterObject = {
        nivel,
        familia,
        modalidade,
        metodologia,
        flag_catalogo
    };

    const dataPageInfoListQualficacaoAcreditada = await getPageListaQualificacaoAcreditada();

    const data = await getQualificacaoAcreditadaByMeiliSearch({
        search: searchQuery,
        page,
        perPage: 4,
        filterObject
    });

    if (!dataPageInfoListQualficacaoAcreditada) return notFound();

    return <FormacaoAcreditadaTemplate
                {...dataPageInfoListQualficacaoAcreditada}
                initialDataMeilli={data}
                searchParams={params || {}}
            />
}