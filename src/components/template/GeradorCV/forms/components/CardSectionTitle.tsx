/*
"use client"

interface HeadingStyleSelectorProps {
    value: 1 | 2 | 3 | 4
    onChange: (value: 1 | 2 | 3 | 4) => void
}

export function CardSectionTitle(props: HeadingStyleSelectorProps) {

    const {value, onChange} = props;
    const base = "w-40 h-auto rounded-xl border-2 p-2 cursor-pointer transition-all"

    const active = "border-purple-600 bg-purple-50"

    const inactive = "border-gray-300 bg-gray-100"

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='font-bold text-black'>Títulos das Seções</h1>
            <div className="flex gap-4">
                {/!* STYLE 1 *!/}
                <div onClick={() => onChange(1)} className={`${base} ${value === 1 ? active : inactive}`}>
                    <div className="flex items-center gap-2 border-b-4 border-gray-400 pb-1">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"/>
                        <div className="h-2 w-16 bg-gray-500 rounded"/>
                    </div>
                </div>

                {/!* STYLE 2 *!/}
                <div
                    onClick={() => onChange(2)}
                    className={`${base} ${value === 2 ? active : inactive}`}
                >
                    <div className="bg-gray-300 flex justify-center py-1">
                        <div className="h-2 w-16 bg-gray-600 rounded"/>
                    </div>
                </div>

                {/!* STYLE 3 *!/}
                <div
                    onClick={() => onChange(3)}
                    className={`${base} ${value === 3 ? active : inactive}`}
                >
                    <div className="flex items-center gap-2 border border-gray-400 rounded-full px-2 py-1">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"/>
                        <div className="h-2 w-14 bg-gray-500 rounded"/>
                    </div>
                </div>

                {/!* STYLE 4 *!/}
                <div
                    onClick={() => onChange(4)}
                    className={`${base} ${value === 4 ? active : inactive}`}
                >
                    <div className="flex justify-center border-y-2 border-gray-400 py-1">
                        <div className="h-2 w-16 bg-gray-600 rounded"/>
                    </div>
                </div>

            </div>
        </div>
    )
}
*/
"use client"

import React from "react"

interface CardSectionTitleProps {
    value: 1 | 2 | 3 | 4
    onChange: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4>>
}

export function CardSectionTitle({value, onChange}: CardSectionTitleProps) {
    const options: { id: 1 | 2 | 3 | 4; label: string; preview: React.ReactNode }[] = [
        {
            id: 1,
            label: "Linha",
            preview: (
                <div className="flex items-center gap-1 text-blue-600 border-b-4 border-gray-500 pb-1 text-xs">
                    Título
                </div>
            ),
        },
        {
            id: 2,
            label: "Fundo",
            preview: (
                <div className="bg-gray-200 flex gap-2 justify-center items-center p-1 text-xs rounded">Título</div>
            ),
        },
        {
            id: 3,
            label: "Pill",
            preview: (
                <div className="flex items-center px-2 gap-1 border border-gray-500 rounded-full text-xs">Título</div>
            ),
        },
        {
            id: 4,
            label: "Bordas",
            preview: (
                <div
                    className="flex justify-center items-center gap-1 border-b-2 border-t-2 border-gray-500 py-1 text-xs">
                    Título
                </div>
            ),
        },
    ]

    return (
        <div className="space-y-3">
            <h4 className="font-semibold text-gray-700">Estilo dos Títulos</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onChange(option.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            value === option.id
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            {option.preview}
                            <span className="text-xs text-gray-600">{option.label}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
