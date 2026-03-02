import CVGeneratorTemplate from "@/components/template/CVGeneratorTemplate";
import {getCurriculoCv} from "@/services/get-curriculo-cv";

export default async function CVGeneratorPage() {

    const data = await getCurriculoCv();

    return <CVGeneratorTemplate data={data}/>
}
