"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { useRouter } from "next/navigation";

export default function CandidaturaSuccessMessage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 justify-center items-center text-center px-4 mt-12 pb-32">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />

      <h2 className="text-4xl font-medium text-green-600 mb-2">
        Candidatura submetida com sucesso!
      </h2>

      <p className="text-gray-600 mb-6 max-w-md">
        Obrigado por se candidatar. Sua candidatura foi enviada corretamente e será analisada pela nossa equipa.
      </p>

      <Button
        onClick={() => router.push("/")}
        className="rounded-[12px]"
        size="lg"
      >
        Voltar para o Início
      </Button>
    </div>
  );
}
