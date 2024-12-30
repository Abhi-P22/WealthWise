const router=require('express').Router()
const expCtrl=require('../controllers/expCtrl')

router.route('/list')
.get(expCtrl.getEnt)
//why not calling here
.post(expCtrl.createEnt)

router.route('/list/:id')
.put(expCtrl.updateEnt)
.delete(expCtrl.deleteEnt)

module.exports=router