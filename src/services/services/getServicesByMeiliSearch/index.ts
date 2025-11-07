"use server";

import { meiliClient } from "@/lib/meilisearchClient";

interface ServiceSearchParams {
  search?: string;
  page?: number;
  perPage?: number;
  filterObject?: {
    profile?: string;
    active_policie?: string;
    topic_services?: string;
  };
}

export async function getServicesByMeiliSearch({
  search = "",
  page = 1,
  perPage = 10,
  filterObject,
}: ServiceSearchParams) {
  try {
    const filterClauses: string[] = [];

    if (filterObject?.profile) {
      const slugs = filterObject.profile.split("&").map((slug) => `'${slug.trim()}'`);
      filterClauses.push(`profile.slug IN [${slugs.join(", ")}]`);
    }

    if (filterObject?.active_policie) {
      const slugs = filterObject.active_policie.split("&").map((slug) => `'${slug.trim()}'`);
      filterClauses.push(`active_policie.slug IN [${slugs.join(", ")}]`);
    }

    if (filterObject?.topic_services) {
      const slugs = filterObject.topic_services.split("&").map((slug) => `'${slug.trim()}'`);
      filterClauses.push(`topic_services.slug IN [${slugs.join(", ")}]`);
    }

    const filter = filterClauses.join(" AND ");

    const searchResults = await meiliClient.index("dge-service").search(search, {
      filter,
      offset: (page - 1) * perPage,
      limit: perPage,
    });

    return {
      hits: searchResults.hits,
      total: searchResults.estimatedTotalHits,
      page,
      perPage,
    };
  } catch (error) {
    console.error("Error fetching services from MeiliSearch:", error);
    throw error;
  }
}
