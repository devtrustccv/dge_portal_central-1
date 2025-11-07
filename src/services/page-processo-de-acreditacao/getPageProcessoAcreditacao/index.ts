import {client} from "@/lib/appolo-client";
import query from "@/services/page-processo-de-acreditacao/getPageProcessoAcreditacao/query";
import {mapper} from "@/services/page-processo-de-acreditacao/getPageProcessoAcreditacao/mapper";

export async function getPageProcessoAcreditacao() {
    try {
        const { data } = await client.query({
            query,
        });

        return mapper(data);
    } catch (error) {
        console.error("Failed to fetch header data:", error);
    }
}