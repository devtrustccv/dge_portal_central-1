import { client } from "@/lib/appolo-client";
import query from "./query";
import { mapper } from "./mapper";

export async function getMenuData() {
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