"use client"

interface LayoutleSelectorProps {
    value: 'one' | 'two' | 'mix'
    onChange: (value: 'one' | 'two' | 'mix') => void
}

export function CardLayoutType(props: LayoutleSelectorProps) {

    const {value, onChange} = props;
    const base = "w-40 h-auto rounded-xl border-2 p-2 cursor-pointer transition-all"

    const active = "border-purple-600 bg-purple-50"

    const inactive = "border-gray-300 bg-gray-100"

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='font-bold text-black'>Layout</h1>
            <div className="flex gap-4">
                {/* STYLE 1 */}
                <div className='flex flex-col justify-center items-center'>
                    <div onClick={() => onChange('one')} className={`${base} ${value === 'one' ? active : inactive}`}>
                        <div className="flex flex-col items-center gap-2 border-gray-400 pb-1">
                            <div className="h-2 w-16 bg-gray-500 rounded"/>
                            <div className="h-2 w-16 bg-gray-500 rounded"/>
                            <div className="h-2 w-16 bg-gray-500 rounded"/>
                        </div>
                    </div>
                    <p>One</p>
                </div>

                {/* STYLE 2 */}
                <div className='flex flex-col justify-center items-center'>
                    <div onClick={() => onChange('two')} className={`${base} ${value === 'two' ? active : inactive}`}>
                        <div className="grid grid-cols-2 items-center gap-2 border-gray-400 pb-1">
                            <div className="h-2 w-16 bg-gray-500 rounded"/>
                            <div className="h-2 w-16 bg-gray-500 rounded"/>
                            <div className="h-2 w-16 bg-gray-500 rounded"/>
                            <div className="h-2 w-16 bg-gray-500 rounded"/>
                            <div className="h-2 w-16 bg-gray-500 rounded"/>
                            <div className="h-2 w-16 bg-gray-500 rounded"/>
                        </div>
                    </div>
                    <p>Two</p>
                </div>

                {/* STYLE 3 */}
                <div className='flex flex-col justify-center items-center'>
                    <div onClick={() => onChange('mix')} className={`${base} ${value === 'mix' ? active : inactive}`}>
                        <div className="grid grid-cols-2 items-center gap-2 border-gray-400 pb-1">
                            <div className="h-2 w-16 bg-gray-500 rounded col-span-1"/>
                            <div className="h-2 w-16 bg-gray-500 rounded col-span-1"/>
                            <div className="h-2 w-full bg-gray-500 rounded col-span-2"/>
                            <div className="h-2 w-15 bg-gray-500 rounded col-span-1"/>
                            <div className="h-2 w-10 bg-gray-500 rounded col-span-1"/>
                        </div>
                    </div>
                    <p>Mix</p>
                </div>
            </div>
        </div>
    )
}
