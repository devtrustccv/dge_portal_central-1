import { notFound } from "next/navigation";
import { getPageListaProgramaEmpresarial } from "@/services/page-list-programa-empresarial/getPage";
import { ListaProgramaEmpresarialTemplates } from "@/components/template/ProgramaEmpresarialTemplates";
import { getAllDocumentos } from "@/services/getDocumentoList/getAllDocumentos";
import { getListaProgramas } from "@/services/page-list-programa-empresarial/getListaProgramas";
import { getAllServices } from "@/services/services/getAllServices";
export const revalidate = 60
export default async function PageProgramaEmpresarial() {
  try {
    const data = await getPageListaProgramaEmpresarial();



    if (!data) return notFound();

    const serviceData = await getAllServices({
      topic_services: { 
        name: { 
          eq: data?.cms_topico?.name 
        } 
      },
    });

    const documentoData = await getAllDocumentos({
      topicos_servicos: {
        name: { 
          eq: data?.cms_topico?.name 
        }
      },
    });
    const programasData = await getListaProgramas();

    const documentoDataFilter = documentoData?.filter((documento) =>
      documento.topicos_servicos?.some(
        (topico) => topico.name === data?.cms_topico?.name
      )
    );

    return (
      <ListaProgramaEmpresarialTemplates
        {...data}
        serviceData={serviceData?.nodes}
        documentoData={documentoDataFilter}
        programasData={programasData}
      />
    );
  } catch (error) {
    console.error("Error to get service:", error);
    return notFound();
  }
}
