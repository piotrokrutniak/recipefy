export default function UserPage(pageData){
    return(
        <div className="text-white">
            {pageData.params.id}
            {typeof(pageData)}
        </div>
    )
}