import Link from "next/link";

export default function NotFound(){
    return (
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-slate-50 px-6 py-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(97,195,168,0.2),transparent_34%),linear-gradient(135deg,rgba(4,84,160,0.1),transparent_48%)]" />
            <div className="absolute inset-x-0 top-0 h-2 bg-[#0454A0]" />

            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
                <span className="mb-5 rounded-full border border-[#0454A0]/20 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#0454A0]">
                    Kre+
                </span>
                <h1 className="text-8xl font-bold leading-none text-[#0454A0] sm:text-[11rem]">
                    404
                </h1>
                <h2 className="mt-6 text-2xl font-semibold text-slate-900 sm:text-3xl">
                    Página não encontrada
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                    O conteúdo que procura pode ter sido movido, removido ou estar temporariamente indisponível.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#0454A0] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06477f]"
                    >
                        Voltar ao início
                    </Link>
                    <Link
                        href="/servicos"
                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#0454A0] hover:text-[#0454A0]"
                    >
                        Ver serviços
                    </Link>
                </div>
            </div>
        </section>
    )
}
