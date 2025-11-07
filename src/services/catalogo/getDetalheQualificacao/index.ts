import {ServiceFiltersInput} from "@/services/services/type";
import {client} from "@/lib/appolo-client";
import query from "@/services/catalogo/getDetalheQualificacao/query";
import {mapper} from "@/services/catalogo/getDetalheQualificacao/mapper";

interface Props {
    page: number,
    pageSize: number,
    pageCount?: number,
    total?: number
}

export async function getDetalheQualificacao<T>(
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

       return  mapper(data);

    } catch (error) {
        console.error("Failed to fetch oferta formativa data:", error);
        return null;
    }
}
