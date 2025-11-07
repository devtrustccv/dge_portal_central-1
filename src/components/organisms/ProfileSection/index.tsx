"use client";

import * as React from "react";
import { useState, useTransition, useEffect, useRef } from "react";
import Image from "next/image";
import { Headline } from "@/components/atoms/headline";
import { DigitalServices } from "../DigitalServices";
import { getImageSrc } from "@/lib/utils";
import { IServiceTop } from "@/services/services/type";

interface Service {
  slug: string;
  title: string;
  total: string;
  document_id: string;
}

interface ProfileData {
  services: Service[];
  profile_name: string;
  profile_slug: string;
  profile_plurall_name: string;
  description: string;
  profile_icon: string;
}

interface ISectionProfile {
  title: string;
  description: string;
  servicesByProfile: ProfileData[];
  service_top: IServiceTop[];
}

export function ProfileSection({ title, description, servicesByProfile, service_top }: ISectionProfile) {
  const sortedProfiles = [...servicesByProfile].sort((b, a) =>
    a.profile_name.localeCompare(b.profile_name)
  );

  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [highlight, setHighlight] = useState("Mais Acedidos");
  const [isPending, startTransition] = useTransition();
  const servicesRef = useRef<HTMLDivElement>(null);

  function handleClick(profile: ProfileData) {
    setSelectedProfile(profile);
    startTransition(() => {
      setHighlight(profile.profile_name);
      setServices(profile.services || []);
      scrollToServices();
    });
  }

  function scrollToServices() {
    if (servicesRef.current) {
      const offset = 180;
      const elementTop = servicesRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollToPosition = elementTop - offset;
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (service_top && service_top.length > 0) {
      setServices(service_top.map((item) => ({
        slug: item.slug,
        title: item.title,
        total: item.total,
        document_id: item.document_id,
      })));
      setHighlight("Mais Acedidos");
    }
  }, [service_top]);

  return (
    <section className="flex flex-col gap-[98px] pt-24">
      <div className="flex flex-col justify-center gap-12 lg:gap-20">
        <div className="container">
          <Headline
            title={title}
            description={description}
            align="center"
            highlightType="gradient"
          />
        </div>

        <div className="container flex gap-4 flex-wrap xl:flex-nowrap items-center justify-center">
          {sortedProfiles.map((item, index) => (
            <div
              key={item.profile_slug + index}
              onClick={() => handleClick(item)}
              className={`relative overflow-hidden w-full sm:w-[360px] md:w-[400px] 2xl:w-[418px] md:aspect-square py-6 
                flex flex-col items-center justify-center 
                border-[1.5px] border-[#EFF2F5] ${selectedProfile?.profile_slug === item.profile_slug ? "bg-[#F8FAFC]" : ""
                } rounded-[40px] cursor-pointer group active:scale-[1.008]
                before:content-[''] before:absolute before:inset-0 before:bg-[#EFF2F5] before:opacity-30 before:rounded-[40px]
                before:transform before:scale-0 before:transition-transform before:duration-200 before:ease-out
                group-hover:before:scale-100`}
            >
              <div className="absolute inset-0 bg-[#EFF2F5] opacity-30 rounded-[40px]
                     transform scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center" />

              <div className="relative flex flex-col gap-4 items-center justify-center p-4">
                <Image
                  src={item.profile_icon}
                  className="mx-auto w-[100px] h-[100px]"
                  alt="Ícone do perfil"
                  width={100}
                  height={100}
                  sizes="(max-width: 100px) 100vw, 100px"
                />

                <div className="flex flex-col gap-2">
                  <h4 className="font-neulis-alt text-main-black font-medium text-[24px] md:text-[28px] lg:text-[28px] leading-[30px] md:leading-[42px] lg:leading-[30px] text-center">
                    {item.profile_name}
                  </h4>
                </div>
                <p className="font-poppins font-light text-[14px] md:text-[16px] leading-[24px] md:leading-[28px] text-center relative z-10 line-clamp-3">
                  {item.description}
                </p>
              </div>
              <Image
                className="absolute -bottom-5 w-full h-[148px]"
                src={getImageSrc(index + 1)}
                alt=""
                width={100}
                height={100}
                sizes="(max-width: 100px) 100vw, 100px"
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={servicesRef} key={selectedProfile?.profile_slug || "top"} className="flex flex-col gap-20" aria-disabled={isPending}>
        <DigitalServices
          title={`Serviços ${highlight === "Mais Acedidos" ? "Mais Acedidos" : `para ${highlight}`}`}
          highlight={highlight}
          services={services}
        />
      </div>
    </section>
  );
}
