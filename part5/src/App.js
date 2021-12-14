import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/LogIn'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [cookie,setCookie] = useState(window.localStorage.getItem('cookie') || false)
  const [userName,setUserName] = useState('guest');
  const logOut = ()=>{
    setCookie(false);
    window.localStorage.removeItem('cookie');
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  if(!cookie)
    return (<Login setCookie={setCookie} setName={setUserName}/>)
  else
  return(
    <div>
      <h2>blogs</h2>
      <h3>{userName} logged in</h3>
      <button onClick={()=>logOut()}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App