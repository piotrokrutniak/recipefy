import PostList from './components/generic/postList'

export default function Home() {
  return (
    <>
      <section id="top-picks-section" className='max-w-7xl bg-black/90 m-auto w-full md:p-8 rounded-xl shadow-md shadow-black/40 flex-col'>
            <PostList/>
      </section>
    </>
  )
}

