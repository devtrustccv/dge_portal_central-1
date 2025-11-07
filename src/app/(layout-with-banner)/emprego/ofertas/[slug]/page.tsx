import { getPageInfoDetail } from "@/services/ofertas-emprego/getPageOfertasDetalhes";
import { getAllOfertas } from "@/services/ofertas-emprego/getDataOfertas";
import { notFound } from "next/navigation";
import {SaibaMais} from "@/components/atoms/saiba-mais";
import {DetailEmpregoAndEstagio} from "@/components/organisms/OfertaEmpregoAndEstagio/DetailEmpregoAndEstagio";

export default async function PageDetalheOfertaEmprego({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const pageInfoDetail = await getPageInfoDetail();

  const data = await getAllOfertas({
    slug: {
      eq: slug,
    },
  });

  if (!data || !data.nodes[0]) return notFound();

  const item = data.nodes[0];

  return (
    <div>
      <DetailEmpregoAndEstagio
          item={item}
          pageInfoDetail={pageInfoDetail}
      />
      {pageInfoDetail && (
        <div className="container mt-16">
          <SaibaMais
              title={"Saiba Mais"}
              data={pageInfoDetail?.pageInfo?.saiba_mais || []}
          />
        </div>
      )}
    </div>
  );
}
