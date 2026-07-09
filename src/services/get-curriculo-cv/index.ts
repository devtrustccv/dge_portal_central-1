import {client} from "@/lib/appolo-client";
import query from "./query";
import {mapper} from "./mapper";
import {CurriculoFilters, ServiceFiltersInput} from "@/services/get-curriculo-cv/type";

export async function getCurriculoCv(
    filters?: ServiceFiltersInput<CurriculoFilters>
) {
    try {

        const {data} = await client.query({
            query,
            variables: {
                filters
            }
        });

        return mapper(data);

    } catch (error) {
        console.error("Failed to fetch curriculo cv:", error);
        return null;
    }
}