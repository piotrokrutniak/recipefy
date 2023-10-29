import { AlbumPanel } from "@/app/components/generic/albumPanel";
import { ItemList } from "@/app/components/generic/itemList";
import { GeneratePages, PaginationPanel } from "@/app/components/generic/paginationPanel";
import GetAlbums from "@/app/integration/jsonApi/getAlbumsByUserId copy";
import GetUsers from "@/app/integration/jsonApi/getUsers";
import { Album, User } from "@/app/types";
import { useEffect, useState } from "react";

function AlbumsPage(){
    const [albums, setAlbums] = useState<Album[]>([])
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] =  useState(true)

    useEffect(() => {
      setLoading(true)  
      GetAlbums(page)
        .then((x) => {
            setAlbums([...x.body])
            return x
        })
        .then((x) => setPages([...GeneratePages(page, Number.parseInt(x.count))]))
        .then(() => setLoading(false))
    }, [page])

    function ChangePage(value: number){
        if(page != value){
            setAlbums([])
            setPage(value)
        }
    }
    
    return(
        <section className='max-w-7xl flex flex-col overflow-hidden gap-5 md:p-8 bg-black/90 mx-auto w-full rounded-xl shadow-md shadow-black/40 text-white'>
            <div className="px-8 pt-4">
                <span className="font-semibold text-xl sm:text-2xl">Albums</span>
            </div>
            <ItemList>
                <AlbumList albums={albums}/>
            </ItemList>
            <div className="flex justify-center p-4 w-full">
                <PaginationPanel page={page} setPage={ChangePage} pages={pages}/>
            </div>
        </section>
    )
}

function AlbumList({albums}:{albums: Album[]}){
    return(
        <>
            {albums.map((x: Album, key: number) => <AlbumPanel album={x} key={key}/>)}
        </>
    )
}