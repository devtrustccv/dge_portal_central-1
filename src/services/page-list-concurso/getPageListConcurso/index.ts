import {client} from "@/lib/appolo-client";
import query from "@/services/page-list-concurso/getPageListConcurso/query";
import {mapper} from "@/services/page-list-concurso/getPageListConcurso/mapper";

export async function getPageListConcurso() {
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