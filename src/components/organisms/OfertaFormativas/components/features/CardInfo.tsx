import {Button} from "@/components/atoms/button";
import {useNavigation} from "@/context/NavigationContext";
import {useRouter} from "next/navigation";
import {AlertSelectItem} from "@/components/template/OfertaFormativaTemplates/Alert";
interface InfoCardProps {
    pathname: string,
    handleLogin: () => void,
    showAlert?: boolean,
    setShowAlert?: (showAlert: boolean) => void,
    isSelect: boolean,
    selectedItems?: string[],
}
export function CardInfo({
     pathname,
     handleLogin,
     showAlert,
     setShowAlert,
     isSelect,
     selectedItems
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
                        <div
                            className="flex w-full items-center min-h-[48px] rounded-[32px] p-4 mb-2 lg:mb-6 text-yellow-800 bg-yellow-100 border-l-[7px] border-yellow-500 shadow-sm animate-fade-in"
                        >
                            <span className="text-xl mr-3 mt-[2px]">⚠️</span>
                            <p className="text-[12px] text-black md:text-[11px] lg:text-sm font-[500]">
                                <strong className="font-semibold">👉 Escolha até <span
                                    className="text-red-600">3 cursos</span></strong>{' '}
                                clicando nos seus nomes para poder submeter a sua candidatura.
                            </p>
                        </div>

                        {/* Botão sempre à direita */}
                            <Button
                                onClick={() => {
                                    if (hasSession) {
                                        router.push(`${pathname}/candidatura?cursos=${selectedItems?.join(",")}`);
                                    } else {
                                        handleLogin();
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
                    </>
                </div>
            )}
        </div>
    )
}