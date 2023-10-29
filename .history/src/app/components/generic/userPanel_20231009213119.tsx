import { User } from "@/app/types";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export function UserPanel({user, className}:{user?: User, className?: string}){
    return(
    <div id="user-info" className={`${className ?? ""} flex max-sm:justify-between flex-row-reverse gap-5 p-2 2xs:p-4 place-items-center group`}>
        <Link href={"/users/" + user?.id}>
        <div className="flex flex-col place-items-end hover:text-vermilion-400">
            <span className="text:xl md:text-lg whitespace-nowrap font-semibold">
                {user?.name}
            </span>
            <span className="text-sm md:text-base opacity-80">
                @{user?.username ?? "guest"}
            </span>
        </div>
        </Link>
        <Link href={"/users/" + user?.id}>
            <div className="w-10 h-10 rounded-full bg-slate-600 flex justify-center place-items-center">
                <FaUser className="w-full h-2/3"/>
            </div>
        </Link>
    </div>
    )
}