import {client} from "@/lib/appolo-client";
import query from "@/services/entidades/entidades/query";
import {mapper} from "@/services/entidades/entidades/mapper";
import {EntidadeFiltersInput, PageInfo} from "@/services/entidades/entidades/types";


export async function getEntidades<T>(
    filters?: EntidadeFiltersInput<T>,
    pagination?: PageInfo
){
    try {
        const { data } = await client.query({
            query,
            variables: {
                filters,
                pagination
            },
        });

        return mapper(data);
    } catch (error) {
        console.error("Failed to fetch entidade formadora data:", error);
        return null;
    }
}