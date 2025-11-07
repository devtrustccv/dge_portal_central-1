import query from "./query";
import {client} from "@/lib/appolo-client";
import {mapper} from "@/services/pageListaOfertaFormativa/mapper";

export async function getPageListaOfertaFormativa() {
    const { data, error } = await client.query({
        query: query,
    });

    if (error){
        throw error
    }

     return mapper(data);
}