"use client";

import { IPageInfo } from "@/services/page-info/type";

import { TipoOfertaProvider } from "@/app/(layout-with-banner)/emprego/tipo-oferta-context";
import OfertasContent from "./OfertasContent";

export interface IPageOfertaEmpregoData extends IPageInfo {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function ListaOfertaEmpregoTemplate(props: IPageOfertaEmpregoData) {
  return (
    <TipoOfertaProvider>
      <OfertasContent {...props}/>
    </TipoOfertaProvider>
  );
}
