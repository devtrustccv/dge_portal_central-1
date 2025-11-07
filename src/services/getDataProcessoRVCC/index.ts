import { client } from "@/lib/appolo-client";
import query from "@/services/getDataProcessoRVCC/query";
import {mapper} from "@/services/getDataProcessoRVCC/mapper";

export async function getDataProcessoRVCC(){

    try {
        const { data } = await client.query({
            query,
            variables: {
                sort: "order:asc",
            },
        })

        return mapper(data);

 /*       console.log("========================");
        console.log({dataMapper: dataMapper});
        console.log("========================");*/

    }catch (error){
        console.error("Failed to fetch header data:", error);
    }

}