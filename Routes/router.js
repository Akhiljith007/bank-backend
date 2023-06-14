

// import express
const express=require('express')


// import middleware

const middleware=require('../Middleware/routerSpecific')


//  impoert controller

const usercontroller= require('../controllers/userController')

// create routes,using express.Router() class , object

const router= new express.Router()






// define routes to resolve http request 


// register reqst

// ippo ee pathil vrunna request usercontroller il register il nammle cheitha aa logic il ippo vanna data save aakum ,,path aanu single qoutes inte akathu koduthe  engne save aakanam enna logic aanu usercontroller il register parayunne athanu coma ittu athu koduthe ,soo aa logic kittanel first controller import cheiyanam athanu mukalil first controller import cheithekunne avidanu ella logic um nammale paranju koduthekkunne

router.post('/employee/register',usercontroller.register)

// login rqst

router.post('/employee/login',usercontroller.login)

// get balance rqst

// nammale middleware set cheithe balance check cheiyunne munne aa userlogin aano ennu nokkan aanu login aanel maathrame balance kaanikavu so get balance inte router koduthu ,,,so aadhyam middleware process cheiyu athu kazhinje usercontroller ile get balance ilekke poku

// ivide ee acno il frntendil aa acno number kittum so colon kazhinju aanu acno vechekunne 
router.get('/user/balance/:acno',middleware.logMiddleware,usercontroller.getbalance)


// fund transfer
router.post('/user/transfer',middleware.logMiddleware,usercontroller.transfer)

// ministatement
router.get('/user/ministatement',middleware.logMiddleware,usercontroller.getTransaction)

// delete account

router.delete('/user/delete',middleware.logMiddleware,usercontroller.deleteMyAcno)

// export router

module.exports=router