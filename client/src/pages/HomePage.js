import { usePostsContext } from '../context/postContext'
import { VscEmptyWindow } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { PostCard } from '../components/PostCard.js'

export function HomePage() {
  // utiliza el contexto importando 
  const { posts } = usePostsContext()
  // console.log(setPosts)

  const renderPost = () => {
    if (posts.length === 0)   // cuando no hay publicaciones
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-48 h-48 text-white" />
          <h1 className="text-white text-2xl">There are no posts</h1>
        </div>
      );

    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <main>
      <header className="flex justify-between items-center my-4">
        <h1 className="text-2xl text-gray-300 font-bold">
          Posts ({posts.length})
        </h1>
        <Link
          to="/new"
          className="bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          Create Post
        </Link>
      </header>

      {renderPost()}
    </main>
  );
}

