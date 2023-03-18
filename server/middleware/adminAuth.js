const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const adminAuth = async (req, res, next) => {
  try {
    console.log('adminAuthenticate');
    const token1 = req.headers.cookie?.replace("jwtoken=", "");
    const token_arr = token1.split(";"); // very time cunsuming error
    const token = token_arr[0]; // after add isUser cookie it's not working and it's take very long time to identify problem
    console.log("token := ", token);
    console.log("role := ", token_arr[1]);
    if (!token) {
      res.json({ Error: "Token Not Found" });
    } else {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      console.log(verifyToken);

      const rootUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });

      console.log(rootUser);
      if (!rootUser) {
        throw new Error("User not found");
      }
      if (rootUser.role === "admin") {
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        console.log("user verified");

        next();
      } else {
        throw new Error("User not found");
      }
    }
  } catch (error) {
    res.status(401).send({ err: "unauthorized: no token available" });
    console.log(error);
  }
};

// try {
//     console.log('adminAuthenticate');
//     const token1 = req.headers.cookie?.replace("jwtoken=", '');
//     const token_arr = token1.split(";");     // very time cunsuming error
//     const token = token_arr[0];           // after add isUser cookie it's not working and it's take very long time to identify problem
//     console.log("token := ",token)
//     if (!token) {
//         res.json({ Error: "Token Not Found" });
//     }
//     else {
//         const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

//         console.log(verifyToken);

//         const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

//         if (!rootUser) { throw new Error('User not found') }
//         req.token = token;
//         req.rootUser = rootUser;
//         req.userId = rootUser._id;
//         console.log("user verified");

//         next();

//     }

// }
// catch (error) {
//     res.status(401).send({err:'unauthorized: no token available'})
//     console.log(error);
// }

// }


module.exports = adminAuth;
