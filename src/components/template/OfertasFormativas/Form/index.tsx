"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/atoms/checkbox";
import { Button } from "@/components/atoms/button";
import { CandidateInformationForm } from "./CandidateInformationForm";
import { CourseSelectionForm } from "./CourseSelectionForm";
import Icon from "@/components/atoms/Icons";
import { enviarCandidatura } from "@/app/(layout-with-banner)/ofertas-formativas/candidatura/actions";

import { toast } from "sonner";
import CandidaturaSuccessMessage from "./SuccessMessage";
import { buildFormData } from "./buildFormData";
import { FormSchema, FormValues } from "./schema";
import { mapApiToForm } from "./mapApiToForm";
import { CandidaturaPageProps, ICursosPorps } from "./type";

const steps = [
  { id: 1, title: "Dados do Candidato" },
  { id: 2, title: "Curso para Candidatura" },
];

const stepFields: Record<number, (keyof FormValues)[]> = {
  0: [
    "ilha",
    "concelho",
    "morada",
    "formacoes",
    "nif",
    "contatos",
    "tipoProblemaSaude",
  ],
  1: ["cursoOrdem"],
};

function hasPhoneContact(contatos: any[]) {
  return contatos?.some(
    (c) =>
      (c.tipoContato === "N_MOVEL" || c.tipoContato === "TELEMOVEL") &&
      !!c.contato
  );
}

export default function CandidaturaPage({
  cursos,
  options,
  user,
  candidaturaDetalhe = null,
}: CandidaturaPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);
  const [originalContacts, setOriginalContacts] = useState<any[]>([]);
  const [originalFormacoes, setOriginalFormacoes] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const isEditing = Boolean(candidaturaDetalhe);

  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEditing
      ? mapApiToForm(candidaturaDetalhe!, user, cursos)
      : {
          ilha: user.ilha_id ?? "",
          concelho: user.concelho_id ?? "",
          morada: user.bairro ?? "",
          contatos: user.email
            ? [
                {
                  tipoContato: "EMAIL",
                  contato: user.email,
                  pertenceAoD: "1",
                },
              ]
            : [],
          nif: user.nif ?? "",
          nia: "",
          problemaSaude: "",
          periodoDisponivel: "",
          formacoes: [],
          cursoOrdem: {},
          concordaTermos: false,
          agreeWithAddress: true,
        },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isEditing && candidaturaDetalhe) {
      methods.reset(mapApiToForm(candidaturaDetalhe, user, cursos));
      setOriginalContacts(candidaturaDetalhe.contatos || []);
      setOriginalFormacoes(candidaturaDetalhe.infosAcademicas || []);
      setStep(0);
    }
  }, [candidaturaDetalhe?.candidato.id]);

  useEffect(() => {
    if (ref.current) {
      const top =
        ref.current.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [step]);

  const onSubmit = async (data: FormValues) => {
    try {
      const fd = buildFormData(
        data,
        user,
        options,
        originalContacts,
        originalFormacoes,
        candidaturaDetalhe?.enderecos || [],
        candidaturaDetalhe?.candidato?.id
          ? String(candidaturaDetalhe?.candidato?.id)
          : "",
        candidaturaDetalhe?.candidato.codigoCandidatura,
        candidaturaDetalhe?.cursos as ICursosPorps[]
      );
      const res = await enviarCandidatura(fd, isEditing);
      if (res.sucess) {
        setSubmitted(true);
        toast.success(
          isEditing
            ? "Candidatura atualizada com sucesso!"
            : "Candidatura enviada com sucesso!",
          { style: { background: "#DCFCE7", color: "#22c55e" } }
        );
      } else {
        toast.error(res.message ?? "Erro ao salvar.", {
          style: { background: "#FEE2E2", color: "#DC2626" },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro. Tente novamente.", {
        style: { background: "#FEE2E2", color: "#DC2626" },
      });
    }
  };

  const onError = (errors: any) => {
    console.log({ errors });
    toast.error("Por favor, preencha todos os campos obrigatórios.", {
      style: { background: "#FEE2E2", color: "#DC2626" },
    });
  };

  const next = async () => {
    const contatos = methods.getValues("contatos");
    if (!hasPhoneContact(contatos)) {
      toast.error("É obrigatório indicar um número de telemóvel ou telefone.", {
        style: { background: "#FEE2E2", color: "#DC2626" },
      });
      return;
    }
    const ok = await methods.trigger(stepFields[step] as any);
    if (ok) setStep((s) => s + 1);
    else onError(methods.formState.errors);
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  if (submitted) return <CandidaturaSuccessMessage />;

  return (
    <FormProvider {...methods}>
      <form className="w-full mx-auto pb-24">
        <div
          ref={ref}
          className="flex items-center justify-between mb-4 container"
        >
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div
                className={`h-[15px] w-[15px] rounded-full ${
                  idx < step
                    ? "bg-primary"
                    : idx === step
                    ? "border-primary border-[3px]"
                    : "border-[#BFC4CD] border"
                }`}
              />
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] ${
                    idx < step ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-between mb-6 container">
          {steps.map((s) => (
            <h3 key={s.id} className="font-semibold">
              {s.title}
            </h3>
          ))}
        </div>

        <div className="container">
          {step === 0 && <CandidateInformationForm user={user} {...options} />}
          {step === 1 && (
            <>
              <CourseSelectionForm cursos={cursos} />
              <Controller
                name="concordaTermos"
                control={methods.control}
                render={({ field }) => (
                  <div className="flex flex-col items-center gap-3 mt-12">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="concordaTermos"
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(Boolean(v))}
                      />
                      <strong>Confirmação</strong>
                    </div>
                    <label
                      htmlFor="concordaTermos"
                      className="text-sm text-center"
                    >
                      Declaro que as{" "}
                      <span className="underline">informações fornecidas</span>{" "}
                      são verdadeiras e assumo total responsabilidade.
                      <br />
                      Estou ciente de que dados incorretos podem ter
                      consequências conforme as normas da instituição.
                    </label>
                    {methods.formState.errors.concordaTermos && (
                      <p className="text-red-500 text-sm">
                        {
                          methods.formState.errors.concordaTermos
                            .message as string
                        }
                      </p>
                    )}
                  </div>
                )}
              />
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row container gap-6 items-center justify-center">
          {step > 0 && (
            <Button
              variant="secondary"
              size="lg"
              className="rounded-[16px]"
              type="button"
              onClick={prev}
              iconLeft={<Icon name="arrow-rigth-sm" className="rotate-180" />}
            >
              Anterior
            </Button>
          )}

          {step < steps.length - 1 ? (
            <Button
              size="lg"
              className="rounded-[16px]"
              type="button"
              onClick={next}
              iconRight={<Icon name="arrow-rigth-sm" />}
            >
              Seguinte
            </Button>
          ) : (
            <Button
              size="lg"
              className="rounded-[16px]"
              type="button"
              onClick={() => methods.handleSubmit(onSubmit, onError)()}
              disabled={
                !methods.formState.isValid || methods.formState.isSubmitting
              }
              iconRight={
                methods.formState.isSubmitting ? (
                  <Icon name="spinner" />
                ) : undefined
              }
            >
              {isEditing ? "Atualizar Candidatura" : "Submeter Candidatura"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
