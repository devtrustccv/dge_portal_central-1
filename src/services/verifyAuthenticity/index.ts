'use server'
import {customFetchBaseAPI} from "@/lib/customBaseServiceFetch";

export interface IContraProva {
    status: boolean;
    msg: string;
    contraProva: string;
    link: string;
    dtValidade: string | null;
    descricao: string;
}

export async function getverifyAuthenticity({contraProva}:{contraProva: string}) {
    const data = await customFetchBaseAPI<IContraProva>(
        `/contraprova/validar/${contraProva}`,
        {
            method: "GET"
        }
    );

    return data;
}
