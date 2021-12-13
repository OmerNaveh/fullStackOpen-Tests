const Users = require('../model/User');
const crypto = require('crypto')

exports.createUser = async(req,res)=>{
    const {userName,name,password} = req.body;
    if(!userName || !name || !password ||userName.length<3 ||password.length<3){
        res.status(400).send() 
    }
    try {
        const isUserExist = await Users.find({userName:userName})
        if(isUserExist.length !== 0){
            res.status(400).send('user Exists') 
            return
        }
        const ePassword = crypto.createHash('sha256').update(password).digest('hex');
        await Users.insertMany({userName, name, password:ePassword})
        res.status(200).send();
        return
    } catch (error) {
     res.status(400).send()
     return   
    }
}