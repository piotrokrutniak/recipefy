"use client"
import FormInput from "./formInput";
import TextArea from "./textArea";

export default function CreatePostPanel(){
    return(
      
      <div className="bg-slate-400/30 w-full h-36 rounded-md flex flex-col gap-5" >
        <FormInput/>
        <TextArea/>
      </div>
    )
  }