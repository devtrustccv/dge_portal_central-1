import PerfilTemplate from '@/components/template/PerfilTemmplate'
import React from 'react'
import { getCandidaturasByPessoaId } from '../ofertas-formativas/candidatura/actions'
import { getMyAccount } from '@/app/auth/actions'
import { notFound } from 'next/navigation'

export default async function page() {
    const user = await getMyAccount("valor-do-fingerprint")

    if (!user?.pessoa_info?.id) {
        return notFound();
    }

    const data = await getCandidaturasByPessoaId(user?.pessoa_info?.id);
   // console.log({ data })
    return (
        <div className='min-h-screen'>
            {data?.data && <PerfilTemplate pessoaInfo={user?.pessoa_info} candidaturas={data?.data} />}
        </div>
    )
}
