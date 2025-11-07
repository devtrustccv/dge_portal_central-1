import  query  from "./query";
import { mapper  } from "./mapper";
import {client} from "@/lib/appolo-client";
export async function getFooterData() {
    const { data, error } = await client.query({
        query: query,
        //variables: { locale },
    });

    if (error) {
        throw error;
    }

    return mapper(data);
}