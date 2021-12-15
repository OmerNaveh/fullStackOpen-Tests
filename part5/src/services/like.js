import axios from 'axios'
const requestUrl = '/api/blogs'
export default async function like({title,likes,author,url}){
    try {
        await axios.put(requestUrl, {title,likes:likes+1,author,url})
    } catch (error) {
        throw 'bad request'
    }
}