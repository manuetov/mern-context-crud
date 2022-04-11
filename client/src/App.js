import { HomePage, PostForm, NotFoundPage } from './pages/index' 
// no sería necesario index ya que React al igual Node lo importan por defecto
import { Routes, Route } from 'react-router-dom'
import { PostProvider } from './context/postContext.js'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="flex items-center">
      <div className="container m-auto bg-red-100">
      <PostProvider>
        <Routes>
          <Route path='/' element={ <HomePage/> } />
          <Route path='/new' element={ <PostForm /> } />
          <Route path='/posts/:id' element={ <PostForm /> } />
          <Route path='*' element={ <NotFoundPage/> } />
          {/* '*' cuando la ruta no se encuentra  */}
        </Routes>
        <Toaster />
      </PostProvider>
      </div> 
    </div>
   
    // todas las rutas deben estar dentro de un BrowserRouter ubicado en index 
  )
}

export default App