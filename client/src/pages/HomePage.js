import { usePostsContext } from '../context/postContext'
import { VscEmptyWindow } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { PostCard } from '../components/PostCard.js'

export function HomePage() {
  // utiliza el contexto importando 
  const { posts } = usePostsContext()
  // console.log(setPosts)

  // cuando no hay publicaciones
  if(posts.length === 0) return (
    <div className="flex flex-col justify-center items-center">
      <VscEmptyWindow className='w-30 h-30 text-white'/>
      <h1 className='text-white text-2xl'> Aún no hay publicaciones </h1>
    </div>
  )

  return (
    <div className='bg-gray-800 text-white'>
      <h1> HomePage</h1>
      <Link to='/new'>Create a new post</Link><hr />

      <div className="grid grid-cols-3 gap-2">
        {posts.map(post => (
          <PostCard post={post} key={post._id}/>
          // <div key={post._id}>
          //   {post.title}
          // </div>
        ))}
      </div>
      
    </div>
  )
}

