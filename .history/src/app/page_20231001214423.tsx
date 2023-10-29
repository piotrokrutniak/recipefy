import Image, { StaticImageData } from 'next/image'
import { FaMugHot, FaCookieBite, FaHamburger, FaFireAlt, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import CookingSvg from './components/svgComponents/CookingSvg'
import Rating from './components/generic/rating'
import Button from './components/generic/button'

import breakfast from '../../public/media/breakfast.jpg'
import lunch from '../../public/media/lunch.jpg'
import dessert from '../../public/media/dessert.jpg'
import strawberryCake from '../../public/media/recipes/strawberryCake.jpg'
import greekMeatLoaf from '../../public/media/recipes/greekMeatLoaf.jpg'
import vanillaIceCream from '../../public/media/recipes/vanillaIceCream.jpg'
import { useState } from 'react'
import { RecipeListing } from './components/generic/recipeListing'
import { Input } from 'postcss'
import SearchBar from './components/generic/searchBar'
import PostList from './components/generic/postList'

export default function Home() {
  return (
    <main className="flex flex-col m-auto gap-4">
      <section id="header-section" className='max-w-7xl bg-black/90 m-auto w-full p-8 rounded-xl mt-4 shadow-md shadow-black/40'>
        <div className="sm:p-8 pb-14 flex justify-between">
          <h1 className="text-5xl text-white"> Browse <span className="text-vermilion-400">tastiest</span> recipes. </h1>
        </div>
        <div className='w-full overflow-x-auto'>

        <div className="relative w-fit left-0 flex gap-10 pt-3 overflow-x-auto m-auto justify-around select-none pb-10">
          <div className="w-80 h-80 shrink-0 bg-slate-700/30 rounded-lg flex cursor-pointer text-white/70 hover:bg-slate-700/50 hover:-translate-y-1 transition-all relative overflow-hidden group" >
            <h2 className="text-3xl font-semibold  self-center m-auto flex gap-2 z-10 group-hover:text-vermilion-400"> <FaMugHot/> Breakfast</h2>
            <Image src={breakfast} layout="fill" objectFit="contain" alt="Breakfast Photo" className="opacity-60 group-hover:opacity-50"/>
          </div>
          <div className="w-80 h-80 shrink-0 bg-slate-600/30 rounded-lg flex cursor-pointer text-white/70 hover:bg-slate-700/50 hover:-translate-y-1 transition-all relative overflow-hidden group" >
            <h2 className="text-3xl font-semibold self-center m-auto flex gap-2 z-10 group-hover:text-vermilion-400"> <FaHamburger/> Lunch</h2>
            <Image src={lunch} layout="fill" objectFit="contain" alt="Breakfast Photo" className="opacity-60 group-hover:opacity-50"/>
          </div>
          <div className="w-80 h-80 shrink-0 bg-slate-600/30 rounded-lg flex cursor-pointer text-white/70  hover:bg-slate-700/50 hover:-translate-y-1 transition-all relative overflow-hidden group" >
            <h2 className="text-3xl font-semibold self-center m-auto flex gap-2 z-10 group-hover:text-vermilion-400"> <FaCookieBite/> Desserts</h2>
            <Image src={dessert} layout="fill" objectFit="contain" alt="Breakfast Photo" className="opacity-60 group-hover:opacity-50"/>
          </div>
        </div>
        </div>
      </section>

      <section id="searchbar-section" className='max-w-7xl bg-black/90 px-7 m-auto w-full p-4 md:px-16 rounded-xl shadow-md shadow-black/40 flex-col'>
        <SearchBar/>
      </section>

      <section id="top-picks-section" className='max-w-7xl bg-black/90 m-auto w-full p-8 rounded-xl shadow-md shadow-black/40 flex-col'>
        <div className="lg:p-8 pb-14 flex flex-col gap-5">
          <div className="md:p-8">
            <h1 className="text-3xl text-white flex gap-2 pb-2" > <FaFireAlt className="opacity-80 fill-vermilion-400"/> Trending</h1>
            <p className="text-2xl font-thin text-white/60 flex gap-2" > Latest posts from the community</p>
          </div>
          <div className="w-full h-fit p-5 bg-slate-800/25 flex flex-col gap-4">
            <PostList/>
          </div>
        </div>
      </section>
    </main>
  )
}