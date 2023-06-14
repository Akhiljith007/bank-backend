
// define application specific middleware

const appMiddleware=(req,res,next)=>{
    console.log("Application specific Middleware");
    next()
}

module.exports={
    appMiddleware
}