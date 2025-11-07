'use client'
import {Banner} from "@/components/atoms/banner";
import {INode} from "@/services/catalogo/getDetalheQualificacao/Types/type";
import {ProgrammingIntroProfile} from "@/components/template/DetalhesQualificacao/ProgrammingIntroProfile";
import {IOfertasFormativasData} from "@/services/ofertas/types";
import {IPageDetalheCnq} from "@/services/page-detalhes-cng/type/page-info";

interface IDetalhePageCnq extends IPageDetalheCnq{
    data: INode[] | undefined
    catalogo: IOfertasFormativasData | null
}

export function DetalhesQualificacaoTemplate({
    data,
    catalogo,
    title,
    headerImage,
}: IDetalhePageCnq) {

    const image = headerImage?.formats?.medium?.url || '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png'

    return (
        <div>
            {data?.map(item => (
                <div key={item?.documentId}>
                    <Banner
                        title={title}
                        subTitle={`${item?.familia} - Nível ${item?.nivel}`}
                        subTitle2={item?.description}
                        image={image}
                    />

                    <div className="mb-12">{/*container*/}
                        <ProgrammingIntroProfile
                            catalogo={catalogo}
                            data={item}
                            dataTabs={data}
                        />
                    </div>
                </div>
            ))}

        </div>
    );
}