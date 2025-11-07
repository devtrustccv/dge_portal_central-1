import * as React from "react";
import { Headline } from "@/components/atoms/headline";
import { IService } from "@/services/services/type";
import { ServiceItem } from "@/components/template/ServicesDetailsTemplate/ServiceItem";
import Link from "next/link";

interface DigitalServicesProps {
  title: string;
  highlight: string;
  services: IService[];
}

export function DigitalServices({ services, title, highlight }: DigitalServicesProps) {
  return (
    <section className="w-full bg-[#F8FAFC] py-16 md:py-20 3xl:py-[100px]">
      <div className="container mx-auto flex flex-col gap-10 3xl:gap-[80px] transition-all ease-in-out duration-300">
        <Headline
          title={title}
          highlight={highlight}
          align="center"
          highlightType="gradient"
          className="text-center"
        />

        {/* Add to Kevin Sousa => Removi sm:grid-cols-1 mudei md:grid-cols-3 para 2 conforme pedido pelo Ederlindo */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {services?.map((service, index) => (
            <Link href={`/servicos/${service?.slug}`} key={index} >
              <ServiceItem  {...service} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
