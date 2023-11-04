import Link from "next/link"

export default function AdminPage(){
    return(
        <>
            <section id="top-picks-section" className='max-w-7xl min-h-128 bg-slate-500/30 mx-auto w-full p-4 md:p-8 rounded-xl shadow-md shadow-black/40 flex-col'>
                <div className="grid gap-4 grid-auto-fit-md">
                    <MenuPanel text="Recipes" href="/admin/recipes"/>
                    <MenuPanel text="Ingredients" href="/admin/ingredients"/>
                </div>
            </section>
        </>
    )
}

function MenuPanel({text = "", href = "/"}: {text?: string, href?: string}){
    return(
        <Link href={href}>
            <div className="h-64 bg-indigo-500  rounded-lg shadow-md flex justify-center place-items-center text-white font-semibold text-xl
                hover:bg-indigo-400 cursor-pointer transition-all">
                {text}
            </div>
        </Link>
    )
}