export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import { getPageListaOfertasEmprego } from "@/services/page-list-ofertas-emprego/getPage";
import { ListaOfertaEmpregoTemplate } from "@/components/template/OfertaEmpregoTemplate";

export default async function PageOfertasEmprego({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const data = await getPageListaOfertasEmprego();
    if (!data) return notFound();

    const params = await searchParams;
    return (
      <ListaOfertaEmpregoTemplate
        {...data}
        searchParams={(params) || {}}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return notFound();
  }
}
