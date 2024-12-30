const Entries=require('../models/expenseModel')
const expCtrl={
    getEnt:async(req,res)=>{
        try{
            const list=await Entries.find()
            if(!list) return res.status(400).json({msg:'Add New Entries'})
            res.json(list)
        }catch(e){
            return res.status(500).json({msg:e.message})
        }
    },
    createEnt:async(req,res)=>{
        try{
            const{title,amount,category,paytype}=req.body
            if(!title||!amount||!category||!paytype) return res.status(400).json({msg:'All field need to be filled'})
            const newEnt=new Entries({title,amount,category,paytype})
            await newEnt.save()
            res.json({msg:'Entry created'})
        }catch(e){
            return res.status(500).json({msg:e.message})
        }
    },
    updateEnt:async(req,res)=>{
        try{
            const{title,amount,category,paytype}=req.body
            if(!title||!amount||!category||!paytype) return res.status(400).json({msg:'All field need to be filled'})
            await Entries.findOneAndUpdate({_id:req.params.id},{title:title.toLowerCase(),amount,category,paytype})
            res.json({msg:'Entry Updated'})
        }catch(e){
            return res.status(500).json({msg:e.message})
        }
    },
    deleteEnt:async(req,res)=>{
        try{
            await Entries.findByIdAndDelete({_id:req.params.id})
            res.json({msg:'Entry deleted'})
        }catch(e){
            return res.status(500).json({msg:e.message})
        }
    }
}
module.exports=expCtrl