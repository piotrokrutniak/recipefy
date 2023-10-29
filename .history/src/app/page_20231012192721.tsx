import SearchBar from './components/generic/searchBar'
import PostList from './components/generic/postList'
import FormInput from './components/generic/formInput'
import CreatePostPanel from './components/generic/createPostPanel'

export default function Home() {
  return (
    <>
      {/* <section id="searchbar-section" className='max-w-7xl bg-black/90 px-7 m-auto w-full p-8 lg:px-16 rounded-xl shadow-md shadow-black/40 flex-col'>
        <SearchBar/>
      </section> */}

      <section id="top-picks-section" className='max-w-7xl bg-black/90 m-auto w-full md:p-8 rounded-xl shadow-md shadow-black/40 flex-col'>
            <CreatePostPanel/>
      </section>

      <section id="top-picks-section" className='max-w-7xl bg-black/90 m-auto w-full md:p-8 rounded-xl shadow-md shadow-black/40 flex-col'>
            <PostList/>
      </section>
    </>
  )
}

