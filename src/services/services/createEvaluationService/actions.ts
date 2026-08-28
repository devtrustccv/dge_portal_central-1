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
        if (errors?.length) {
            console.error(`Evaluation service mutation returned ${errors.length} error(s).`);
        }
        return data;
    } catch (e: any) {
        console.error("Failed to create evaluation service.");
        throw new Error(e.message);
    }
}
