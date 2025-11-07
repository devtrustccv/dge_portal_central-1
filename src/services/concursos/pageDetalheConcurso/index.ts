import {client} from "@/lib/appolo-client";
import query from "./query";
import {mapper} from "./mapper";

export async function getPageDetalhesConcurso() {
    const { data, error } = await client.query({
        query: query,
    });
    if (error){
        throw error
    }

    return mapper(data);
}