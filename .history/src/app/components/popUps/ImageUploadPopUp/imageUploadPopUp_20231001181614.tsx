import { FileOrUndefined } from "@/app/types";
import { Dispatch, SetStateAction, MutableRefObject } from "react";
import { BsFolderFill, BsImageFill, BsX } from "react-icons/bs";
import Button from "../../generic/button";
import Image from "next/image";

import FormPopup from "../../generic/formPopup";

export default function ImageUploadPopUp({ setUploadOpen, uploadOpen, ImageUploadDiscard, SaveThumbnail, fileInput, TriggerFileInput, HandleFileChange, fileToUpload, setFileToUpload }: 
    { setUploadOpen: Dispatch<SetStateAction<boolean>>; uploadOpen: boolean; ImageUploadDiscard(): void; SaveThumbnail(): void; fileInput: MutableRefObject<HTMLInputElement | null>; TriggerFileInput(): void; 
    HandleFileChange(event: any): void; fileToUpload: FileOrUndefined; setFileToUpload: (value: SetStateAction<FileOrUndefined>) => void; })
{
    return(
        <FormPopup className="w-112" headerText="Upload Image" uploadFunction={() => console.log("click")} setPopUpOpen={setUploadOpen} popupOpen={uploadOpen} 
                        triggerDiscard={ImageUploadDiscard} triggerSave={SaveThumbnail}>
                            <h2>Choose a file to upload:</h2>
                            <input ref={fileInput} type="file" accept=".jpg,.jpeg,.png,.pneg" className="hidden" onChange={(e) => HandleFileChange(e)} />
                    <Button onClick={(e) => TriggerFileInput()} className="w-fit mt-2 mb-6">
                        Browse <BsFolderFill className="mt-1"/>
                    </Button>
                     <div className="flex aspect-square w-full bg-slate-400/30 relative rounded-lg overflow-hidden place-items-center justify-center"> 
                        {fileToUpload ? <Image layout="fill" objectFit="cover" className="w-full h-full" src={URL.createObjectURL(fileToUpload)} alt="Image to be uploaded"/> : <BsImageFill className="w-24 h-24 opacity-50"/>}
                        {fileToUpload ? 
                        <BsX className="absolute top-0 right-0 w-10 h-10 cursor-pointer opacity-60 hover:opacity-100 transition-all active:opacity-30 duration-100"
                            onClick={() => setFileToUpload(undefined)}/> : 
                        <></>}
                    </div>
                    {fileToUpload && <h3 className="text-sm w-full break-words">{fileToUpload?.name}</h3>}
        </FormPopup>
    )
}