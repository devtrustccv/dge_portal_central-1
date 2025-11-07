import {Search, Trash2} from "lucide-react";
import { useRef } from "react";

interface SearchComponentProps {
    onSearch: (value: string) => void;
    clearBuffer?: string;
}

export function SearchComponent({ onSearch, clearBuffer }: SearchComponentProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function ClearBuffer() {
        onSearch('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }
    return (
            <div className="flex items-center rounded-[32px] h-[50px] px-2 gap-4 border bg-red-500">
                <Search />
                <input
                    type="text"
                    placeholder="Faça a sua pesquisa aqui"
                    className="w-full h-full focus:outline-none bg-transparent"
                    onChange={(e) => onSearch(e.target.value)}
                    ref={inputRef}
                />
                {clearBuffer && (
                    <button
                        className="border-l-2 border-gray-300 px-2 cursor-pointer hover:text-red-500 hover:border-l-rose-500 transition-colors duration-200"
                        onClick={ClearBuffer}
                    >
                       <Trash2/>
                    </button>
                )}
            </div>
    );
}
