"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/atoms/accordion";
import { IdentificationSection } from "./IdentificationSection";
import { ContactSection } from "./ContactSection";
import { AcademicInformationSection } from "./AcademicInformationSection";
import { OtherDetailsSection } from "./OtherDetailsSection";
import { useFormContext } from "react-hook-form";
import { PessoaInfo } from "@/context/NavigationContext";
import { OptionsProps } from "../type";
import { ContactSectionMobile } from "./ContactSectionMobile";
import { AcademicInformationSectionMobile } from "./AcademicInformationSectionMobile";

const style: "custom" | "default" = "custom";

interface CandidateInformationFormProps extends OptionsProps {
  user: PessoaInfo
}

export function CandidateInformationForm(options: CandidateInformationFormProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const contactError = errors.contatos?.message;
  const formationError = errors.formacoes?.message;

  return (
    <Accordion
      type="multiple"
      className="space-y-4"
      defaultValue={["identificacao", "contato", "academicas", "outrosDetalhes"]}
    >
      <AccordionItem value="identificacao" display={style}>
        <AccordionTrigger hasResponse={true}>Dados de Identificação</AccordionTrigger>
        <AccordionContent>
          <IdentificationSection user={options.user} sexo={options.sexo} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="contato" display={style} className={`${contactError ? "border-red-500" : ""}`}>
        <AccordionTrigger hasResponse={true}>Contato</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-gray-600 mb-2">
            Deve indicar pelo menos um contacto telefónico. Pode adicionar contactos adicionais, como e-mail ou redes sociais, conforme necessário.
          </p>
          {contactError && (
            <span className="text-sm text-red-500 block mb-2">
              Por favor, adicione pelo menos um contacto.
            </span>
          )}
          <div className="md:hidden">
            <ContactSectionMobile {...options} />
          </div>
          <div className="hidden md:block">
            <ContactSection {...options} />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="academicas" display={style} className={`${formationError ? "border-red-500" : ""}`}>
        <AccordionTrigger hasResponse={true}>Informações Acadêmicas</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-gray-600 mb-2">
            Indique a sua formação académica. É obrigatório indicar pelo menos uma formação concluída e anexar o respetivo comprovativo (por exemplo: diploma ou certificado).
          </p>
          {formationError && (
            <span className="text-sm text-red-500 block mb-2">
              Por favor, adicione pelo menos uma informação acadêmica.
            </span>
          )}
          <div className="hidden md:block">
            <AcademicInformationSection {...options} />
          </div>
          <div className="md:hidden">
            <AcademicInformationSectionMobile {...options} />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="outrosDetalhes" display={style}>
        <AccordionTrigger hasResponse={true}>Outros Detalhes</AccordionTrigger>
        <AccordionContent>
          <OtherDetailsSection sim_nao={options.sim_nao} periodo={options.periodo} problemasSaude={options.problemasSaude} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
