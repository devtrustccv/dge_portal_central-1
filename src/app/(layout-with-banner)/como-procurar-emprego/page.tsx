export const dynamic = "force-dynamic";
import ComoProcurarEmpregoTemplate from "@/components/template/ComoProcurarEmpregoTemplate";
import {getPageComoProcurarEmprego} from "@/services/page-dica/getPageComoProcurarEmprego";
import NotFound from "@/app/not-found";

export default async function PageComoProcurarEmprego(){
    const data = await getPageComoProcurarEmprego();
    if (!data) return <NotFound/>;

    return(
        <ComoProcurarEmpregoTemplate data={data}/>
    )
}