"use client"
import FormInput from "./formInput";
import TextArea from "./textArea";

export default function CreatePostPanel(){
    return(
      
      <div className="w-full rounded-md flex flex-col gap-5 text-white" >
        <FormInput/>
        <TextArea/>
      </div>
    )
  }