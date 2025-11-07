import { IAllDocumenNode } from "@/services/getDocumentoList/getAllDocumentos/types";
import { IPageExtraInfo } from "../page-extra-info/type";
import { IConcursoNode } from "../concursos/types";

export interface IPageMedidasApoio extends IPageExtraInfo {
  medidas?: IMedidasApoio[];
  concursos?: IConcursoNode[];
  session_concursos?: {
    title: string;
    description: string;
    button: {
      url: string;
      label: string;
      external_link: boolean;
    };
  };
}

export interface IMedidasApoio {
  name?: string;
  description?: string;
  documentId: string;
  image?: {
    url?: string;
  };
  documents_relevant: IDocuments;
}

export interface IDocuments {
  title: string;
  description: string;
  document_list: Array<IAllDocumenNode>;
}
