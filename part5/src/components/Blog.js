import React, { useRef, useState } from 'react'
import like from '../services/like'
import blogService from '../services/blogs'
import notify from '../services/notifiy'
import deleteBlog from '../services/deleteBlog'
const Blog = ({blog,setBlogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visiblity, setVisibility]= useState(false)
  const [liked,setLiked] = useState(false)
  const likeBtnText = useRef(null)
  const showMore = ()=>{
    setVisibility(!visiblity);
}
const updateRender = ()=>{
  blogService.getAll().then(blogs =>
    {
    const sortedBlogs = blogs.sort((a,b)=>b.likes-a.likes) //sort by likes
      setBlogs( sortedBlogs )
    }
  )  
}
const likeBtn = async()=>{
  if(!liked){
    try {
      await like(blog)
      likeBtnText.current.textContent = 'Liked'
      setLiked(!liked)
      notify('blog successfully liked')
      updateRender()
    } catch (error) {
      notify('could not like')
    }
  }
  else{
    notify('already liked')
  }
}
const removeBtn= async()=>{
  try {
    await deleteBlog(blog)
    notify('blog successfully deleted')
    updateRender()
  } catch (error) {
    notify('could not delete blog')
  }
}
  if(!visiblity)
    return(
      <div className='posts' style={blogStyle}>
        {blog.title} {blog.author}
        <button className='viewBtn' onClick={()=>showMore()}>view</button>
      </div>  
    )
  else return(
    <div style={blogStyle}>
      <span>{blog.title} {blog.author}
        <button className='hideBtn' onClick={()=>showMore()}>hide</button>  
      </span>
      <p id="likes">likes: <span className="likes-num">{blog.likes}</span>
        <button ref={likeBtnText} className='likeBtn' onClick={()=>{likeBtn()}}>like</button>
      </p>
      <p id="blog-url">URL: {blog.url}</p>
      <button id='remove-blog' onClick={()=>removeBtn()}>remove</button>
    </div>  
  )
}

export default Blog