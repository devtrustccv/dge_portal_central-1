import { ISiteInfo } from "../type";


export const mapper = (data: any): ISiteInfo | null => {
    if (!data?.siteInfo) return null;
  
    return {
      logo: {
        url: data.siteInfo.logo?.url || "",
      },
      logo_white: {
        url: data.siteInfo.logo_white?.url || "",
      },
      site_name: data.siteInfo.site_name || "",
    };
  };
  