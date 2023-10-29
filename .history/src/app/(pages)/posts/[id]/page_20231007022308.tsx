import { GetStaticProps } from "next";

export default function UserPage(pageData){
    return(
        <div className="text-white" onClick={() => console.log(pageData)}>
            {pageData.params.id}
            {typeof(pageData)}
            
        </div>
    )
}