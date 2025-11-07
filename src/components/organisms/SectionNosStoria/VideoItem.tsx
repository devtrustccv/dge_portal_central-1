import React from "react";
import Image from "next/image";
import { ITestemunho } from "@/services/homepage/type";

interface NosStoriaVideoProps extends ITestemunho {
    isVideoOpen: boolean;
    setIsVideoOpen: (value: boolean) => void;
    setVideo: (value: string) => void;
}

export const VideoItem: React.FC<NosStoriaVideoProps> = (video) => {
    
    const handleOpen = () => {
        if (video?.url) {
            video?.setIsVideoOpen(true)
            video?.setVideo(video?.url)
        }
    }

    return (
        <>
            <div
                className="min-w-[300px] h-[587px] rounded-[36px] bg-cover bg-center relative overflow-hidden group cursor-pointer"
                style={{ backgroundImage: `url(${video?.cover?.url})`, contain: "strict", borderRadius: "42px" }}
                onClick={handleOpen}
            >
                <div
                    className="absolute inset-0 bg-[#334155] opacity-60 rounded-[42px] group-hover:bg-white group-hover:opacity-90 flex items-center justify-center transition-opacity duration-1000">
                    <div
                        className="hidden text-lg opacity-0 group-hover:flex flex-col space-y-6 group-hover:text-black group-hover:opacity-100 transition-opacity duration-[1000ms]">
                        <p className="text-center font-light text-base">Assista no</p>
                        <Image src="/assets/capa-youtube/logos_youtube.svg" alt="logo youtube" width={172} height={38} />
                    </div>
                </div>

                <div
                    className="relative z-10 h-full p-6 text-white text-sm flex flex-col justify-between transition-all duration-300 group-hover:hidden">
                    <p className="border-2 border-white rounded-3xl w-fit px-2 h-[26px] text-center font-medium text-sm transition-all duration-300 group-hover:hidden select-none">
                        {video.hash_tags}
                    </p>
                    <div>
                        <h1 className="text-2xl font-semibold leading-[24px] transition-all duration-300 select-none">
                            {video.name}
                        </h1>
                        <p className="text-base font-light leading-[44px] transition-all duration-300 select-none">
                            {video.description}
                        </p>
                    </div>
                </div>
            </div>
           
        </>
    );
};