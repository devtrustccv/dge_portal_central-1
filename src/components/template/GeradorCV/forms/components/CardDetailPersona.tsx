"use client"

import React from 'react'
// Importe seus ícones aqui conforme necessário
// import { MdEmail, MdPhone, MdLocationCity, MdLanguage } from 'react-icons/md'
// import { AiFillLinkedin } from 'react-icons/ai'
// import { Brain } from 'lucide-react'

interface CardDetailPersonaStyleSelectorProps {
    value?: 'left' | 'center' | 'right' | 'sidebar'
    onChange?: (value: 'left' | 'center' | 'right' | 'sidebar') => void
}

export function CardDetailPersona(props: CardDetailPersonaStyleSelectorProps) {
    const {value, onChange} = props;

    // Estilos base para os cards de seleção
    const base = "w-40 h-28 flex justify-center items-center rounded-xl border-2 p-3 cursor-pointer transition-all duration-200 hover:shadow-md"
    const active = "border-purple-600 bg-purple-50 ring-1 ring-purple-600"
    const inactive = "border-gray-200 bg-white"

    return (
        <div className='flex flex-col gap-6 p-4'>
            <h1 className='font-bold text-xl text-gray-800'>Layout do Perfil</h1>

            <div className="flex flex-wrap gap-6">

                {/* STYLE: SIDEBAR (O SEU PADRÃO) */}
                <div className='flex flex-col justify-center items-center gap-3'>
                    <div
                        onClick={() => onChange?.('sidebar')}
                        className={`${base} ${value === 'sidebar' ? active : inactive}`}
                    >
                        {/* Miniatura representando a coluna lateral cinza */}
                        <div className="w-full h-full flex gap-1 border border-gray-200 rounded overflow-hidden">
                            <div
                                className="w-1/3 bg-gray-100 flex flex-col items-center p-1 gap-1 border-r border-gray-200">
                                <div className="w-4 h-4 bg-gray-400 rounded-full mt-1"/>
                                {/* Foto */}
                                <div className="h-[2px] w-full bg-gray-300 rounded"/>
                                <div className="h-[2px] w-2/3 bg-gray-300 rounded"/>
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5 p-1 bg-white">
                                <div className="h-[3px] w-full bg-gray-200 rounded"/>
                                <div className="h-[3px] w-full bg-gray-200 rounded"/>
                                <div className="h-[3px] w-3/4 bg-gray-200 rounded"/>
                                <div className="h-[3px] w-1/2 bg-gray-200 rounded mt-2"/>
                            </div>
                        </div>
                    </div>
                    <p className={`text-sm font-semibold ${value === 'sidebar' ? 'text-purple-600' : 'text-gray-500'}`}>Sidebar
                        (Padrão)</p>
                </div>

                {/* STYLE: LEFT */}
                <div className='flex flex-col justify-center items-center gap-3'>
                    <div
                        onClick={() => onChange?.('left')}
                        className={`${base} ${value === 'left' ? active : inactive}`}
                    >
                        <div className="flex flex-col w-full gap-2">
                            <div className="w-6 h-6 bg-gray-400 rounded-full self-start"/>
                            <div className="h-2 w-full bg-gray-300 rounded"/>
                            <div className="h-2 w-2/3 bg-gray-300 rounded"/>
                        </div>
                    </div>
                    <p className={`text-sm font-semibold ${value === 'left' ? 'text-purple-600' : 'text-gray-500'}`}>Esquerda</p>
                </div>

                {/* STYLE: CENTER */}
                <div className='flex flex-col justify-center items-center gap-3'>
                    <div
                        onClick={() => onChange?.('center')}
                        className={`${base} ${value === 'center' ? active : inactive}`}
                    >
                        <div className="flex flex-col items-center w-full gap-2">
                            <div className="w-6 h-6 bg-gray-400 rounded-full"/>
                            <div className="h-2 w-3/4 bg-gray-300 rounded"/>
                            <div className="h-2 w-1/2 bg-gray-300 rounded"/>
                        </div>
                    </div>
                    <p className={`text-sm font-semibold ${value === 'center' ? 'text-purple-600' : 'text-gray-500'}`}>Centro</p>
                </div>

                {/* STYLE: RIGHT */}
                <div className='flex flex-col justify-center items-center gap-3'>
                    <div
                        onClick={() => onChange?.('right')}
                        className={`${base} ${value === 'right' ? active : inactive}`}
                    >
                        <div className="flex flex-col items-end w-full gap-2">
                            <div className="w-6 h-6 bg-gray-400 rounded-full self-end"/>
                            <div className="h-2 w-full bg-gray-300 rounded"/>
                            <div className="h-2 w-2/3 bg-gray-300 rounded"/>
                        </div>
                    </div>
                    <p className={`text-sm font-semibold ${value === 'right' ? 'text-purple-600' : 'text-gray-500'}`}>Direita</p>
                </div>

            </div>
        </div>
    )
}