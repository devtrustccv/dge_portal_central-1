import Link from "next/link";

export default function NotFound(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#2470B8] text-center p-4">
            <h1
                className="text-[170px] font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent"
            >
                Oops!
            </h1>
            <h2 className="text-2xl font-semibold mt-2 text-white">4😭4 - PAGE NOT FOUND</h2>
            <p className=" mt-2 text-white">
                A página que procura pode ter sido removida, ter o seu nome alterado ou estar temporariamente
                indisponível.
            </p>
           <div className="py-10 flex gap-x-10">
               <Link href='/' className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-2xl shadow-md hover:bg-blue-700 transition">
                   GO TO HOMEPAGE
               </Link>
           </div>
        </div>
    )
}