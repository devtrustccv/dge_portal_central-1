
import query from "./query";
import {client} from "@/lib/appolo-client";
import {mapper} from "@/services/pageListaOfertaFormativaArquivadas/mapper";

export async function getPageListaOfertaFormativaPrevista() {
    const { data, error } = await client.query({
        query: query,
    });

    if (error){
        throw error
    }

    console.log("========================");
    console.log({data: data});
    console.log("========================");
    return mapper(data);
}