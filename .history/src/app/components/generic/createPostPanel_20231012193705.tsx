"use client"
import { BsSend } from "react-icons/bs";
import FormInput from "./formInput";
import TextArea from "./textArea";
import Button from "./button";

export default function CreatePostPanel(){
    return(
      
      <div className="w-full rounded-md flex flex-col gap-5 text-white" >
        <FormInput placeholder="Enter post title..."/>
        <TextArea placeholder="Enter post text..."/>
        <Button className="w-fit ml-auto mr-0"> Post <BsSend className="aspect-square w-5"/> </Button>
      </div>
    )
  }