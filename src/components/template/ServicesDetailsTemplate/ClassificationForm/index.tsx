"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/atoms/textarea";
import { Button } from "@/components/atoms/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { createEvaluationService } from "@/services/services/createEvaluationService/actions";
import Icon from "@/components/atoms/Icons";

type FormValues = {
  avaliacao: number;
  descricao: string;
};
interface ClassificationFormProps {
  serviceId: string
}
export function ClassificationForm({ serviceId }: ClassificationFormProps) {
  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      avaliacao: 0,
      descricao: "",
    },
  });

  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const currentRating = watch("avaliacao") || 0;

  const onSubmit = async (data: FormValues) => {
    try {
      await createEvaluationService(JSON.stringify({ service_document_id: serviceId, ...data }));
      toast.success(`Você classificou com ${data.avaliacao} estrelas!`, {
        style: {
          background: "#DCFCE7",
          color: "#22c55e"
        },
        
        description: "Obrigado pela sua avaliação! Sua opinião é muito importante para nós e nos ajuda a melhorar continuamente nossos serviços."
      });
      reset();
      setHoveredStar(null);
    } catch (error) {
      console.log({ error })
      toast.error("Ocorreu um erro. Tente novamente.", {
        style: {
          background: "#FEE2E2",
          color: "#DC2626"
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex-wrap md:flex items-center gap-4 mb-4">
        <h2 className="text-3xl font-medium text-main-black">Classifique</h2>
        <div className="flex gap-1 cursor-pointer">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={20}
              className={`cursor-pointer transition-all ease-in-out duration-300 ${(hoveredStar ?? currentRating) > i ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              onMouseEnter={() => setHoveredStar(i + 1)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={() => setValue("avaliacao", i + 1)}
            />
          ))}
        </div>
      </div>
      <Textarea
        {...register("descricao")}
        rows={8}
        placeholder="Observações..."
        className="w-full h-32 rounded-xl bg-[#F8FAFC] p-4"
      />

      <Button size={"lg"} iconRight={isSubmitting ? <Icon name="spinner" /> : <></>} type="submit" className="mt-5" disabled={currentRating === 0 || isSubmitting} >
        Enviar
      </Button>
    </form>
  );
}

