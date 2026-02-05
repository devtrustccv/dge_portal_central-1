import {Button} from "@/components/atoms/button";
import {useNavigation} from "@/context/NavigationContext";
import {useRouter} from "next/navigation";
import {AlertSelectItem} from "@/components/template/OfertaFormativaTemplates/Alert";
interface InfoCardProps {
    pathname?: string,
    handleLogin?: () => void,
    showAlert?: boolean,
    setShowAlert?: (showAlert: boolean) => void,
    isSelect?: boolean,
    isButton?: boolean,
    selectedItems?: string[],
    alert?: React.ReactNode;
}
export function CardInfo({
     pathname,
     handleLogin,
     showAlert,
     setShowAlert,
     isSelect,
     selectedItems,
     alert,
     isButton
 }: InfoCardProps) {
    const {hasSession} = useNavigation();
    const router = useRouter()
    const itemCount = selectedItems?.length;
    return (
        <div className="grid grid-cols-1 w-auto">
            {showAlert && (
                <div className="py-4">
                    <AlertSelectItem onClose={() => setShowAlert?.(false)}/>
                </div>
            )}

            {isSelect && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 mb-3">

                    <>
                        {alert}

                        {/* Botão sempre à direita */}
                        {isButton && (
                            <Button
                                onClick={() => {
                                    if (hasSession) {
                                        router.push(`${pathname}/candidatura?cursos=${selectedItems?.join(",")}`);
                                    } else {
                                        handleLogin?.();
                                    }
                                }}
                                disabled={!selectedItems?.length}
                                className="w-full md:w-[201px] bg-[#EFF2F5] text-black text-[16px] font-normal flex items-center min-h-[48px] hover:text-white rounded-[24px] p-4 mb-2 lg:mb-6"
                            >
                                Candidatar
                                {itemCount !== undefined && itemCount > 0 && (
                                    <span className="ml-2">({itemCount})</span>
                                )}
                            </Button>
                        )}
                    </>
                </div>
            )}
        </div>
    )
}