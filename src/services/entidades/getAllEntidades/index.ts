import {EntidadesFormadoraFiltersInput, PaginationArg} from "@/services/entidades/type";
import {client} from "@/lib/appolo-client";
import query from "./query";
import {mapper} from "@/services/entidades/getAllEntidades/mapper";

export async function getAllEntidades<T>(
    filters? : EntidadesFormadoraFiltersInput<T>,
    pagination?: PaginationArg,
    sort?: string[]
){
    try {
        const { data } = await client.query({
            query,
            variables: {
                filters,
                pagination,
                sort
            },
        });

        return mapper(data);
    }
    catch (error) {
        console.error("Failed to fetch entidades data:", error);
        return null;
    }
}