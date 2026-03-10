const adminAuth = (req,res,next)=>{
    console.log("checking the Admin Auth!!!");

    const token ="xyz";
    const isAdminAuth = token ==="xyz";

    if(!isAdminAuth){
        res.status(401).send("Unauthorized User!!")
    }
    else{
        next();
    }
}



module.exports = {
    adminAuth,
}