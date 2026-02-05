import query from "./query";
import {client} from "@/lib/appolo-client";
import {mapper} from "@/services/pageListaOfertasFormativaPrevista/mapper";

export async function getPageListaOfertaFormativaPrevista() {
    const { data, error } = await client.query({
        query: query,
    });

    if (error){
        throw error
    }
    return mapper(data);
}