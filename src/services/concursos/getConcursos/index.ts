import {client} from "@/lib/appolo-client";
import query from "./query";
import {mapper} from "./mapper";
import {ConcursoFiltersInput} from "@/services/concursos/types";


export async function getConcursos<T>(
    filters?: ConcursoFiltersInput<T>
) {
    try {
        const { data } = await client.query({
            query,
            variables: {
                filters,
            },
        });

        return mapper(data);
    } catch (error) {
        console.error("Failed to fetch concurso data:", error);
        return null;
    }
}