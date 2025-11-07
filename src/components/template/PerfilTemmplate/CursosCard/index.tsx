import React from "react"
import { CandidaturaQualificacao } from "../UserPerfil"
import { Card, CardContent, CardTitle } from "@/components/atoms/card"
import Image from "next/image"

export const CursoCard = ({ denominacaoQualif, name }: CandidaturaQualificacao) => {
  return (

    <Card
      className={`flex w-full p-3 gap-4 cursor-pointer relative shadow-none border-[0.5px]  `}
    >
      <Image src={"/Frame 2348.svg"} alt="" width={141} height={150}
        className="flex justify-center items-center"
        sizes="200px"
      />
      <CardContent className="w-full flex flex-col gap-3 py-4">
        <CardTitle
          title={denominacaoQualif}
          className="font-poppins font-medium text-[16px] leading-[24px] tracking-normal line-clamp-4">
          {denominacaoQualif}
        </CardTitle>
        <p title={name}
          className="font-poppins text-[#616E85] font-normal text-[16px] leading-[22px] tracking-normal line-clamp-2">
          {name}
        </p>
      </CardContent>
    </Card>

  )
}
