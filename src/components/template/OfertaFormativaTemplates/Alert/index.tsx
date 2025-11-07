import {
    AlertDialog,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/atoms/alert-dialog";
import {TriangleAlert} from "lucide-react";

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
