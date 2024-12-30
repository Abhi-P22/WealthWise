const mongoose=require('mongoose')

const expSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    paytype:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('list',expSchema)