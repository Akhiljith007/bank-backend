

// importing userSchema file in here bcoz athil aanu model um schema okke settaki vechekkunne
const { response } = require('express');
const users = require('../Models/userSchema')


// import jsonwebtoken

const jwt = require('jsonwebtoken')

// define and export logic to resolve  different http Client request

// register

exports.register = async (req, res) => {

    // register logic
    console.log(req.body);

    // get data send by front end

    const { username, acno, password } = req.body

    if (!username || !acno || !password) {
        res.status(403).json("All Inputs are required!!")
    }

    // check user is an exist user

    try {

        // ee oru acno name paaswoord okke veche oru user undel athu preuser il kittum angne undel if il kodukum nta response koduknde ennu else il illel aa data add aakanam so models il nammale undakiya athe orderil datanase il ithu add aakavu illel add aakilla and athu save aakan aanu aa oru variable save kodukunne illel save aakila databaseil pinne ivide elase il key kke value vekkathe key um value um name orepole aanu njn cheithe vechekkuen spelling um ella atha seperate value vekknda kaaryamillathe
        const preuser = await users.findOne({ acno })

        // 
        if (preuser) {
            res.status(406).json("user already exist")
        }
        else {
            // add user to db

            const newuser = new users({
                username,
                password,
                acno,
                balance: 5000,
                transactions: []

            })

            // to save newuser in mongodb

            await newuser.save()
            res.status(200).json(newuser)
        }

    }
    catch (error) {
        res.status(401).json(error)
    }


}

// login

exports.login = async (req, res) => {

    // get request body

    // destructuring (itupole backendil um data baseilum ore reethila key um valum irikunne nkill otta peru kodutha mathi)
    const { acno, password } = req.body

    try {
        // check acno and password is in db
        const preuser = await users.findOne({ acno, password })
        // check presuser or not
        if (preuser) {

            // generate token using jwt

            const token = jwt.sign({ loginAcno: acno }, "supersecretkey12345")

            // send to client

            // jwt use cheithu token undaki eni aa token user login aakumpo frntend ne kodykanm athinu res aayittu kodukunne ee token

            // json enna method ne oru argument undakan paadullu pakshe nammke randu argument sent cheiyanam athukonde json arumeent objectil kodukuka
            res.status(200).json({ preuser, token })

            // ee token nammle create cheithe userlogin  thanne aano ennu confirm aakana ee tokn vechu user login aanu mansilklunne oru logic aanu cheiyunne

        }
        else { res.status(404).json("invalid account number / password") }


    }
    catch (error) {
        res.status(401).json(error)

    }
}


// getbalance

exports.getbalance = async (req, res) => {
    // get acno from path parameter
    let acno = req.params.acno

    // get data ofgiven acno

    try {

        // find acno from users collection

        const preuser = await users.findOne({ acno })

        if (preuser) {
            res.status(200).json(preuser.balance)
        }
        else {
            res.status(400).json("Invalid Account NUmber")
        }
    }
    catch {

        res.status(401).json(error)
    }

}


// transfer

exports.transfer = async (req, res) => {

    console.log("inside transfer logic");

    // logic

    // 1. get body from req,creditacno,amt,pswd

    const { creditAcno, creditAmount, pswd } = req.body

       //convert crediamount to number
       let amt = Number(creditAmount)

    // ivide nammake login aaya user inte account number kittnamarunu pakshe frntendil ninnu varunna rqstil nammale athu  send aakitilla athukonde acnt number kittan ee vrunna rqst first middlewareil pokunund nammale already middle wareil varunna aalde user inte account number hold cheithittund so middleware rqst inte koode nammale aa user inte acntnumber um koode aa rqst inte koode ayakum appo aa middleware rqst usercontrolil ottu varum allelum nammale middlw wareil vrunna rqst inte koode middleware il already store aakittulla login user inte acnt number um rqst inte koode ayakkum soo aa rqst il ninnu nammke ivide acntnumber kittum login aaya user inte

    const { debitAcno } = req
    console.log(debitAcno);

    try {
        // 2. check debit acno and pswd available in mongodb

        const debitUserDetails = await users.findOne({ acno: debitAcno, password: pswd })

        console.log(debitUserDetails);

        // 3.get credit acno details from mongodb

        const creditUserDetails = await users.findOne({ acno: creditAcno })
        console.log(creditUserDetails);


        // aadhyathe if vechekkunne swantham accountil ninnu swantham accountilekku paisa send cheiyan padilla athu tadayan vendi aanu

        if (debitAcno != creditAcno) {

            if (debitUserDetails && creditUserDetails) {
                // check sufficient balance available for debitUserDetails

                if (debitUserDetails.balance >= amt) {
                    // perform transfer
                    // debit creditAmount to creditUserDetails
                    debitUserDetails.balance -= creditAmount
                    // add debit transaction to debitUserDetails
                    debitUserDetails.transactions.push({
                        transactions_type: "DEBIT", amount: creditAmount, fromAcno: debitAcno, toAcno: creditAcno
                    })

                    // save debitUserDetails in mongodb
                    await debitUserDetails.save()

                    // credit creditAmount to creditUserDetails
                    creditUserDetails.balance += amt

                    // add credit transaction to creditUserDetails
                    creditUserDetails.transactions.push({
                        transactions_type: "CREDIT", amount: creditAmount, fromAcno: debitAcno, toAcno: creditAcno
                    })


                    // save debitUserDetails in mongodb
                    await creditUserDetails.save()

                    res.status(200).json("Fund Transfer successfully....")


                }
                else {
                    // insufficient
                    res.status(406).json("Insufficient balance!!!")
                }



            }
            else { res.status(406).json("Invalid credit / debit details!!!") }
        }
        else { res.status(406).json("Operation Denied!!! self transaction are not allowed...") }


    }

    catch (error) {

        res.status(401).json(error)
    }

    // res.send("transfer request recieved")

}



// get Transcation

// mini statement

exports.getTransaction = async (req, res) => {


    // get acno from req.debitacno

    let acno = req.debitAcno




    try {
        // 2. check acno in mongo db
        const preuser = await users.findOne({ acno })

        // send response to frnt end
        res.status(200).json(preuser.transactions)


    }
    catch (error) {
        res.status(401).json(error)

    }


}


// delete Acno

exports.deleteMyAcno = async (req, res) => {

    // get acno from req

    let acno = req.debitAcno

    //  remove acno from db
    try {

        await users.deleteOne({ acno })
        res.status(200).json("Removed succesfully")
    }
    catch (error) {
        res.status(401).json(error)
    }



}
