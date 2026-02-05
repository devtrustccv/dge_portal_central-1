import * as LucideIcons from "lucide-react";
import {
    AlertDialog,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/atoms/alert-dialog";
import {LucideIcon, TriangleAlert} from "lucide-react";

export function AlertSelectItem({onClose}: { onClose: () => void }) {
    return (
        <div
            className="flex md:py-2 lg:py-1 justify-center w-full h-auto items-center rounded-[32px] px-2 gap-4 border-red-500 bg-red-200">
            <AlertDialog open={true} onOpenChange={onClose}>
                <AlertDialogHeader>
                    <AlertDialogTitle
                        className="flex justify-center text-[14px] items-center gap-4 text-red-500">
                        <TriangleAlert/>
                        Limite de Seleção Atingido!
                    </AlertDialogTitle>
                    <AlertDialogDescription
                        className="flex justify-center items-center text-[12px] text-red-400 px-2">
                        Você já selecionou o número máximo de cursos. Para se inscrever em mais cursos, desmarque algum
                        dos cursos selecionados.
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialog>
        </div>
    );
}


export function Alert({
    icon: Icon,
    children
                      }:{
    icon?: LucideIcon;
    children: React.ReactNode;
}) {
    return (
        <div
            className="flex w-full items-center min-h-[48px] rounded-[32px] p-4 mb-2 lg:mb-6
              text-yellow-800 bg-yellow-100 border-l-[7px] border-yellow-500
              shadow-sm animate-fade-in"
        >
            {Icon && <Icon className="w-5 h-5 mr-3 mt-[2px]" />}
            <div className="text-[12px] text-black md:text-[11px] lg:text-sm font-[500]">
                {children}
            </div>
        </div>
    );
}
