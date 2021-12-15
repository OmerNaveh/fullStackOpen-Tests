import axios from "axios"
import { useRef } from "react"
import blogService from '../services/blogs'
import notify from "../services/notifiy"
import PropTypes from 'prop-types'

export default function CreatBlog(props){
    const titleInput = useRef(null)
    const authorInput = useRef(null)
    const urlInput = useRef(null)
    CreatBlog.prototype = {
        setBlogs: PropTypes.func.isRequired
    }
    const cleanInputs= ()=>{
        titleInput.current.value = '';
        authorInput.current.value ='';
        urlInput.current.value ='';
    }
    const createPost = async()=>{
        const title= titleInput.current.value;
        const author= authorInput.current.value;
        const url= urlInput.current.value;
        try{
            await axios.post('/api/blogs',{title,author,url})
            const updatedBlogs = await blogService.getAll()
            props.setBlogs(updatedBlogs)
            cleanInputs()
            notify('Blog created Successfully')
            props.setVisible(false);
        }catch(error){
            notify('Blog was not created successfully')
        }
    }
    return(
        <div>
            <h4>Create New</h4>
            <p>Title<input ref={titleInput} required></input></p>
            <p>Author<input ref={authorInput} required></input></p>
            <p>URL<input ref={urlInput} required></input></p>
            <button onClick={()=> createPost()}>create</button>
        </div>
    )
}