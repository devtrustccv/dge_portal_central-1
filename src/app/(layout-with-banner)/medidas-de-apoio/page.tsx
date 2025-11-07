import { notFound } from "next/navigation";
import { getPageMedidasApoio } from "@/services/page-medidas-apoio/getPage";
import { MedidasDeApoioPageTemplate } from "@/components/template/MedidasDeApoioTemplate";

import { getConcursos } from "@/services/concursos/getConcursos";

export default async function MedidasDeApoioPage() {
  try {
    const data = await getPageMedidasApoio();

    if (!data) return notFound();

    const concursos = await getConcursos({
      estado: {
        eq: true,
      },
    });

    return (
      <MedidasDeApoioPageTemplate {...data} concursos={concursos ?? []} />
    );
  } catch (error) {
    console.error("Error to get service:", error);
    return notFound();
  }
}
