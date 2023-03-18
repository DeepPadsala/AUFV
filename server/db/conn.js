const mongoose = require('mongoose');


const db = process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose.connect(db).then(()=>{
    console.log('connection established');
}).catch((err)=>{
    console.log(err);
});