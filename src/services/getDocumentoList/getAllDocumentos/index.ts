import { client } from "@/lib/appolo-client";
import query from "./query";
import { mapper } from "./mapper";
import { DocumentoFiltersInput } from "../types";

export async function getAllDocumentos<T>(filters?: DocumentoFiltersInput<T>) {
  try {
    const { data } = await client.query({
      query,
      variables: {
        filters,
      },
    });

    return mapper(data);
  } catch (error) {
    console.error("Failed to fetch header data:", error);
  }
}
