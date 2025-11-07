// components/StepIndicator.tsx

interface StepIndicatorProps {
    currentStep: number
}

const steps = [
    "Dados Pessoais",
    "Objetivos Profissionais",
    "Experiência Profissional",
    "Formação Académica",
    "Competências",
    "Idiomas",
    "Certificados e Cursos Complementares",
    "Referências",
    "Projetos Pessoais ou Acadêmicos",
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <div className="flex flex-wrap gap-2 items-center text-sm">
            {steps.map((step, index) => {
                const stepNumber = index + 1
                const isActive = stepNumber === currentStep
                return (
                    <div key={step} className="flex items-center gap-2">
                        <div
                            className={`rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold ${
                                isActive ? "bg-[#2BB071]" : "bg-gray-300"
                            }`}
                        >
                            {stepNumber}
                        </div>
                        <span
                            className={
                                isActive ? "text-[#2BB071] font-medium" : "text-gray-500"
                            }
                        >
              {step}
            </span>
                    </div>
                )
            })}
        </div>
    )
}
