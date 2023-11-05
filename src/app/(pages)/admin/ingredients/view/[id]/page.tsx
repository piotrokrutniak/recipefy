"use client";
import Button from "@/app/components/generic/button";
import { IngredientType } from "@/app/types";
import { GetDate, ParseDate } from "@/app/utilities/globalMethods";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { FaCheckCircle, FaEdit } from "react-icons/fa";

export default function ViewIngredientPage({params}: {params: { id: string } }){
    const [ingredient, setIngredient] = useState<IngredientType>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        GetIngredient(params.id)
            .then(x => {
                setIngredient(x.ingredient);
            })
            .catch((error) =>{
                setError(error);
                setLoading(false);
            })
    }, [])

    async function GetIngredient(id: string){
        const result = await axios({
            method: 'get',
            url: 'http://localhost:3000/api/ingredients/' + id,
        })
        return result.data
    }

    //TODO: Display recipes containing this ingredient

    return( 
        <>
            <section id="admin-ingredient-view-section" className='max-w-4xl bg-slate-500/30 mx-auto w-full max-mobile:p-4 p-8 rounded-xl shadow-md shadow-black/40 flex flex-col gap-6'>
                <div className="flex flex-col sm:flex-row justify-between sm:place-items-center gap-4">
                    <h1 className="text-2xl font-bold">{ingredient?.name || "Empty field"}</h1>
                    <h2 className="opacity-70">{params.id}</h2>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-8">
                    <div className="flex flex-col gap-4 w-32">
                        <p className="flex justify-between place-items-center gap-2 font-semibold"> Vegan: {ingredient?.vegan ? <FaCheckCircle className="w-5 h-5 fill-green-500"/> : <BsXCircleFill className="w-5 h-5 fill-red-500"/>} </p>
                        <p className="flex justify-between place-items-center gap-2 font-semibold"> Vegetarian: {ingredient?.vegetarian ? <FaCheckCircle className="w-5 h-5 fill-green-500"/> : <BsXCircleFill className="w-5 h-5 fill-red-500"/>} </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="flex whitespace-nowrap w-44 justify-between place-items-center gap-2"> <span className="font-semibold">Updated:</span> {ingredient?.updatedAt ? ParseDate(ingredient?.updatedAt) : " "} </p>
                        <p className="flex whitespace-nowrap w-44 justify-between place-items-center gap-2"> <span className="font-semibold">Created:</span> {ingredient?.createdAt ? ParseDate(ingredient?.createdAt) : " "} </p>
                    </div>
                </div>
                <div className="flex justify-end place-items-center mt-4">
                    <Link href={"/admin/ingredients/edit/" + params.id}>
                        <Button className="flex gap-2 place-items-center"><FaEdit className="w-5 h-5"/> Edit</Button>
                    </Link>
                </div>
            </section>
        </>
    )
}