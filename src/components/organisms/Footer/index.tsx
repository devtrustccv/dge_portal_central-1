import Link from "next/link";
import Image from "next/image";
import {IFooter} from "@/services/footer/types";
import {Marquee} from "@/components/atoms/marque";


interface FooterProps extends IFooter{
}
const Footer = ({ logo,social_midia, contact, site_map, usefull_links, client, site_map_title, useful_links_title }: FooterProps) => {

    return (
        <footer
            className="relative bg-[#2370BB] h-auto  md:h-auto lg:min-h-[724px] p-4 md:p-16 lg:pt-20 text-white flex flex-col justify-between">

            <div className="container grid grid-cols-12 mt-14 md:mt-0 mb-4">
                <div className="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col">
                    <Link href="">
                        {logo?.url && (
                            <Image
                                src={logo.url || ""}
                                width={179}
                                height={52}
                                alt=""
                                className="w-[179px] md:w-[273px] h-[52px] md:h-[79px]"
                                sizes="(max-width: 768px) 100vw, 179px"
                            />
                        )}
                    </Link>

                    <ul className="mt-8 md:mt-16 lg:mt-24 space-y-2 md:space-y-4 lg:space-y-6 text-sm md:text-base font-normal">
                        <div className="flex gap-4">
                            {social_midia?.map((item, index) => (
                                <Link key={index} href={item.url.startsWith("http") ? item.url : `https://${item.url}`} target="_blank">
                                    <Image src={item?.logo.url} alt={item?.name} width={32} height={32}
                                    />
                                </Link>
                            )) ?? []}
                        </div>
                        {contact?.map((item, index) => (
                            <li key={index}>{item?.label}</li>
                        )) ?? []}
                    </ul>

                </div>


                <div className="col-span-12 md:col-span-4 lg:col-span-3 ">
                    <h1 className="mt-4 md:mt-0 font-semibold text-xl leading-[56px] md:leading-[76px]">{site_map_title}</h1>
                    <ul className="flex flex-col space-y-2 md:space-y-4 lg:space-y-6 text-sm md:text-base font-light md:font-normal">
                    {site_map?.map((item, index) => (
                        item.external_link ? (
                            // Se for um link externo, usa <a> para evitar que o Next.js tente tratá-lo como uma rota interna
                            <a
                                key={index}
                                href={item.url.startsWith("http") ? item.url : `https://${item.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.label}
                            </a>
                        ) : (
                            // Se for um link interno, usa <Link> para manter o comportamento correto dentro do Next.js
                            <Link key={index} href={item.url}>
                                {item.label}
                            </Link>
                        )
                        )) ?? []}
                    </ul>
                </div>

                <div className="col-span-12 md:col-span-12 lg:col-span-2 ">
                    <h1 className="mt-4 md:mt-0 font-semibold text-xl leading-[66px] md:leading-[76px]">{useful_links_title}</h1>
                    <ul className="flex flex-col space-y-2 md:space-y-4 lg:space-y-6 text-sm md:text-base font-light md:font-normal">
                        {usefull_links?.map((item, index) => (
                            item.external_link ? (
                                // Se for um link externo, usa <a> para evitar que o Next.js tente tratá-lo como uma rota interna
                                <a
                                    key={index}
                                    href={item.url.startsWith("http") ? item.url : `https://${item.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                // Se for um link interno, usa <Link> para manter o comportamento correto dentro do Next.js
                                <Link key={index} href={item.url}>
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </ul>
                </div>

            </div>

            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden md:mt-2 lg:mt-10">
                <hr className="w-full border-t border-white mb-4 md:mb-2 lg:md:mb-8 "/>
              {/*  <Marquee className="flex  ">
                    {client?.map((item, index) => (
                        <Link key={index} href={item.url.startsWith("http") ? item.url : `https://${item.url}`}  target="_blank">

                            {item?.logo?.url && (
                                <Image src={item?.logo.url} width={159} height={48} alt={item?.name}
                                       className="w-auto h-auto "/>
                            )}
                        </Link>
                    ))}
                </Marquee>*/}
                <Marquee className="flex">
                    {client?.map((item, index) => {
                        // Normaliza a URL
                        const url = item?.url?.startsWith("http")
                            ? item.url
                            : item?.url
                                ? `https://${item.url}`
                                : null;

                        // Se não houver URL válida, não renderiza nada
                        if (!url) return null;

                        return (
                            <a
                                key={index}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item?.logo?.url && (
                                    <Image
                                        src={item.logo.url}
                                        width={159}
                                        height={48}
                                        alt={item?.name ?? "Logo"}
                                        className="w-auto h-auto"
                                    />
                                )}
                            </a>
                        );
                    })}
                </Marquee>

                {/* Gradientes de borda para efeito de desvanecimento */}
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#2370BB] via-transparent"></div>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#2370BB] via-transparent"></div>
            </div>

        </footer>
    );
}
export default Footer;
