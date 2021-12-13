const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName: String,
    name: String,
    password: String,
  })
  
  
  const mongoUrl = 'mongodb+srv://omer:omer12345@cluster0.chke2.mongodb.net/part4?retryWrites=true&w=majority'
  mongoose.connect(mongoUrl).then(()=>console.log('db connected...'))
  
  const User = mongoose.model('User', userSchema);

  module.exports = User;