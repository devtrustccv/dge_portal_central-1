import { z } from "zod";

const formacaoSchema = z
  .object({
    id: z.any().optional(),
    anoEscolar: z.string().nonempty({ message: "Ano escolar é obrigatório." }),
    areaEstudo: z.string().optional(),
    media: z.preprocess(
      (val) => (isNaN(Number(val)) ? undefined : Number(val)),
      z
        .number({ invalid_type_error: "A média deve ser um número." })
        .min(0, { message: "A média deve ser igual ou superior a 0." })
        .max(20, { message: "A média deve ser igual ou inferior a 20." })
    ),
    file: z.any().optional(),
  })
  .superRefine((d, ctx) => {
    if (d.anoEscolar === "0") return;
    const is6to10 = ["5", "6", "7", "8", "9", "10"].includes(d.anoEscolar);
    if (!is6to10 && !d.areaEstudo?.trim()) {
      ctx.addIssue({
        path: ["areaEstudo"],
        code: z.ZodIssueCode.custom,
        message: "Área de estudo obrigatória.",
      });
    }
  });

export const FormSchema = z
  .object({
    enderecoId: z.string().optional(),
    ilha: z.string().nonempty({ message: "A ilha é obrigatória." }),
    concelho: z.string().nonempty({ message: "O concelho é obrigatório." }),
    morada: z.string().nonempty({ message: "A morada é obrigatória." }),
    agreeWithAddress: z.boolean().default(true),
    comprovativo_morada: z.any().optional(),

    contatos: z
      .array(
        z.object({
          id: z.any().optional(),
          tipoContato: z.string(),
          contato: z.string(),
          pertenceAoD: z.string(),
        })
      )
      .min(1, { message: "Deve adicionar pelo menos um contato." }),

    formacoes: z
      .array(formacaoSchema)
      .min(1, { message: "Adicione pelo menos uma formação." }),

    nif: z
      .string()
      .regex(/^\d{9}$/, {
        message: "O NIF deve conter 9 dígitos numéricos.",
      }),

    nia: z.string().optional(),

    problemaSaude: z.string().optional(),
    tipoProblemaSaude: z.string().optional(),
    periodoDisponivel: z.string().optional(),

    cursoOrdem: z
      .record(
        z.object({
          referencia_formacao: z.string(),
          formacao: z.string(),
          id: z.string().optional(),
        })
      )
      .refine((r) => Object.keys(r).length > 0, {
        message: "Selecione pelo menos um curso.",
      }),

    concordaTermos: z
      .boolean()
      .refine((val) => val === true, {
        message: "Deve aceitar os termos para continuar.",
      }),
  })
  .superRefine((d, ctx) => {
    if (d.problemaSaude === "SIM" && !d.tipoProblemaSaude?.trim()) {
      ctx.addIssue({
        path: ["tipoProblemaSaude"],
        code: z.ZodIssueCode.custom,
        message: "Informe o tipo de problema de saúde.",
      });
    }
  });

export type FormValues = z.infer<typeof FormSchema>;
