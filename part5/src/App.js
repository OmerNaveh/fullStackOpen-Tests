import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreatBlog from './components/CreateBlog'
import Login from './components/LogIn'
import VisiblityCreateForm from './components/VisibiltyCreateForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [cookie,setCookie] = useState(window.localStorage.getItem('cookie') || false)
  const [userName,setUserName] = useState(window.localStorage.getItem('user') ||'guest');
  const logOut = ()=>{
    setCookie(false);
    window.localStorage.removeItem('cookie');
    window.localStorage.removeItem('user');
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      {
      const sortedBlogs = blogs.sort((a,b)=>b.likes-a.likes) //sort by likes
      setBlogs( sortedBlogs )
      }
    )  
  },[])
  if(!cookie)
    return (<Login setCookie={setCookie} setName={setUserName}/>)
  else
  return(
    <div>
      <h2 id='pageTitle'>blogs</h2>
      <h3>{userName} logged in</h3>
      <button onClick={()=>logOut()}>logout</button>
      <VisiblityCreateForm>
        <CreatBlog setBlogs={setBlogs}/>
      </VisiblityCreateForm>
      
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog}  setBlogs={setBlogs}/>
      )}
    </div>
  )
}

export default App