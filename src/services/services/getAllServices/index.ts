import query from "./query";
import { mapper } from "./mapper";
import { PaginationArg, ServiceFiltersInput } from "../type";

function getFiltersTag(filters?: ServiceFiltersInput<any>, pagination?: PaginationArg) {
    let tag = "service-list";
    if (filters) {
        if (typeof filters.slug === "string") tag += `-slug:${filters.slug}`;
        else if (typeof filters.slug === "object" && "eq" in filters.slug) tag += `-slug:${filters.slug.eq}`;
        if (
            filters.topic_services &&
            typeof filters.topic_services.documentId === "object" &&
            "in" in filters.topic_services.documentId
        ) {
            tag += `-topics:${(filters.topic_services.documentId.in as string)}`;
        }
        if (
            filters.profile &&
            typeof filters.profile.documentId === "object" &&
            "eq" in filters.profile.documentId
        ) {
            tag += `-profile:${filters.profile.documentId.eq}`;
        }
    }
    if (pagination) {
        if (pagination.page) tag += `-page:${pagination.page}`;
        if (pagination.pageSize) tag += `-pageSize:${pagination.pageSize}`;
    }
    return [tag];
}

export async function getAllServices<T>(
    filters?: ServiceFiltersInput<T>,
    pagination?: PaginationArg
) {
    try {
        const token = process.env.API_TOKEN;
        const CMS_URL = process.env.CMS_URL;

        if (!CMS_URL) throw new Error("CMS_URL not set");

        const queryText =
            typeof query === "string" ? query : query.loc?.source.body;
        if (!queryText) throw new Error("Invalid GraphQL query!");

        const tags = getFiltersTag(filters, pagination);

        const res = await fetch(`${CMS_URL}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({
                query: queryText,
                variables: {
                    filters,
                    pagination,
                },
            }),
            next: {
                revalidate: 300, 
                tags,
            },
        });

        const result = await res.json();

        if (!result || !result.data) {
            throw new Error("No data returned from GraphQL");
        }

        return mapper(result.data);
    } catch (error) {
        console.error("Failed to fetch services data:", error);
        return null;
    }
}
