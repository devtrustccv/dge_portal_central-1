import {client} from "@/lib/appolo-client";
import query from "./query";
import {mapper} from "./mapper";
import {ApoiIncentivoFiltersInput} from "@/services/apoioIncentivo/types";



export async function getDetalhesApoiIncentivo<T>(
    filters?: ApoiIncentivoFiltersInput<T>
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