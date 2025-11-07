"use client"
import { Banner } from "@/components/atoms/banner";
import { ClassificationForm } from "./ClassificationForm";
import { ServicesRelated } from "./ServicesRelated";
import { IServiceItem, IServiceNode } from "@/services/services/type";
import { Button } from "@/components/atoms/button";
import { Rating } from "./Rating";
import { ServiceQuestion } from "./ServiceQuestion";
import {IPageDetalheServicoData} from "@/services/services/page-detalhe-servicos-digitais/type";
import {useState} from "react";
import Link from "next/link";

interface ServiceTemplaceProps extends IServiceItem {
    relatedServices: IServiceNode[],
    dataDetalhe: IPageDetalheServicoData | undefined | null
}
export function ServiceTemplate({ title, description, dataDetalhe, questions, relatedServices, documentId, avaliacao_media, total_avaliacao, url, url_externo }: ServiceTemplaceProps) {
    const imagem = dataDetalhe?.headerImage?.formats?.medium?.url;

    const [showAlert, setShowAlert] = useState(false);

    const handleClick = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // esconde após 3s
    };

    return (
    <main className="">
        {/* Alerta visível */}
        {showAlert && (
            <div className="fixed top-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow z-50 transition-all duration-300">
                ⚠️ Serviço brevemente disponível.
            </div>
        )}
      <Banner
          title={dataDetalhe?.title}
          subTitle={title}
          image={imagem}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <Rating rating={avaliacao_media} totalReviews={total_avaliacao} />
            {url ? (
                <Link href={url} target={`${url_externo ? '_blank' : '_self'}`}>
                    <Button  size={"lg"} variant={"secondary"} className="uppercase ">
                        Realizar Pedido
                    </Button>
                </Link>

            ):(
                <Button onClick={handleClick} size={"lg"} variant={"secondary"} className="uppercase ">
                    Realizar Pedido
                </Button>
            )}

        </div>
      </Banner>
      <div className="container mb-16 flex flex-col gap-8 lg:gap-8">
        <div className="text-editor text-[#616E85] mt-8" dangerouslySetInnerHTML={{ __html: description || ''}} />
        {questions?.length > 0 && <ServiceQuestion questions={questions} />}
        <section className="">
          <ClassificationForm serviceId={documentId} />
        </section>
      </div>
      {relatedServices?.length > 0 && <ServicesRelated services={relatedServices} />}
    </main>
  );
}
