import { useEffect, useState } from 'react';
import { IOfertaFormativa } from '@/services/ofertas/types';

export function AccessConditions({ dataFindId }: { dataFindId: IOfertaFormativa[] | undefined }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {dataFindId?.map(item => item?.condicoes_acesso && (
                    <div
                        key={item?.documentId}
                        className="w-full bg-[#F8FAFC] h-auto py-20 overflow-hidden mb-16"
                    >
                        <div className="container">
                            <h2 className="text-[20px] md:text-[36px] font-[500] leading-10 text-[#334155] font-poppins">
                                Condições de Acesso
                            </h2>
                            {isClient && (
                                <p className="mt-10 leading-6 md:leading-10 w-auto text-sm md:text-[16px]" dangerouslySetInnerHTML={{

                                    __html: item?.condicoes_acesso ?? ''
                                }} />
                            )}
                        </div>
                    </div>
            ))}
        </>
    );
}
