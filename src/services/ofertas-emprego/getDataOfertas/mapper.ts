import { IPagination } from "@/services/ofertas/types";
import { IOfertaEmprego } from "../type";

export function mapper(response: any): {
  nodes: IOfertaEmprego[];
  pageInfo?: IPagination;
} | null {
  if (!response) return null;

  const data = response?.ofertaEmpregoEstagios_connection.nodes;

  return {
    nodes: data,
  };
}
