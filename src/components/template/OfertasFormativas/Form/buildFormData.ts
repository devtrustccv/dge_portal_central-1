import { PessoaInfo } from "@/context/NavigationContext";
import { FormValues } from "./schema";
import { ICursosPorps, OptionsProps } from "./type";

export function buildFormData(
     data: FormValues,
    user: PessoaInfo,
    options: OptionsProps,
    originalContacts: any[],
    originalFormacoes: any[],
    originalEnderecos: any[],
    candidatoId?: string,
    codigoCandidatura?: string,
    originalCursos?: ICursosPorps[],
): FormData {
    const fd = new FormData();

    if (candidatoId) {
        fd.append("id", candidatoId);
        fd.append("codigoCandidatura", codigoCandidatura ?? "");
    }

    fd.append("pessoaId", String(user.id));
    fd.append("nia", data.nia ?? "");
    fd.append("nif", data.nif);
    fd.append("problemaSaude", data.problemaSaude ?? "");
    fd.append(
        "descricaoProblema", data.tipoProblemaSaude ?? "");
    fd.append(
        "periodoDisponivel", data.periodoDisponivel ?? "");
    fd.append("origem", "PORTAL");

    if (candidatoId && originalEnderecos.length > 0) {
        const orig = originalEnderecos[0];
        const unchanged =
            orig.ilhaId === data.ilha &&
            orig.concelhoId === data.concelho &&
            orig.morada === data.morada &&
            String(orig.enderecoAtual) === String(data.agreeWithAddress);

        if (unchanged) {
            fd.append("endereco.id", String(orig.id));
        } else {
            fd.append("endereco.id", String(orig.id));
            fd.append("endereco.isDelete", "true");
        }
    }
    fd.append("endereco.ilhaId", data.ilha);
    fd.append("endereco.concelhoId", data.concelho);
    fd.append("endereco.morada", data.morada);
    fd.append("endereco.enderecoAtual", String(data.agreeWithAddress));
    if (data.comprovativo_morada?.[0] instanceof File) {
        fd.append("endereco.comprovativo_morada", data.comprovativo_morada[0]);
    }

    const updatedContactIds = new Set<string>();
    data.contatos.forEach((c, i) => {
        fd.append(`contatos[${i}].tpContato`, c.tipoContato);
        fd.append(`contatos[${i}].contato`, c.contato);
        fd.append(`contatos[${i}].proprietario`, c.pertenceAoD);
        if (c.id) {
            fd.append(`contatos[${i}].id`, c.id);
            updatedContactIds.add(String(c.id));
        }
    });
    if (candidatoId) {
        const removedContacts = originalContacts?.filter(
            orig => !updatedContactIds.has(String(orig.id))
        );
        removedContacts.forEach((orig, idx) => {
            const pos = data.contatos.length + idx;
            fd.append(`contatos[${pos}].id`, String(orig.id));
            fd.append(`contatos[${pos}].isDelete`, "true");
            fd.append(`contatos[${pos}].tpContato`, orig.tipoContato);
            fd.append(`contatos[${pos}].contato`, orig.contato);
            fd.append(`contatos[${pos}].proprietario`, orig.pertenceAoD);
        });
    }

    const updatedFormacaoIds = new Set<string>();
    data.formacoes.forEach((f, i) => {
        fd.append(`infoAcademicos[${i}].anoEscolar`, f.anoEscolar);
        fd.append(`infoAcademicos[${i}].mediaHl`, String(f.media));
        fd.append(`infoAcademicos[${i}].areaEstudo`, f.areaEstudo ?? "");
        fd.append(`infoAcademicos[${i}].formacao`, f.areaEstudo ?? "");
        if (f.id) {
            fd.append(`infoAcademicos[${i}].id`, f.id);
            updatedFormacaoIds.add(String(f.id));
        }
        if (f.file instanceof File) {
            fd.append(`infoAcademicos[${i}].file`, f.file);
        }
    });
    if (candidatoId) {
        const removedFormacoes = originalFormacoes.filter(
            orig => !updatedFormacaoIds.has(String(orig.id))
        );
        removedFormacoes.forEach((orig, idx) => {
            const pos = data.formacoes.length + idx;
            fd.append(`infoAcademicos[${pos}].id`, String(orig.id));
            fd.append(`infoAcademicos[${pos}].isDelete`, "true");
            fd.append(`infoAcademicos[${pos}].anoEscolar`, orig.anoEscolar);
            fd.append(`infoAcademicos[${pos}].mediaHl`, String(orig.mediaHl));
            fd.append(`infoAcademicos[${pos}].areaEstudo`, orig.areaEstudo ?? "");
            fd.append(`infoAcademicos[${pos}].formacao`, orig.areaEstudo ?? "");
        });
    }

    const updatedQualifIds = new Set<string>();
    const cursosArray = Object.values(data.cursoOrdem);

    cursosArray.forEach((curso, i) => {
        const qualif = curso.referencia_formacao;
        fd.append(`candidatosCursos[${i}].ordemPreferencia`, String(i + 1));
        fd.append(`candidatosCursos[${i}].qualifOfertaId`, qualif);

        const origMatch = originalCursos?.find(
            o => String(o.qualifOfertaId) === qualif
        );
        if (origMatch) {
            fd.append(
                `candidatosCursos[${i}].id`,
                String(origMatch.cursoCandatoId)
            );
        }

        updatedQualifIds.add(qualif);
    });


    if (candidatoId && originalCursos) {
        const removedCursos = originalCursos.filter(
            orig => !updatedQualifIds.has(String(orig.qualifOfertaId))
        );
        removedCursos.forEach((orig, idx) => {
            const pos = cursosArray.length + idx;
            fd.append(`candidatosCursos[${pos}].id`, String(orig.cursoCandatoId));
            fd.append(`candidatosCursos[${pos}].isDelete`, "true");
            fd.append(
                `candidatosCursos[${pos}].ordemPreferencia`,
                String(orig.ordemPreferencia)
            );
            fd.append(
                `candidatosCursos[${pos}].qualifOfertaId`,
                String(orig.qualifOfertaId)
            );
        });
    }

    return fd;
}
