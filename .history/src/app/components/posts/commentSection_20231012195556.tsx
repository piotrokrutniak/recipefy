import GetCommentsByPostId from "@/app/integration/jsonApi/getPostComments"
import { Comment, Post } from "@/app/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { BsArrowClockwise, BsReply, BsSend, BsX } from "react-icons/bs"
import Button from "../generic/button"
import FormInput from "../generic/formInput"
import TextArea from "../generic/textArea"
import PostCommentPost from "@/app/integration/jsonApi/postPostComment"

export default function CommentsSection({post, setCommentsOpen}:{
    post: Post;
    setCommentsOpen?: Dispatch<SetStateAction<boolean>>;}){
    const [postComments, setPostComments] = useState<Comment[]>([])
    const [loading, setLoaded] = useState(false)
    const [titleString, setTitleString] = useState("")
    const [commentString, setCommentString] = useState("")
    const [emailString, setEmailString] = useState("")
    const [inputActive, setInputActive] = useState(false)
    const [commentValidated, setCommentValidated] = useState(false)

    let regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    useEffect(() => {
        setCommentValidated(titleString.trim().length > 1 && commentString.trim().length > 1 && ValidateEmail())
    }, [inputActive, commentString, titleString])

    async function SendComment(){
        if(titleString.trim().length > 1 && commentString.trim().length > 1){
            const comment: Comment = {
              id: 0,
              postId: post.id,
              email: emailString,
              name: titleString,
              body: commentString
          }

          await PostCommentPost(comment).then(x => postComments.push(x.body))

            // postComments.push({
            //     id: 501,
            //     postId: post.id,
            //     email: emailString,
            //     name: titleString,
            //     body: commentString
            // })

            setPostComments([...postComments])
            setTitleString("")
            setCommentString("")
        }
    }

    function HandleFocus(){
      setInputActive(true)
    }

    function HandleBlur(){
      setInputActive(false)
    }

    function ValidateEmail(){
      return regEx.test(emailString)
    }

    useEffect(() => {
      GetCommentsByPostId(post.id)
        .then(x => setPostComments(x.body))
        .then(() => setLoaded(true))
    }, [])
    
    
    return(
      <div className={`comments-${post.id} bg-slate-500/30 w-full overflow-hidden rounded-lg relative h-full`} id="comments-wrapper">
        <div id="comments-header" className="p-3 border-b-2 border-slate-400/20 shadow-sm shadow-black/40 w-full flex justify-between place-items-center">
          <span className="font-semibold pl-2">Comments</span>
          {setCommentsOpen && <BsX className="fill-white w-10 h-10 cursor-pointer hover:fill-vermilion-400 active:opacity-80" onClick={() => setCommentsOpen(false)}/> }
        </div>
        <div className="p-1 sm:p-4 min-h-screen-1/4 max-h-screen-2/3 flex flex-col gap-4 bg-slate-500/30 overflow-y-scroll">
          {loading ?
          (postComments.length > 0 ? postComments.map((x: Comment, key: number) => <CommentItem comment={x} key={key}/>) : 
          <span className="opacity-60">No comments here yet.</span>) : 
          <div className="flex gap-2 select-none h-80 place-items-center p-8 rounded-md justify-center"> <p>Loading results</p> <BsArrowClockwise className="animate-spin h-6 w-6"/></div>}
        </div>
        <div className={`${(inputActive || commentString.trim().length + titleString.trim().length > 0) ? "flex-col" : ""} p-4 border-t-2 relative border-slate-400/20 flex gap-2`}>
          <FormInput onFocus={HandleFocus} onBlur={HandleBlur} onChange={setTitleString} value={titleString} 
            className="w-full" 
            placeholder="Enter title..."/>
          <FormInput onFocus={HandleFocus} onBlur={HandleBlur} onChange={setEmailString} value={emailString} 
            className="w-full" 
            placeholder="joe@example.com"/>
          <TextArea onFocus={HandleFocus} onBlur={HandleBlur} onChange={setCommentString} value={commentString} 
            className={`${(commentString.trim().length + titleString.trim().length > 0) ? "block" : "hidden"} w-full`}
            placeholder="Enter comment..."/>
          <Button onClick={SendComment} disabled={!commentValidated} className="w-fit ml-auto mr-0"> Comment <BsSend className="aspect-square w-6"/> </Button>
        </div>
      </div>
    )
  }

  function CommentItem({comment}:{comment: Comment}){
    return(
      <div className="p-4 bg-black rounded-lg flex flex-col gap-1">
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-between place-items-center gap-2 sm:p-2">
            <span className="lowercase w-full overflow-hidden overflow-ellipsis">{comment.email}</span>
            <Button className="text-sm ml-auto mr-0 bg-transparent outline-2 outline-slate-400/30 hover:outline-slate-400/60 outline active:opacity-80 w-fit" onClick={undefined}>
              Reply <BsReply className="w-4 h-4"/> 
            </Button>
          </div>
          <span className="capitalize-first font-semibold text-lg">{comment.name}</span>
        </div>
        <span className="capitalize-first text-base opacity-80">{comment.body}</span>
      </div>
    )
  }