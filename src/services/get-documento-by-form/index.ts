"use server";

import { customFetch } from "@/lib/customFetch";

export interface ILocationProps {
  label: string;
  value: string;
}

export interface ILocalizacaoParams {
  formulario_referente: "DOCUMENTOS_IDENTIFICACAO";
}
export async function getDocumentByForm(
  params: ILocalizacaoParams
) {
  const data = await customFetch<any>(`/combobox/tipo_documento?formulario_referente=${params?.formulario_referente}`, {
    method: "GET",
  });
  return data
}