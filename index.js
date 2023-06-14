
// import

// config: loads .env file contents into process.env

// dotenv il file ulla ella content um process il ulla env il vrnm, so dotenv il ulla ella file um process.env use cheithu access cheiyan pattum ,so angne cheiyanel .env ile config enna method use cheitha mathi
require('dotenv').config()


// import express

const express = require('express')
//  import cors
const cors = require('cors')

// import db
require('./db/connection')

// import router

const router= require('./Routes/router')

// import appmiddleware

const middleware=require('./Middleware/appMiddleware')

// - create    express server

const server= express()

//  - setup port number for the server

// process il by deafult aayittulle onnu aanu port

// portnumber dynamic aakn process inte env il ninnu kittum
// static aakumpo local maschine il 3000 port numberil kittum dynamic aakumo process ile env il ninnu kittum

const PORT = 3000 || process.env.PORT

// use cors,json parser in server app

server.use(cors())

server.use(express.json())

// use appmiddleware

server.use(middleware.appMiddleware)

// use router in server app
server.use(router)

// to resolve http request using express server

// ivide server leku request first get cheithu ...avide angular il emoty path vekkan chummathe oru empty string vecha mathiyarunu pakshe ivide empty string aakan oru slash um koode vekkanam. nkille nammle set cheitha local host port numberilkeku varu....pinne call backil il randu argument koduthu onnu request ne vendiyulla variable second aa response aanu athanu nammle frnt endileku kodukunne soo aa response send cheiyuka
server.get('/',(req,res)=>{
    res.send(`<h1> Bank server started!!</h1>`)
})





//  - run the server app in a specified port

// listen enna method kodutha athu ruuning state il aakum,
// first ethu port number aano run cheiynde athu first kodukum so PORT koduthu next argument aayi oru call back kodukum nkille athu running state il aano allayo ennokke ariyanam athinokke vendiyanu

server.listen(PORT,()=>{
    console.log(`Bank Server Started at port number ${PORT}`);
})







