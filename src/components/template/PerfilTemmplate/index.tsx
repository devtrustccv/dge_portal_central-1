import { Banner } from "@/components/atoms/banner"

import { CandidaturaStatusGroup } from "@/app/(layout-with-banner)/ofertas-formativas/candidatura/actions";
import { ProfileContent } from "./PerfilContent";
import { PessoaInfo } from "@/context/NavigationContext";
export interface PerfilTemplateProps {
    candidaturas?: CandidaturaStatusGroup
    pessoaInfo?: PessoaInfo

}

export default function PerfilTemplate(data: PerfilTemplateProps) {
    return (
        <div className="">
            <Banner
                title="Meu perfil"
                subTitle="Dados da minha conta"
                image="/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png"
            />
            {/*<UserPerfil candidaturas={candidaturas} />*/}
            {<ProfileContent {...data } />}
        </div>
    )
}
