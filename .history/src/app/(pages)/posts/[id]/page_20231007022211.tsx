import { GetStaticProps } from "next";

export default function UserPage(pageData){
    console.log(pageData)
    console.log("XD")
    return(
        <div className="text-white">
            {pageData.params.id}
            {typeof(pageData)}
        </div>
    )
}