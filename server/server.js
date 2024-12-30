const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.end('Hi')
})

const port=process.env.port
app.listen(port,()=>{
    console.log('server is running');
})

app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/expRouter'))

const Url=process.env.MONGODB_URL
mongoose.connect(Url)
.then(()=>{
    console.log('connected to mongodb');
}).catch(err=>{
    console.log(err.message);
})