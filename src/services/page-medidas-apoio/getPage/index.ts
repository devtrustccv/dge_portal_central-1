import query from "./query";
import { client } from "@/lib/appolo-client";
import { mapper as mapperExtra } from "@/services/page-extra-info/mapper";
import { mapper } from "./mapper";

export async function getPageMedidasApoio() {
  const { data, error } = await client.query({
    query: query,
  });

  if (error) {
    throw error;
  }

  const defaultData = mapperExtra(data);

  const mappedData = {
    ...defaultData,
    ...mapper(data),
  }
  
  return mappedData
}
