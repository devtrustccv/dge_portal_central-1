import {client} from "@/lib/appolo-client";
import query from "@/services/page-list-documentos/getPageListDocuments/query";
import {mapper} from "@/services/page-list-documentos/getPageListDocuments/mapper";

export async function getPageListDocumentos() {
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