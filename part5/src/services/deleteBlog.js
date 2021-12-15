import axios from 'axios'
const requestUrl = '/api/blogs'
export default async function deleteBlog({title}){
    try {
        await axios.delete(requestUrl, {data:{title}})
    } catch (error) {
        throw 'bad request'
    }
}