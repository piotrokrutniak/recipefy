import GetAlbumThumbnail from "@/app/integration/jsonApi/getAlbumThumbnail"
import { Album } from "@/app/types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaImage } from "react-icons/fa"

export function AlbumPanel({album} : {album: Album}){
    const [photoUrl, setPhotoUrl] = useState<string>("")
    useEffect(() => {
      GetAlbumThumbnail(album.id)
        .then((x) => {
            setPhotoUrl(x.body[0].url)
        })
    }, [])
    
    return(
        <div className="h-72 rounded-lg overflow-hidden flex flex-col shadow-md bg-slate-500/20 shadow-black/20">
            <Link href={"/albums/" + album.id} className="h-full">
            <div className="h-full bg-black flex place-items-center justify-center relative">
                {photoUrl == "" ? <FaImage className="w-20 h-20 md:w-12 opacity-30 flex"/> : <Image layout="fill" objectFit="cover" src={photoUrl} alt="Album thumbnail"/>}
            </div>
            </Link>
            <div className="h-fit p-6 whitespace-nowrap hover:whitespace-normal">
                <Link href={"/albums/" + album.id}>
                    <h1 className="font-semibold overflow-ellipsis overflow-hidden capitalize-first cursor-pointer bg-clip-text hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">
                        {album.title ?? "-"}
                    </h1>
                </Link>
            </div>
        </div>
    )
}