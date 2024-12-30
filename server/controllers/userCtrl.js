const Users=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const userCtrl={
    register:async(req,res)=>{
        try{
            const{name,email,password}=req.body
            const user=await Users.findOne({email})
            if(user){
                return res.status(400).json({msg:'email already exist'})
            }
            if(password.length<7){
                return res.status(400).json({msg:'password should be atleast 7 characters'})
            }
            const passHash=await bcrypt.hash(password,10)
            const newUser= new Users({name,email,password:passHash})
            await newUser.save()

            //creating & sending accToken here just to check
            const accessToken=createAccessToken({id:newUser._id})
            const refreshToken=createRefreshToken({id:newUser._id})
            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                path:'/user/refreshToken'
            })
            res.json({accessToken})

        }catch(e){
            res.status(500).json({msg:`sorry ${e.message} `})
        }
    },
    login:async(req,res)=>{
        try{
            const{email,password}=req.body
            const user=await Users.findOne({email})
            if(!user) return res.status(400).json({msg:'user doesnt exist'})
            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:'incorrect password'})
            //creating & sending accToken here just to check    
            const accessToken=createAccessToken({id:user._id})
            const refreshToken=createRefreshToken({id:user._id})
            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                path:'/user/refreshToken'
            })
            res.json({accessToken})
        }catch(e){
            res.status(500).json({msg:`sorry ${e.message} `})
        }
    },
    refreshToken:async(req,res)=>{
        try{
            const rf_token=req.cookies.refreshToken
            if(!rf_token) return res.status(400).json({msg:"please login or register"})
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err) return res.status(400).json({msg:"please login or register"})
                const accessToken=createAccessToken({id:user.id})
                res.json({user,accessToken})
        })
        }catch(e){
            res.status(500).json({msg:`sorry ${e.message} `})
        }
    },
    logout:async(req,res)=>{
        try{
            res.clearCookie('refreshToken',{
                path:'/user/refreshToken'
            })
            res.json({msg:'logged out successfully'})
        }catch(e){
            res.status(500).json({msg:`sorry ${e.message} `})
        }
    },
    info:async(req,res)=>{
        try{
            const user = await Users.findOne(req.user.id).select('-password') 
            if(!user) return res.status(400).json({msg:"user not found"})
            res.json(user)
        }catch(e){
            res.status(500).json({msg:`sorry ${e.message} `})
        }
    }

}

const createAccessToken=(payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'7h'})
}
const createRefreshToken=(payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'})
}

module.exports=userCtrl