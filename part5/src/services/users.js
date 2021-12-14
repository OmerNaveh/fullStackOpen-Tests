import axios from 'axios'
const baseUrl = '/api/users'

export const login = async(userName, password) => {
  try{
    const request = await axios.post(`${baseUrl}/login`,{userName, password})
  }
  catch(err){
      throw err;
  }
    
   
}
  