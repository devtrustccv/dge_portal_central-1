export const dynamic = "force-dynamic";
import DicasApoioCarreiraTemplate from "src/components/template/DicasCarreiraTemplate";
import {getPageDicasCarreira} from "@/services/page-dica/getPageDicasCarreira";
import NotFound from "next/dist/client/components/not-found-error";

export default async function PageDicasCarreira(){

    const data = await getPageDicasCarreira();
    if (!data) return <NotFound/>;

    return <DicasApoioCarreiraTemplate data={data}/>
}
