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
      {/* <section id="header-section" className='max-w-7xl bg-black/90 m-auto w-full p-8 rounded-xl mt-4 shadow-md shadow-black/40'>
      </section> */}

      <section id="searchbar-section" className='max-w-7xl bg-black/90 px-7 m-auto w-full p-8 lg:px-16 rounded-xl shadow-md shadow-black/40 flex-col'>
        <SearchBar/>
      </section>

      <section id="top-picks-section" className='max-w-7xl bg-black/90 m-auto w-full md:p-8 rounded-xl shadow-md shadow-black/40 flex'>
        <div className="lg:p-8 pb-14 flex flex-col gap-5">
          <div className="p-8">
            <h1 className="text-3xl text-white flex gap-2 pb-2" > <FaFireAlt className="opacity-80 fill-vermilion-400"/> Trending</h1>
            <p className="text-2xl font-thin text-white/60 flex gap-2" > Latest posts from the community</p>
          </div>
          <div className="w-full h-fit p-5 bg-slate-800/25 flex flex-col gap-4 shadow-inner shadow-black/50">
            <PostList/>
          </div>
        </div>
      </section>
    </main>
  )
}