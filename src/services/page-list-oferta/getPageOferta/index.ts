import query from "./query";
import {client} from "@/lib/appolo-client";
import {mapper} from "./mapper";

export async function getPageListaOfertasFormativas() {
    const { data, error } = await client.query({
        query: query,
    });

    if (error){
        throw error
    }

     return mapper(data);
}