import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/atoms/alert-dialog";

interface AlertConfirmacaoProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    onConfirm?: () => Promise<void>;
    title?: string
}

export function AlertConfirmacao({open, setOpen, onConfirm, title}: AlertConfirmacaoProps) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}