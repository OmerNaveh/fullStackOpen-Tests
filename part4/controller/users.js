const Users = require('../model/User');
const crypto = require('crypto')

exports.createUser = async(req,res)=>{
    const {userName,name,password} = req.body;
    if(!userName || !name || !password){
        res.status(400).send() 
    }
    try {
        const ePassword = crypto.createHash('sha256').update(password).digest('hex');
        await Users.insertOne({userName, name, password:ePassword})
        res.send();
    } catch (error) {
     res.status(400).send()   
    }
}