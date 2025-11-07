import {getPageListConcurso} from "@/services/page-list-concurso/getPageListConcurso";

export const dynamic = "force-dynamic";
import ConcursosTemplate from "@/components/template/ConcursosTemplate";
import {notFound} from "next/navigation";

export default async function ConcursosEditais({
   searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

    try {
        const params = await searchParams;

        const data = await getPageListConcurso()
        if (!data) return notFound();

        return <ConcursosTemplate
            {...data}
            searchParams={params || {}}
        />
    } catch (error) {
        console.error("Error to get service:", error);
        return notFound();
    }

}