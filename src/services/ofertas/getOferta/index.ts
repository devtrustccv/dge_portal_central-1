import { client } from "@/lib/appolo-client";
import query from "./query";
import { mapper } from "./mapper";
import { ServiceFiltersInput } from "@/services/services/type";

interface Props{
    page: number,
    pageSize: number,
    pageCount?: number,
    total?: number
}
export async function getAllOfertaFormativa<T>(
    filters?: ServiceFiltersInput<T>,
    pagination?: Props
) {

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
        console.error("Failed to fetch oferta formativa data:", error);
        return null;
    }
}
