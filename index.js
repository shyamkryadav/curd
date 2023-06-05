// all required package are import like express mongoose cors nodemon
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()

// maek a port number 
const port = 3000
// use the cors features 
app.use(cors())

// make a function to create a database mongoose 
const connectToDb = async()=>{
  try{
    const connection = await mongoose.connect('mongodb://127.0.0.1:27017/curdData');
    if(connection){
      console.log("connnectd to mongodb")
    }
  }catch(err){
    console.log(errr)
  }
}
connectToDb()

//  create a user schema and used in mongoose 
const userSchema = new mongoose.Schema({
  username: String,     // username takes only string characters 
  password: String,    // password takes only string characters
  email: String,       // email takes only string characters
  role: String        // role takes only string characters
});
 
// we have to create a user module that helps to used schema 
const Users = mongoose.model('Users', userSchema);
 
// console.log("connected to database")
app.use(express.json())



//  simply we create a post api sed the data 
app.post('/register', async(req, res) => {
   const data=  await Users.create(req.body)
})

//  simply we get a get api sed the data 
app.get('/users',async (req, res) => {
const data = await Users.find()
res.json({userList: data})
})

//  simply we update  a put method for chnaged a particular data 
app.put('/users',async (req, res) => {
   const data = await Users.findByIdAndUpdate(req.body.id, req.body)
  })
    
//   delete the data by useing the delete methods 
  app.delete('/users',async (req, res) => {
const data = await Users.findByIdAndDelete(req.body.id)
   })
   

//   server is runnign on port 3000 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})