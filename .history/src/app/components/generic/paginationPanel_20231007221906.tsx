import { Dispatch, SetStateAction } from "react";

export function PaginationPanel({page, setPage, pages} : {
    page: number; 
    setPage: Dispatch<SetStateAction<number>> | ((value: number) => void);
    pages: number[]
}){

    console.log(pages)

return(
    pages.map(x => 
        <PageButton index={x} active={page == x} setPage={setPage}/>
    )
)
}

export function GeneratePages(page: number, count: number){
    let start = 1
    let pages: number[] = []
    let maxPage = count/10

    if(page>3){
        start = page - 2
    }
    if(maxPage - page < 3){
        start = maxPage - 4
    }

    let i = start

    while(i < start + 5){
        pages.push(i)
        i++
    }

    return pages
}

function PageButton({index, active, setPage} : {
    index: number; 
    active: boolean;
    setPage: Dispatch<SetStateAction<number>> | ((value: number) => void);
    }){

    return(
        <div className={`${active ? "bg-sky-600" : "bg-slate-300/40"} p-4 h-10 w-10 aspect-square 
            flex justify-center items-center rounded-md cursor-pointer select-none
            opacity-80 hover:opacity-100 active:opacity-60`}
            onClick={() => setPage(index)}> 
            {index} 
        </div>
    )
}