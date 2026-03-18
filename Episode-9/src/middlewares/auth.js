const userAuth = async (req,res,next)=>{
    const token = req.cookies;
    
    const decodedObj = await jwt.verif(token,"dev@tinder");

    const {_id} = decodedObj;

    const user = await UserActivation.findBy(_id);

    req.user = req;

    next();
}



module.exports = {
    userAuth,
}