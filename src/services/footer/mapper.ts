import {IFooter} from "@/services/footer/types";


export const mapper  = (response : any): IFooter =>{


    const { footer } = response;

    return {
        logo: footer?.logo  ?? { url: "" },
        social_midia : footer.social_midia?.map((item: any)=>({
            logo : item?.logo || '',
            name : item?.name || '',
            url : item?.url || '',
        })) || [],
        contact : footer.contact?.map((item: any) => ({
            label : item.label || '',
            url : item.url || '',
            external_link : item.external_link ?? false,
        })) || [],
        site_map_title : footer.site_map_title,
        site_map : footer.site_map?.map((item: any) => ({
            label : item.label || '',
            url : item.url || '',
            external_link : item.external_link ?? false,
        })) || [],
        useful_links_title : footer.useful_links_title,
        usefull_links : footer.usefull_links?.map((item: any) => ({
            label : item.label || '',
            url : item.url || '',
            external_link : item.external_link ?? false,
        })) || [],
        client : footer?.client?.map((item : any)=>({
            name : item.name || '',
            url : item.url || '',
            logo: item.logo || '',
        }))

    };
};