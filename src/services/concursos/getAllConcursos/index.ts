import {ConcursoFiltersInput, PaginationArg} from "@/services/concursos/types";
import {client} from "@/lib/appolo-client";
import query from "@/services/services/getAllServices/query";
import {mapper} from "@/services/services/getAllServices/mapper";

export async function getAllConcursos<T>(
    filters?: ConcursoFiltersInput<T>,
    pagination?: PaginationArg
){
    try{
        const { data } = await client.query({
            query,
            variables: {
                filters,
                pagination,
            },
        });
        return mapper(data);
    } catch (error){
        console.error("Failed to fetch services data:", error);
        return null;
    }
}