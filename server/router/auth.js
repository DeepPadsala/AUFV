const jwt = require("jsonwebtoken");
const { json } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const adminAuth = require("../middleware/adminAuth");

require("../db/conn");
const User = require("../model/userSchema");
const Result = require("../model/resultSchema");

router.get("/", (req, res) => {
  res.send("Hello World from the server router js");
});

//using promise
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !cpassword || !password) {
//         return res.status(422).json({ message: "please enter all required fields" });
//     }

//     User.findOne({ email: email })
//         .then((userExists) => {
//         if (userExists) {
//             return res.status(422).json({ message: "email already exists" });
//         }
//         const user = new User({name, email, phone, work, password, cpassword});
//         user.save().then(() => {
//             res.status(200).json({ message: "user registered successfully" });
//         }).catch((err)=>res.status(500).json({error: "failed to register"}));
//     }).catch(err => {console.log(err);});
// });

// using async function

router.post("/signup", async (req, res) => {
  const role = "user";

  const {
    name,
    email,
    password,
    cpassword,
    fathername,
    address,
    img,
    dob,
    sex,
  } = req.body;

  if (
    !name ||
    !email ||
    !cpassword ||
    !password ||
    !fathername ||
    !address ||
    !img ||
    !dob ||
    !sex
  ) {
    return res.status(422).json({ err: "please enter all required fields" });
  }

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ err: "email already exists" });
    } else if (password != cpassword) {
      return res
        .status(422)
        .json({ err: "password does not match with confirm password" });
    } else {
      const user = new User({
        name,
        email,
        password,
        cpassword,
        fathername,
        address,
        img,
        dob,
        sex,
        role,
      });
      //pre save middleware
      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// using async function
router.post("/login", async (req, res) => {
  // console.log(req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ err: "please enter all required fields" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res.status(400).json({ err: "user error invalid credential" });
      }
      const token = await userLogin.generateAuthToken();
      console.log(token);

      // res.cookie("jwtoken", token, {
      //     expires: new Date(Date.now() + 25892000000),
      //     httpOnly: true,
      //     role: User.role
      // });
      // res.cookie("jwtoken1",token)
      res.json({
        message: "user login successful",
        token,
        isUser: userLogin.role == "user" ? true : false,
      });
    } else {
      return res.status(400).json({ err: "user doesn't exist" });
    }
    /*-
                const isMatch = await bcrypt.compare(password, userLogin.password);
                console.log(userLogin);
                if (!isMatch) {
                    res.status(400).json({ err: "user error" });
                } else {
                    res.json({ message: "user login successful" });
                }*/
  } catch (err) {
    console.log(err);
  }
});

// //Voter ID

router.get("/voterid", authenticate, (req, res) => {
  console.log("voter id from auth");
  res.send(req.rootUser);
});

// //it's request for update address from user

router.get("/updateAddress", authenticate, (req, res) => {
  console.log("update from auth");
  res.send(req.rootUser);
});

// //update email

router.post("/updateEmail", authenticate, async (req, res) => {
  // console.log(req.body);

  try {
    const { email, newEmail } = req.body;

    if (!email || !newEmail) {
      return res.status(400).json({ err: "Please Enter Your New Email" });
    }

    if (email === newEmail) {
      return res
        .status(400)
        .json({ err: "Your New Email And Old Email Are Same" });
    }
    let userUpdate = await User.findOne({ email: email });

    if (userUpdate) {
      // const isMatch = await bcrypt.compare(password, userLogin.password);
      // if (!isMatch) {
      //     return res.status(400).json({ err: "user error invalid credential" });
      // }
      // const token = await userLogin.generateAuthToken();
      // console.log(token);
      userUpdate.email = newEmail;
      userUpdate = await userUpdate.save();
      res.json({ message: "updated successfully" });
    } else {
      return res.status(400).json({ err: "user doesn't exist" });
    }
  } catch (err) {
    console.log(err);
  }
});

// //update img

router.post("/updateImg", authenticate, async (req, res) => {
  console.log(req.body);

  try {
    const { email, img, newImg } = req.body;

    if (!img || !newImg) {
      return res
        .status(400)
        .json({
          err: "Please Enter Your New Cloud Link Of Passport Size Photo",
        });
    }

    if (img === newImg) {
      return res
        .status(400)
        .json({ err: "Your New Photo And Old Photo Are Same" });
    }
    let userUpdate = await User.findOne({ email: email });

    if (userUpdate) {
      // const isMatch = await bcrypt.compare(password, userLogin.password);
      // if (!isMatch) {
      //     return res.status(400).json({ err: "user error invalid credential" });
      // }
      // const token = await userLogin.generateAuthToken();
      // console.log(token);
      userUpdate.img = newImg;
      userUpdate = await userUpdate.save();
      res.json({ message: "updated successfully" });
    } else {
      return res.status(400).json({ err: "user doesn't exist" });
    }
  } catch (err) {
    console.log(err);
  }
});

// //update password

router.post("/updatePassword", authenticate, async (req, res) => {
  console.log(req.body);

  try {
    const { email, password, newPassword, oldPassword } = req.body;

    if (!email || !password || !newPassword || !oldPassword) {
      return res.status(400).json({ err: "Please Enter Both Passwords" });
    }
    const isMatch = await bcrypt.compare(oldPassword, password);
    if (isMatch) {
      if (oldPassword === newPassword) {
        return res
          .status(400)
          .json({ err: "Your New Password And Old Password Are Same" });
      }
      let userUpdate = await User.findOne({ email: email });

      if (userUpdate) {
        // const isMatch = await bcrypt.compare(password, userLogin.password);
        // if (!isMatch) {
        //     return res.status(400).json({ err: "user error invalid credential" });
        // }
        // const token = await userLogin.generateAuthToken();
        // console.log(token);
        userUpdate.password = newPassword;
        userUpdate = await userUpdate.save();
        res.json({ message: "updated successfully" });
      } else {
        return res.status(400).json({ err: "user doesn't exist" });
      }
    }else{
        return res.status(400).json({ err: "Current Password is wrong" });
    }
  } catch (err) {
    console.log(err);
  }
});

// //results
router.get("/results", async (req, res) => {
  try {
    const results = await Result.find();
    console.log(results);
    if (!results) {
      return res.json({ err: "No Results found" });
    }
    return res.json(results);
  } catch (err) {
    console.log(err);
  }
});

// router.get('/navbar', navmiddle, (req, res)=>{
//     if(req.rootUser)
//     res.send(req.rootUser);
//     else
//     res.send('user not found');
// })

// logout

// router.get('/logout', (req,res)=>{
//     console.log('update logout from auth');

//     res.clearCookie('jwtoken', {path:'/'});
//     res.status(200).send('user logged out');
// })

// router.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         res.clearCookie('connect.sid');
//         res.status(200).send('Logout Successful');
//       }
//     });
//   });

router.post("/logout", async (req, res) => {
  try {
    // const allCookies = req.headers.cookie;

    // const cookies = allCookies.split("; ");
    // cookies.forEach((cookie) => {
    //     console.log("C",cookie)
    //     const [name, value] = cookie.split("=");
    //     console.log("Name : ",name)
    //     if (name === "jwtoken") {
    //         res.setHeader("Set-Cookie", [`jwtoken=''; Path=/; Max-Age=0`]);
    //     }
    // });
    res.clearCookie("jwtoken");
    res.clearCookie("isUser");
    console.log("Cleared");
    res.json({ message: "User Log Out successfully." });
  } catch (err) {
    console.log(err);
  }
});

//Admin APIs

router.get("/admin", adminAuth, async (req, res) => {
  res.send(req.rootUser);
});

router.post("/admin/addResult", adminAuth, async (req, res) => {
  const { year, pdf } = req.body;

  if (!year || !pdf) {
    return res.status(422).json({ err: "please enter all required fields" });
  }

  try {
    const resultExists = await Result.findOne({ year: year });
    if (resultExists) {
      return res.status(422).json({ err: "year already exists" });
    } else {
      const result = new Result({ year, pdf });
      //pre save middleware
      await result.save();
      res.status(201).json({ message: "Result Added Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});


router.post("/admin/updateResult", adminAuth, async (req, res) => {
  const { year, pdf } = req.body;

  if (!year || !pdf) {
    return res.status(422).json({ err: "please enter all required fields" });
  }

  try {
    let resultExists = await Result.findOne({ year: year });
    
    if (resultExists) {
      // return res.status(422).json({ err: "year already exists" });
      resultExists.pdf = pdf;
      resultExists = await resultExists.save();
      res.json({ message: "Result updated successfully" });
    } else {
      // const result = new Result({ year, pdf });
      // //pre save middleware
      // await result.save();
      res.status(422).json({ err: "Result is not exist you can add from add result" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/admin/deleteResult", adminAuth, async (req, res) => {
  const {year} = req.body;

  if (!year) {
    return res.status(422).json({ err: "please enter year" });
  }

  try {
    let resultExists = await Result.findOne({ year: year });
    
    if (resultExists) {
      // return res.status(422).json({ err: "year already exists" });
      
      resultExists = await resultExists.remove();
      res.json({ message: "Result deleted successfully" });
    } else {
      // const result = new Result({ year, pdf });
      // //pre save middleware
      // await result.save();
      res.status(422).json({ err: "Result is not exist" });
    }
  } catch (err) {
    console.log(err);
  }
});



// Update Address From Admin

router.post("/admin/updateAddress", adminAuth, async (req, res) => {
  // console.log(req.body);

  try {
    const { email, address } = req.body;

    if (!email || !address) {
      return res.status(400).json({ err: "please enter all required fields" });
    }
    let userUpdate = await User.findOne({ email: email });

    if (userUpdate) {
      // const isMatch = await bcrypt.compare(password, userLogin.password);
      // if (!isMatch) {
      //     return res.status(400).json({ err: "user error invalid credential" });
      // }
      // const token = await userLogin.generateAuthToken();
      // console.log(token);
      userUpdate.address = address;
      userUpdate = await userUpdate.save();
      res.json({ message: "user's address updated successfully" });
    } else {
      return res.status(400).json({ err: "user doesn't exist" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
