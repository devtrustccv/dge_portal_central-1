import DetalhesConcursosTemplate from "@/components/template/ConcursosTemplate/detalhes";
import {getPageDetalhesConcurso} from "@/services/concursos/pageDetalheConcurso";
import {IPageDetalheConcurso} from "@/services/concursos/pageDetalheConcurso/types";
import {getConcursos} from "@/services/concursos/getConcursos";
import {getConcursoByMeiliSearch} from "@/services/concursos/getConcursoByMeiliSearch";
import NotFound from "@/app/not-found";


export default async function ConcursoDetalhe({
  params,
}:{
    params: Promise<{ slug: string }>
}){

    const slug = (await params).slug
    const concurso = await getConcursos({
        "slug": {
            "eq": slug
        }
    })
    if (!concurso) return <NotFound/>;
    const documentIdToExclude = slug;
    const concursoMeili = await getConcursoByMeiliSearch({
        excludeDocumentId: documentIdToExclude,
    })


    const pageData = await getPageDetalhesConcurso()

    const pageInfo: IPageDetalheConcurso | null | undefined = pageData


    return(
        <div>
            <DetalhesConcursosTemplate pageInfo={pageInfo  ?? undefined}
               dataFindId={concurso}
               initialConcursos={concursoMeili}
            />
        </div>
    )
}