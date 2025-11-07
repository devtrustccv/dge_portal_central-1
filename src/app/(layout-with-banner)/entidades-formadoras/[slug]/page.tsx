import {getEntidades} from "src/services/entidades/entidades";
import {getPageDetalhesEntidadesFormadoras} from "src/services/entidades/pageDetalhesEntidades";
import {IDetalhesEntidades} from "@/services/entidades/pageDetalhesEntidades/types";
import DetalhesEntidadesTemplate from "src/components/template/EntidadeListTemplate/detalhes";

export default async function DetalheEntidades({
                                                   params,
                                               }:{
    params: Promise<{ slug: string }>
}) {

    const slug = (await params).slug


    const entidade = await getEntidades({
        "slug": {
            "eq": slug
        }
    });

    const pagedata = await getPageDetalhesEntidadesFormadoras();

    const pageInfo: IDetalhesEntidades | undefined = pagedata
        ? { listaDetalhesFormadoras: pagedata.listaDetalhesFormadoras }
        : undefined;

    if (!entidade) {
        return <p>Erro ao carregar os dados da entidade.</p>;
    }

    return (
        <main>
            <DetalhesEntidadesTemplate
                data={entidade ?? undefined}
                pageInfo={pageInfo}

            />
        </main>
    );
}
