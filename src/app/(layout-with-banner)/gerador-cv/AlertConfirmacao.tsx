import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/atoms/dialog";
import {Button} from "@/components/atoms/button";

interface DialogConfirmacaoProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    onConfirm?: () => Promise<void>;
    title?: string;
}

export function AlertConfirmacao({open, setOpen, onConfirm, title}: DialogConfirmacaoProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setOpen?.(false)}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={async () => {
                            if (onConfirm) await onConfirm();
                            setOpen?.(false);
                        }}
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}