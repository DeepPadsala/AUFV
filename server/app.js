const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
dotenv.config({ path: './config.env' });

require('./db/conn');

app.use(express.json());
app.use(cookieParser());
// const User = require('./models/userSchema');

app.use(require('./router/auth')); // routes


app.get('/', (req, res) => {
    res.send('Hello World from the server app.js');
});

// app.get('/voterid', middleware, (req,res)=>
// {
//     res.send('Hello World From about Server');
// });

// app.get('/login',(req,res)=>
// {
//     res.send('Hello World From login Server');
// });

// app.get('/update',(req,res)=>
// {
//     res.send('Hello World From contact Server');
// });

// app.get('/signup',(req,res)=>
// {
//     res.send('Hello World From signup Server');
// });

app.listen(5000, () => {
    console.log("server is running at port no 5000.");
});