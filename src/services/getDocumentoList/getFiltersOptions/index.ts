import { client } from "@/lib/appolo-client";
import query from "./query";
import { mapper } from "./mapper";
export async function getFiltersOptionsDoc(
) {
    try {
        const { data } = await client.query({
            query,

        });

        return mapper(data);
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }
}
