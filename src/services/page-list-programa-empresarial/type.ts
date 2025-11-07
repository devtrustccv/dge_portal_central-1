import { IPageInfo } from "@/services/page-info/type";

export interface IPageListaProgramaEmpresarialData extends IPageInfo {
  cms_topico?: {
    name?: string;
    slug?: string;
  };
  session_service: {
    title: string;
    description: string;
    button: {
      label: string;
      url: string;
      external_link: boolean; // Add external_link is true not string -- Kevin Sousa
    };
  };
  session_statistic: {
    title: string;
    description: string;
    statistic_data: {
      label: string;
      number: string;
    }[];
    acion: {
      label: string;
      url: string;
      external_link: boolean; // Add external_link is true not string -- Kevin Sousa
    };
  };
  session_doc_relev: {
    label: string;
    description: string;
  };

  session_entity: {
    title: string;
    description: string;
    image: {
      formats: string;
      url: string;
    };
    acion: {
      label: string;
      url: string;
      external_link: boolean;
    };
  };
}
