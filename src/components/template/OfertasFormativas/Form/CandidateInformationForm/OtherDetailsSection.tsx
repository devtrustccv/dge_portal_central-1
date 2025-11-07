"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/atoms/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";

interface OtherDetailsSectionProps {
  sim_nao: { label: string; value: string }[];
  periodo: { label: string; value: string }[];
  problemasSaude: { label: string; value: string }[];
}

export function OtherDetailsSection({ sim_nao, periodo }: OtherDetailsSectionProps) {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const problemaSaudeValue = watch("problemaSaude");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm">Número de Cadastro Social Único (NIA)</label>
        <Input
          type="text"
          placeholder="Número de Cadastro Social Único (NIA)"
          {...register("nia")}
        />
        {errors.nia && (
          <p className="text-red-500 text-sm">
            {errors.nia.message as string}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm">Tens algum problema de saúde?</label>
        <Controller
          name="problemaSaude"
          control={control}
          render={({ field }) => (
            <>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Tens algum problema de saúde?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sim_nao.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.problemaSaude && (
                <p className="text-red-500 text-sm">
                  {errors.problemaSaude.message as string}
                </p>
              )}
            </>
          )}
        />
      </div>
      {(problemaSaudeValue === "S" || problemaSaudeValue === "SIM") && (
        <div className="flex flex-col gap-1">
          <label className="text-sm">Qual o problema de saúde?</label>
          <Input
            type="text"
            placeholder="Qual o problema de saúde?"
            {...register("tipoProblemaSaude")}
          />
          {errors.tipoProblemaSaude && (
            <p className="text-red-500 text-sm">
              {errors.tipoProblemaSaude.message as string}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Período Disponível para Formação</label>
        <Controller
          name="periodoDisponivel"
          control={control}
          render={({ field }) => (
            <>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Período Disponível para Formação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {periodo.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.periodoDisponivel && (
                <p className="text-red-500 text-sm">
                  {errors.periodoDisponivel.message as string}
                </p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}