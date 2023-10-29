import { LoadingPanel } from "./loadingPanel";

export function ItemList({children, title, arrayLength, loaded = true}:{children?: React.ReactNode; title: string; arrayLength: number; loaded: boolean}){
    return(
        <div className="flex flex-col gap-4 p-4 md:p-8">
            <h1 className="text-xl p-1 font-bold flex justify-between place-items-center">
                {title}
            </h1>
            {arrayLength > 0 || loaded ?
            <ul className="grid gap-4 grid-auto-fit-md">
                {children}
            </ul> :
            <LoadingPanel/>}
        </div>
    )
}