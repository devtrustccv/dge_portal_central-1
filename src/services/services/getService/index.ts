import query from "./query";
import { mapper } from "./mapper";
import { ServiceFiltersInput } from "../type";

export async function getService<T>(filters?: ServiceFiltersInput<T>) {
    try {
        const token = process.env.API_TOKEN;
        const CMS_URL = process.env.CMS_URL;

        if (!CMS_URL) throw new Error("CMS_URL not set");

        let tag: string[] = ["service"];
        if (
            filters?.slug &&
            typeof filters.slug === "object" &&
            "eq" in filters.slug &&
            typeof filters.slug.eq === "string"
        ) {
            tag = [`service-${filters.slug.eq}`];
        }

        const res = await fetch(`${CMS_URL}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({
                query: typeof query === "string" ? query : query.loc?.source.body,
                variables: { filters },
            }),
            next: {
                revalidate: 60 * 5,
                tags: tag,
            },
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

        const { data } = await res.json();
        return mapper(data);
    } catch (error) {
        console.error("Failed to fetch services data:", error);
        return null;
    }
}
