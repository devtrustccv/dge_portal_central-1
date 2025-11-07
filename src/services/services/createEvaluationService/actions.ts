"use server"
import mutation from "./mutation";
import { client } from "@/lib/appolo-client";

export async function createEvaluationService(dataForm: string) {
    const dataJson = JSON.parse(dataForm);
    try {
        const { data, errors } = await client.mutate({
            mutation,
            variables: {
                data: dataJson,
            },
        });
        console.log({ errors })
        return data;
    } catch (e: any) {
        console.error({ e });
        throw new Error(e.message);
    }
}

