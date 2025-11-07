import { ICandidatoResponse } from "@/app/(layout-with-banner)/ofertas-formativas/candidatura/actions";
import { PessoaInfo } from "@/context/NavigationContext";
import { FormValues } from "./schema";
import { IOfertaFormativaListItem } from "@/services/ofertas/types";

export function mapApiToForm(d: ICandidatoResponse, user: PessoaInfo, cursos: IOfertaFormativaListItem[]): FormValues {
    const candidato = d.candidato;
    const end = d.enderecos?.[0];
    const cursoOrdem = Object.fromEntries(
        cursos.map((c, i) => [
            `curso${i}`,
            c,
        ])
    );

    return {
        ilha: end?.ilhaId ?? user.ilha_id ?? "",
        concelho: end?.concelhoId ?? user.concelho_id ?? "",
        morada: end?.morada ?? user.bairro ?? "",
        contatos: d.contatos.map((c) => ({
            id: c.id,
            tipoContato: c.tpContato,
            contato: c.contato,
            pertenceAoD: c.proprietario,
        })),
        nif: candidato.nif ?? user.nif ?? "",
        nia: candidato.nia ?? "",
        problemaSaude: candidato.problemaSaude ?? "",
        tipoProblemaSaude: candidato.descricaoProblema ?? "",
        periodoDisponivel: candidato?.periodoDisponivel ?? "",
        formacoes: d.infosAcademicas.map((f: any) => ({
            id: String(f.id),
            anoEscolar: String(f.anoEscolar),
            media: Number(f.mediaHl),
            areaEstudo: f.areaEstudo ?? "",
        })),
        cursoOrdem,
        concordaTermos: false,
        agreeWithAddress: end?.enderecoAtual === "true",
        comprovativo_morada: null,
    };
}
