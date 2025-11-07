import { client } from "@/lib/appolo-client";
import { mapper } from "./mapper";
import query from "./query";

export async function getPageInfoDetail() {
  try {
    const { data } = await client.query({
      query,
      variables: {},
    });

    return mapper(data);
  } catch (error) {
    console.error("Failed to fetch header data:", error);
  }
}
