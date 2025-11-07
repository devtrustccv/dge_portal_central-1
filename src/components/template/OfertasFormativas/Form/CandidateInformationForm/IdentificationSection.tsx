"use client";

import { useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/atoms/input";
import { PessoaInfo } from "@/context/NavigationContext";
import LocationSelect from "@/components/molecules/LocationSelect";
import { getDomainLabel } from "@/lib/utils";
import { Upload } from "lucide-react";
import { Switch } from "@/components/atoms/switch";
import { FormValues } from "../schema";

interface IdentificationSectionProps {
  sexo: { label: string; value: string }[];
  user: PessoaInfo;
}

export function IdentificationSection({ sexo, user }: IdentificationSectionProps) {
  const {
    register,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const comprovativoFile = watch("comprovativo_morada");
  const agreeWithAddress = watch("agreeWithAddress");
  const watchedIlha = watch("ilha");

  const prevAgreeRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (!user) return;

    const { ilha_id, concelho_id, bairro, nif, localidade } = user;

    if (agreeWithAddress) {
      if (!getValues("ilha") && ilha_id) {
        setValue("ilha", ilha_id);
      }

      if (getValues("ilha") === ilha_id && concelho_id) {
        setValue("concelho", concelho_id);
      }

      if (!getValues("morada") && (bairro || localidade)) {
        setValue("morada", `${localidade ? `${localidade}, ` : ""} ${bairro}`);
      }

      if (!getValues("nif") && nif) {
        setValue("nif", nif);
      }
    }

    if (prevAgreeRef.current === true && agreeWithAddress === false) {
      setValue("ilha", "");
      setValue("concelho", "");
      setValue("morada", "");
    }

    prevAgreeRef.current = agreeWithAddress;
  }, [agreeWithAddress, user, watchedIlha, getValues, setValue]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[406px] h-[280px] md:h-auto lg:aspect-[1.2] relative rounded-[10px] flex items-center justify-center">
          {user?.foto && (
            <img
              src={user?.foto || ""}
              alt="foto"
              className="object-contain h-full w-full rounded-lg relative"
            />
          )}
        </div>

        <div className="flex-1 grid grid-cols-12 gap-4">
          <div className="col-span-12 flex flex-col gap-1">
            <label className="text-sm">Nome Completo</label>
            <span className="border px-2 py-1 rounded min-h-[32px]">{user?.nome || ""}</span>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
            <label className="text-sm">Tipo de Documento</label>
            <span className="border px-2 py-1 rounded min-h-[32px]">{user?.tipo_documento || ""}</span>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
            <label className="text-sm">Nº de Documento</label>
            <span className="border px-2 py-1 rounded min-h-[32px]">{user?.num_documento || ""}</span>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
            <label className="text-sm">Data de Emissão</label>
            <span className="border px-2 py-1 rounded min-h-[32px]">{user?.dt_emissao || ""}</span>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
            <label className="text-sm">Data de Validade</label>
            <span className="border px-2 py-1 rounded min-h-[32px]">{user?.dt_validade || ""}</span>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
            <label className="text-sm">NIF *</label>
            <div className="flex flex-col">
              <Input
                defaultValue={user?.nif || ""}
                type="number"
                placeholder="Digite seu NIF"
                {...register("nif", {
                  pattern: {
                    value: /^\d{9}$/,
                    message: "NIF deve ter exatamente 9 dígitos numéricos.",
                  },
                  minLength: {
                    value: 9,
                    message: "NIF deve ter exatamente 9 dígitos.",
                  },
                  maxLength: {
                    value: 9,
                    message: "NIF deve ter exatamente 9 dígitos.",
                  },
                })}
              />
              {errors.nif && <p className="text-red-500 text-sm">{errors.nif.message as string}</p>}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
            <label className="text-sm">Data de Nascimento</label>
            <span className="border px-2 py-1 rounded min-h-[32px]">{user?.data_nasc || ""}</span>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
            <label className="text-sm">Nacionalidade</label>
            <span className="border px-2 py-1 rounded min-h-[32px]">{user?.naturalidade || ""}</span>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col gap-1">
            <label className="text-sm">Sexo</label>
            <span className="border px-2 py-1 rounded min-h-[32px]">
              {getDomainLabel(sexo, user?.sexo || "") || ""}
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Controller
            name="agreeWithAddress"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Switch
                  checked={field.value}
                  onCheckedChange={(val) => field.onChange(!!val)}
                />
                <span className="text-sm">Concordo com o endereço proveniente do CNI</span>
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col">
            <LocationSelect
              name="ilha"
              label="Ilha *"
              tipo="ILHA"
              parentDefault="238"
              required={!agreeWithAddress}
              prefixo="ilhas"
              disabled={agreeWithAddress}
            />
          </div>

          <div className="flex flex-col">
            <LocationSelect
              name="concelho"
              label="Concelho *"
              tipo="CONCELHO"
              parentName="ilha"
              required={!agreeWithAddress}
              prefixo="concelho"
              disabled={agreeWithAddress}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Morada *</label>
            <Input
              type="text"
              placeholder="Digite sua morada"
              {...register("morada")}
              disabled={agreeWithAddress}
            />
            {errors.morada && (
              <p className="text-red-500 text-sm">{errors.morada.message as string}</p>
            )}
          </div>

          {!agreeWithAddress && (
            <div className="flex flex-col gap-1">
              <label className="text-sm">Comprovativo de Morada (ex.: fatura de eletricidade, água, telecomunicações, contrato de arrendamento ou declaração da Junta de Freguesia)</label>
              <label className="flex items-center border border-gray-300 rounded px-3 py-2 w-full cursor-pointer">
                <Upload className="w-5 h-5 mr-2 text-primary" />
                <span className="text-sm line-clamp-1">
                  {comprovativoFile && comprovativoFile.length > 0
                    ? comprovativoFile[0].name
                    : "Escolha um arquivo"}
                </span>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.png,.jpeg"
                  className="hidden"
                  {...register("comprovativo_morada", {
                    required: !agreeWithAddress ? "Comprovativo obrigatório" : false,
                  })}
                />
              </label>
              {errors.comprovativo_morada && (
                <p className="text-red-500 text-sm">
                  {errors.comprovativo_morada.message as string}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
