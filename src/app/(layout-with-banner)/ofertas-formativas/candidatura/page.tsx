import { Banner } from "@/components/atoms/banner";
import CandidaturaPage from "@/components/template/OfertasFormativas/Form";
import { getDominios } from "@/services/dominios";
import { getAllOfertasFormativas } from "@/services/ofertas/getAllOfertas";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { getPageCandidatura } from "@/services/page-candidatura/getPageCandidatura";
import { getMyAccount } from "@/app/auth/actions";
import Link from "next/link";

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const user = await getMyAccount("valor-do-fingerprint");
  if (!user) redirect("/");
  try {
    const dataPage = await getPageCandidatura();

    const cursos = (await searchParams)?.cursos || "";
    //if (!cursos) return notFound();
    const items = cursos ? cursos.toString().split(",") : [];

    const filters = {
      or: items.map((documentId) => ({
        referencia_formacao: { eq: documentId },
      })),
    };

    const highlightedOferta = await getAllOfertasFormativas(filters, {
      page: 1,
      pageSize: 3,
    });

    if (highlightedOferta?.length == 0) return notFound();

    const [
      sexo,
      tipo_contato,
      periodo,
      area_studo,
      sim_nao,
      grau_academico,
      proprietario_cont,
      problemasSaude,
    ] = await Promise.all([
      getDominios({ dominio: "SEXO" }),
      getDominios({ dominio: "TIPO_CONTATO" }),
      getDominios({ dominio: "PERIODO" }),
      getDominios({ dominio: "AREA_ESTUDO" }),
      getDominios({ dominio: "SIM_NAO" }),
      getDominios({ dominio: "GRAU_ACADEMICO" }),
      getDominios({ dominio: "PROPRIETARIO_CONT" }),
      getDominios({ dominio: "PROBLEMA_SAUDE" }),
    ]);

    return (
      <div className="min-h-screen">
        <Banner
          title={dataPage?.title}
          subTitle={dataPage?.subtitle}
          image={
            dataPage?.headerImage?.formats?.medium?.url ||
            "/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png"
          }
        />
        <div className="container py-12">
          <div
            className="text-editor"
            dangerouslySetInnerHTML={{ __html: dataPage?.description || "" }}
          />
        </div>
        <CandidaturaPage
          options={{
            sexo: sexo || [],
            tipo_contato: tipo_contato || [],
            periodo: periodo || [],
            area_studo: area_studo || [],
            sim_nao: sim_nao || [],
            grau_academico: grau_academico || [],
            proprietario_cont: proprietario_cont || [],
            problemasSaude: problemasSaude || [],
          }}
          cursos={highlightedOferta || []}
          user={user?.pessoa_info}
        />
      </div>
    );
  } catch {
    return (
      <div className="min-h-[80vh]">
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#2470B8]/90 text-center p-4">
          <h1 className="text-[170px] font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Oops!
          </h1>
          <h2 className="text-2xl font-semibold mt-2 text-white">
            Serviço Indisponível 😥
          </h2>
          <p className="mt-2 text-white max-w-xl">
            O serviço que está a tentar aceder encontra-se temporariamente
            indisponível. Por favor, tente novamente mais tarde ou volte à
            página inicial.
          </p>
          <div className="py-10 flex gap-x-10">
            <Link
              href="/"
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-2xl shadow-md hover:bg-blue-700 transition"
            >
              IR PARA A PÁGINA INICIAL
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
