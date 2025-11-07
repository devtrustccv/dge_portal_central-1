import { client } from "@/lib/appolo-client";
import query from "./query";
import { mapper } from "./mapper";
import { ServiceFiltersInput } from "../type";

export async function pageDetalheServicosDigitais<T>(
    filters?: ServiceFiltersInput<T>
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
        console.error("Failed to fetch services data:", error);
        return null;
    }
}
