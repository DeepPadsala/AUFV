const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
    // const token = req.headers.cookie?.replace("jwttoken=", '');
    // if(!token){
    //     res.json({Error : "Token Not Found"});
    // }
    // try {
    // const token = req.cookies.jwtoken;
    // console.log(token);
    // const token = req.headers.cookie;
    // const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    // const rootUser = await User.findOne({ _id: verifyToken.id, "tokens.token": token });

    // if (!rootUser) { throw new Error('User not found') }
    // req.token = token;
    // req.rootUser = rootUser;
    // req.userId = rootUser._id;

    //     console.log("user verified");

    //     next();

    // } catch (err) {
    //     res.status(401).send('unauthorized: no token available')
    //     console.log(err);
    //     console.log("khzddfsjkjxb");
    // }

    try {
        const token1 = req.headers.cookie?.replace("jwtoken=", '');
        const token_arr = token1.split(";");     // very time cunsuming error
        const token = token_arr[0];           // after add isUser cookie it's not working and it's take very long time to identify problem
        console.log("token := ",token)
        if (!token) {
            res.json({ Error: "Token Not Found" });
        }
        else {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

            console.log(verifyToken);

            const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

            if (!rootUser) { throw new Error('User not found') }
            req.token = token;
            req.rootUser = rootUser;
            req.userId = rootUser._id;
            console.log("user verified");

            next();

        }

    }
    catch (error) {
        res.status(401).send({err:'unauthorized: no token available'})
        console.log(error);
    }

}



// const Authenticate = async (req, res, next) => {
//     const token = req.headers.cookie?.replace("jwttoken=", '');
//     if(!token){
//         res.json({Error : "Token Not Found"});``
//     }
//     try{
//         const decoded = await jwt.verify(token, process.env.SECRET_KEY);
//         const user = await employees.findById({_id : decoded._id, "tokens.token": token});

//         if(!user){
//             throw new Error("User not found !!");
//         }

//         req.token = token;
//         req.decoded = decoded;
//         req.email = user.email;
//         req.id = user._id;
//         req.password = user.password;
//         // req.roles = user.roles;
//         // req.username = user.username;
//         // req.user = user;

//         console.log("user verified");

//         next();
//     }
//     catch(err){
//         res.status(401).send('Unauthorized: No token provided');
//         console.log(err);
//     }
// }

module.exports = Authenticate;