import {IEntidade} from "@/services/entidades/entidades/types";

export function mapper(response: any): IEntidade[] | null {
    if(!response || !response?.entidadesFormadoras_connection.nodes) return [];

    const data = response?.entidadesFormadoras_connection.nodes;



    return data?.map((item:any)=>({
            slug : item.slug ?? "",
            documentId : item.documentId ?? "",
            name : item.name ?? "",
            ilha : item.ilha ?? "",
            concelho : item.concelho ?? "",
            zona : item.zona ?? "",
            long_latitude : item.long_latitude ?? "",
            contactos : item.contacts?.map((contact: any) => ({
                title : contact.title ?? "",
                type : contact.type ?? "",
                value : contact.value ?? "",
            })),
            alvara_entidade : item.alvara_entidade?.map((alvara:any)=>({
                estabelecimento: alvara.estabelecimento ?? "",
                number: alvara.number ?? "",
                address: alvara.address ?? "",
                date_init : alvara.date_init ?? "",
                date_end :alvara.date_end ?? "",
                estado: alvara.estado ?? "",
                url_alvara: alvara.url_alvara ?? "",
            })),
            formacoes : item.formacoes?.map((form:any)=>({
                name : form.name ?? "",
                nivel : form.nivel ?? "",
                familia: form.familia ?? "",
                metodologia : form.metodologia ?? "",
                modalidade : form.modalidade ?? "",
                num_alvara : form.num_alvara ?? "",
            }))

        }))

}