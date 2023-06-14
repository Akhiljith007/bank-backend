

// Router specific middleware
// import jsonwebtoken
const jwt = require('jsonwebtoken')

// defin logic for checking user loginned or not

const logMiddleware = (req, res, next) => {
    console.log("Router specific middleware");

    // gettoken

    // token eppozhum secretdata aayonde athu headerile varu request inte ee request frntendik ninnu vrunne aanu avide frntendil nammale token generate cheipicha local staorage hold aakipichitund avide ninu login cheiyumpo aa request inte header toekn und soo header inte aacess-token enna key il aanu irikunne token value ee access token enna oru variable aayonde aanu sqaurae bracket inte akathu koduthe kaaranam aa variabel nammale thanne undakkiya aanu allarunne dot ittu access cheoyamarunnu
    const token = req.headers['access-token']
    console.log(token);

    try {

        // verify token

        // ithu jwt de verify cheiyanulla format aanu avrde thanne siteil ulla syntax aanu verify cheiyanulle

        const {loginAcno} = jwt.verify(token, "supersecretkey12345")

        console.log(loginAcno);


        // ibide ippo loginAcno okke kodukkn kaaranam nammke debit account number venam nammale frntendil ninnu requestil account number pass cheithittilarunnu pakshe nammak evanam pakshe middleware il nammale nerathe oru user login aano nokkan vendi set cheitha logic undarunu aa logicil login cheiyunna user inte account number vrum so athu nammle use cheithu fund transfer inte athu set cheiyan angottu nammke ee debit acnt number venam athykonde
        // pass login Acno to req

        req.debitAcno=loginAcno

        // to process user request

        // ingne next koduthille user rqst process invoke aakilla

        next()

    }

    catch {
        res.status(401).json("please login")
    }

}

module.exports = {
    logMiddleware
}