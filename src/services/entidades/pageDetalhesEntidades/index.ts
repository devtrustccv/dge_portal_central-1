import {client} from "@/lib/appolo-client";
import query from "@/services/entidades/pageDetalhesEntidades/query";
import {mapper} from "@/services/entidades/pageDetalhesEntidades/mapper";



export async function getPageDetalhesEntidadesFormadoras() {
    const { data, error } = await client.query({
        query: query,
    });
    if (error){
        throw error
    }

    return mapper(data);
}