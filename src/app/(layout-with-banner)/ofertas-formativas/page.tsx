import {Banner} from "@/components/atoms/banner";

export const dynamic = "force-dynamic";
import {ListaOfertaFormativaTemplates} from "@/components/template/OfertaFormativaTemplates";
import {notFound} from "next/navigation";
import {getPageListaOfertasFormativas} from "@/services/page-list-oferta/getPageOferta";

export default async function PageOfertaFormativas({searchParams}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    try {
        const params = await searchParams;
        const data = await getPageListaOfertasFormativas();

        if (!data) return notFound();

        return (
            <div className="">
                <Banner
                    title={data?.title}
                    subTitle={data?.subtitle}
                    image={data?.headerImage?.formats?.medium?.url}
                />
                    <ListaOfertaFormativaTemplates searchParams={params || {}}{...data}/>
            </div>
        )
    } catch (error) {
        console.error("Error to get service:", error);
        return notFound();
    }
}
