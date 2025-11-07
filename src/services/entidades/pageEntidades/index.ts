import {client} from "@/lib/appolo-client";
import query from "@/services/entidades/pageEntidades/query";
import {mapper} from "@/services/entidades/pageEntidades/mapper";


export async function getPageListaEntidadesFormadoras() {
    const { data, error } = await client.query({
        query: query,
    });
    if (error){
        throw error
    }

    return mapper(data);
}