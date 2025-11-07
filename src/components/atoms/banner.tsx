import Image from "next/image";
import {ReactNode} from "react";
import {MapPinned} from "lucide-react";

interface BannerProps {
    title: string | undefined,
    subTitle: string | undefined,
    subTitle2?: string | undefined,
    subTitle3?: {
        title: string,
        type?: string,
        value?: string
    }[]
    image: string | undefined,
    children?: ReactNode
}

export function Banner({
   title,
   subTitle,
   subTitle2,
   subTitle3,
   image,
   children
}: BannerProps) {
    const imgMobile = '/mobile/brooke-cagle-g1Kr4Ozfoac-unsplash 4.png';

    return (
        <section className="relative flex  min-h-80 max-h-auto">
            {/* Imagem para mobile - visível apenas em telas pequenas */}
            <div className="absolute inset-0 md:hidden">
                <Image
                    className="object-cover w-full h-full"
                    src={image || imgMobile}
                    alt=""
                    fill
                    priority
                />
            </div>

            {/* Imagem para desktop - visível apenas em telas médias/grandes */}
            <div className="absolute inset-0 hidden md:block">
                <Image
                    className="object-cover w-full h-full"
                    src={image || "/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png"}
                    alt=""
                    fill
                    priority
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(36,112,184,0.75)] to-[rgba(97,195,168,0.4)]"></div>

            <div className="relative container lg:flex justify-between items-center text-white z-10 gap-6 lg:gap-24 pt-[154px] lg:items-center pb-16 h-fit ">
                <div className="flex-1 flex flex-col gap-3">
                    <p className="font-poppins font-normal text-[14px] md:text-[16px] leading-[24px] uppercase">
                        {title}
                    </p>

                    <h1 className="font-neulis font-semibold text-[18px] md:text-[22px] lg:text-[38px] md:leading-8 lg:leading-[44px] uppercase">
                        {subTitle}
                    </h1>
                    <p className="font-poppins font-normal text-[14px] md:text-[16px] leading-[24px] uppercase">
                        {subTitle2}
                    </p>

                    {subTitle3 && subTitle3.length > 0 && (
                        <p className="flex items-center gap-2 font-poppins font-normal text-[16px] leading-[24px] uppercase">
                            <MapPinned className='w-4 h-4'/>
                            {subTitle3.map(item => item?.value).join(" | ")}
                        </p>
                    )}
                </div>

                <div>
                    {children}
                </div>
            </div>
        </section>
    );
}