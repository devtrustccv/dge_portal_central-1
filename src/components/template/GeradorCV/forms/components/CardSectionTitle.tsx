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
                {/* STYLE 1 */}
                <div onClick={() => onChange(1)} className={`${base} ${value === 1 ? active : inactive}`}>
                    <div className="flex items-center gap-2 border-b-4 border-gray-400 pb-1">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"/>
                        <div className="h-2 w-16 bg-gray-500 rounded"/>
                    </div>
                </div>

                {/* STYLE 2 */}
                <div
                    onClick={() => onChange(2)}
                    className={`${base} ${value === 2 ? active : inactive}`}
                >
                    <div className="bg-gray-300 flex justify-center py-1">
                        <div className="h-2 w-16 bg-gray-600 rounded"/>
                    </div>
                </div>

                {/* STYLE 3 */}
                <div
                    onClick={() => onChange(3)}
                    className={`${base} ${value === 3 ? active : inactive}`}
                >
                    <div className="flex items-center gap-2 border border-gray-400 rounded-full px-2 py-1">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"/>
                        <div className="h-2 w-14 bg-gray-500 rounded"/>
                    </div>
                </div>

                {/* STYLE 4 */}
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
