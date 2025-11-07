"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent } from "../../atoms/carousel";
import {
  ICarousel,
  ISoftSkillInfo,
} from "@/services/page-roteiro-empregabilidade/type";
import Image from "next/image";
import Link from "next/link";

export default function SoftSkillsSection({
  info,
  items,
}: {
  info: ISoftSkillInfo;
  items: ICarousel[];
}) {
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));

  return (
    <>
      <section className="overflow-hidden">
        <div className="container grid grid-cols-12 md:space-x-12 lg:space-x-24 space-y-12 md:space-y-0 ">
          <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-4 md:space-y-6 lg:space-y-8 max-w-[400px]">
            <h1 className="lg:max-w-[280px] font-semibold italic text-[36px] md:text-[44px] lg:text-[54px] leading-[60px] md:leading-[69px] lg:leading-[85px] text-main-black w-[300px] md:w-[400px] lg:w-[548px]">
              {info.title}
            </h1>
            <p className="font-light text-sm md:text-base leading-6">
              {info.description}
            </p>
            {info.button?.url && (
              <Link
                  target={info?.button?.external_link ? '_blank' : '_self'}
                className="mt-10 border-[#0454A0] text-[#0454A0] border py-4 px-8 block w-fit capitalize transition hover:text-white hover:bg-[#0454A0]"
                href={info.button?.url ?? ""}
              >
                {info.button?.label}
              </Link>
            )}
          </div>

          <Carousel
            className="col-span-12 md:col-span-6 lg:col-span-9 w-full flex gap-4 overflow-x-auto whitespace-nowrap cursor-grab active:cursor-grabbing"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="flex gap-4">
              {items?.map((item, index) => (
                <a
                  href={item.button?.url}
                  target="_blank"
                  key={index}
                  className="min-w-[60%] h-[430px] rounded-[36px] bg-cover bg-center relative overflow-hidden group cursor-pointer"
                  style={{
                    backgroundImage: `url(${item?.image?.url})`,
                    contain: "strict",
                    borderRadius: "42px",
                  }}
                >
                  <div className="absolute inset-0 bg-[#334155] opacity-60 rounded-[42px] group-hover:bg-white group-hover:opacity-90 flex items-center justify-center transition-opacity duration-1000">
                    <div className="hidden text-lg opacity-0 group-hover:flex flex-col space-y-6 group-hover:text-black group-hover:opacity-100 transition-opacity duration-[1000ms]">
                      <p className="text-center font-light text-base">
                        Assista no
                      </p>
                      <Image
                        src="/assets/capa-youtube/logos_youtube.svg"
                        alt="logo youtube"
                        width={172}
                        height={38}
                        sizes="172px"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 h-full p-6 text-white text-sm flex flex-col justify-between transition-all duration-300 group-hover:hidden">
                    <p className="border-2 border-white rounded-3xl w-fit px-2 h-[26px] text-center font-medium text-sm transition-all duration-300 group-hover:hidden select-none">
                      #softskills
                    </p>
                    <div>
                      <h1 className="text-2xl font-semibold leading-[24px] transition-all duration-300 select-none">
                        {item.title}
                      </h1>
                      <p className="text-base font-light leading-[44px] transition-all duration-300 select-none">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </>
  );
}
