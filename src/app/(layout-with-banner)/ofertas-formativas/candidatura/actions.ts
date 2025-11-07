"use server";

import { getMyAccount } from "@/app/auth/actions";
import { customFetch } from "@/lib/customFetch";


export interface Candidato {
  id: number;
  date_create: string;
  date_update: string;
  nome: string;
  numDocumento: string;
  periodoDisponivel: string;
  tipoDocumento: string;
  dataNascimento: string;
  dataEmissao: string;
  dataValidade: string;
  nacionalidade: string | null;
  sexo: string;
  nia: string;
  nivelCsu: string;
  problemaSaude: string;
  descricaoProblema: string;
  origem: string;
  statusCandidatura: string;
  status: string;
  pessoaId: number;
  orgId: number;
  pontuacao: number | null;
  nif: string;
  codigoCandidatura: string;
}

export interface Contato {
  id: number;
  tpContato: string;
  tpContatoDesc: string;
  contato: string;
  proprietario: string;
  proprietarioDesc: string;
}

export interface InfoAcademica {
  anoEscolar: number;
  descricaoAnoEscolar: string;
  candidatoId: number;
  mediaHl: number;
  formacao: string;
  status: string;
  areaEstudo: string;
  areaEstudoDesc: string | null;
}

export interface Endereco {
  id: number;
  date_create: string;
  date_update: string;
  ilhaId: string;
  ilha: string;
  concelhoId: string;
  concelho: string;
  morada: string;
  candidatoId: number;
  status: string;
  enderecoAtual: string;
}

export interface Curso {
  cursoCandatoId: number;
  qualifOfertaId: number;
  ordemPreferencia: number;
  denominacaoQualif: string;
  nomeEntidade?: string;
  concelho: string;
  dataFim: string;
  dataInicioCurso: string;
  nivel: string;
}

export interface ICandidatoResponse {
  candidato: Candidato;
  contatos: Contato[];
  infosAcademicas: InfoAcademica[];
  enderecos: Endereco[];
  cursos: Curso[];
}

export interface ICandidatura {
  id: number
  nome: string
  statusCandidatura: string
  codigoCandidatura: string
  pontuacao: number | null
  dateCreate: string
  cursos: Curso[]
  statusCandidaturaCode: string,
  dataFimCandidatura: string,
}
export interface CandidaturaStatusGroup {
  candidaturas_activas: ICandidatura[];
  candidaturas_arquivadas: ICandidatura[];
}
export async function enviarCandidatura(formData: FormData, isEdit?: boolean): Promise<{ sucess: boolean; message: string }> {

  try {
    const response = await customFetch<any>(`/candidatura`, {
      method: isEdit ? "POST" : "POST",
      body: formData,
    });
    if (!response || !response.status) {
      return {
        sucess: false,
        message: response?.msg || "Falha ao enviar a candidatura. Verifique os dados informados.",
      };
    }
    return { sucess: true, message: response?.msg || "Candidatura enviada com sucesso!" };
  } catch (error: any) {
    console.error("Erro ao submeter candidatura:", error);
    return {
      sucess: false,
      message: error?.data?.message || "Erro ao submeter a candidatura.",
    };
  }
}
export async function getCandidaturasByPessoaId(pessoaId: string) {
  try {
    if (!pessoaId) {
      throw new Error("ID da pessoa não fornecido.");
    }

    const response = await customFetch<any>(`/candidatura/${pessoaId}`, {
      method: "GET",
    });
    if (!response) {
      throw new Error("Falha ao buscar candidaturas.");
    }

    return {
      success: true,
      data: response as CandidaturaStatusGroup,
    };
  } catch (error: any) {
    console.error("Erro ao buscar candidaturas:", error);
    return {
      success: false,
      message: error?.message || "Erro ao buscar candidaturas.",
    };
  }
}

interface GetCandidaturaDetalheParams {
  pessoaId: string;
  codigoCandidatura: string;
}

export async function getCandidaturasDetalhe({
  pessoaId,
  codigoCandidatura,
}: GetCandidaturaDetalheParams) {
  try {
    if (!pessoaId || !codigoCandidatura) {
      throw new Error("Parâmetros obrigatórios ausentes.");
    }

    const query = new URLSearchParams({
      pessoaId,
      codigoCandidatura,
    }).toString();
    const response = await customFetch<ICandidatoResponse>(
      `/candidatura/candidato?${query}`,
      {
        method: "GET",
      }
    );

    return {
      success: true,
      data: response || null,
    };
  } catch (error: any) {
    console.error("Erro ao buscar candidaturas:", {
      message: error?.message,
      status: error?.status,
      data: error?.data,
    });

    return {
      success: false,
      data: null,
      message: error?.message || "Erro ao buscar candidaturas.",
    };
  }
}

export async function transformarParaPayload(data: any) {
  const user = await getMyAccount("valor-do-fingerprint");
  return {
    pessoaId: user?.pessoa_info?.id,
    nia: data.nia,
    nivelCsu: null,
    problemaSaude: data?.problemaSaude,
    descricaoProblema: null,
    origem: "PORTAL",
    endereco: {
      ilhaId: data.ilha,
      ilha: "FOGO",
      concelhoId: data.concelho,
      concelho: "MOSTEIROS",
      morada: data.morada,
    },
    contatos: data.contatos.map((item: any) => ({
      tpContato: item.tipoContato,
      contato: item.contato,
      proprietario: item.pertenceAoD,
    })),
    candidatosCursos: Object.entries(data.cursoOrdem).map(
      (curso: any, index) => ({
        ordemPreferencia: index + 1,
        qualifOfertaId: curso.referencia_formacao,
      })
    ),
    infoAcademicos: [
      {
        anoEscolar: data.anoEscolar,
        mediaIH: Number(data.media),
        formacao: data?.grauAcademico,
        areaEstudo: data.areaEstudo,
      },
    ],
  };
}
