import CVGeneratorTemplate from "@/components/template/CVGeneratorTemplate";
import {getCurriculoCv} from "@/services/get-curriculo-cv";
import {getMyAccount} from "@/app/auth/actions";

export default async function CVGeneratorPage() {

    const userData = await getMyAccount("valor-do-fingerprint");

    const data = await getCurriculoCv({
        email: {
            eq: userData?.email || ""
        }
    });

    return <CVGeneratorTemplate data={data} ownerEmail={userData?.email || ""}/>
}
