const userCtrl=require('../controllers/userCtrl')
const auth=require('../middlewares/auth') 
const router=require('express').Router()

router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.get('/refreshToken',userCtrl.refreshToken)
router.get('/info',auth,userCtrl.info)
router.get('/logout',userCtrl.logout)

module.exports=router