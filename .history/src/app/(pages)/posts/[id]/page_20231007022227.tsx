import { GetStaticProps } from "next";

export default function UserPage(pageData){
    return(
        <div className="text-white">
            {pageData.params.id}
            {typeof(pageData)}
            {console.log(pageData)}
        </div>
    )
}