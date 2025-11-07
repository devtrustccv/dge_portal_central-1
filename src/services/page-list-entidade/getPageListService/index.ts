import {client} from "@/lib/appolo-client";
import query from "@/services/page-list-entidade/getPageListService/query";
import {mapper} from "@/services/page-list-entidade/getPageListService/mapper";



export async function getPageListEntidade() {
    try {
        const { data } = await client.query({
            query,
            variables: {
                sort: "order:asc",
            },
        });

        return mapper(data);
    } catch (error) {
        console.error("Failed to fetch header data:", error);
    }
}