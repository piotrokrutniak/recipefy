export default function Footbar(){
    return(
        <div className="w-full h-20 bg-black mt-16 text-center text-white">
            <Signature/>
        </div>
    )
}

export function Signature(){
    return(
        "© Piotr Okrutniak " + new Date().getFullYear()
    )
}