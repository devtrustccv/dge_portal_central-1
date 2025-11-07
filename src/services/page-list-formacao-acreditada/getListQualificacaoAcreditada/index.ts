import {client} from "@/lib/appolo-client";
import query from "@/services/page-list-formacao-acreditada/getListQualificacaoAcreditada/query";
import {mapper} from "@/services/page-list-formacao-acreditada/getListQualificacaoAcreditada/mapper";

export async function getPageListaQualificacaoAcreditada() {

    const {data, error} = await client.query({
        query: query,
    });

    if (error){
        throw error
    }

    return mapper(data);

}