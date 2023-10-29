"use client"
import { GetStaticProps } from "next";

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    return(
        <div className="text-white" onClick={() => console.log(pageData)}>
            {pageData.params.id}
            {typeof(pageData)}
            
        </div>
    )
}