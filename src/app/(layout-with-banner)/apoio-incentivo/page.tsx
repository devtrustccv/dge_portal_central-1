import {notFound} from "next/navigation";
export const dynamic = "force-dynamic";
import ApoioIncentivoTemplate from "@/components/template/ApoioIncentivoTemplate";
import {getAllServices} from "@/services/services/getAllServices";
import {getPageApoioIncentivo} from "@/services/page-apoio-incentivo/getPageApoioIncentivo";
import {getAllDocumentos} from "@/services/getDocumentoList/getAllDocumentos";
import NotFound from "next/dist/client/components/not-found-error";

export default async function ApoioIncentivo({
     searchParams,
 }:{
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;

}){
   try {
       const params = await searchParams;
       const data = await getPageApoioIncentivo();

       if (!data) return <NotFound/>;
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

       return <ApoioIncentivoTemplate searchParams={params || {}} data={data} documentoData={documentoData} serviceData={serviceData?.nodes}/>

   }catch (error){
       console.error("Error to get service:", error);
       return notFound();
   }
}