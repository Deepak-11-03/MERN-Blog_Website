const mongoose=require('mongoose')
const express=require('express');
const route= require('./router')
const dotenv=require('dotenv');
const multer = require('multer')
const bodyParser = require('body-parser');
const app=express();

dotenv.config({path: '../config.env'});

app.use(bodyParser.json());
app.use(multer().any())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin , X-Requested-With, Content-Type ,Accept,Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods' ,'GET ,POST ,PATCH ,DELETE')
    next()
})
// app.use(cors())

mongoose.connect(process.env.DB_url,{useNewUrlParser: true, useUnifiedTopology: true})

.then(() => {
    console.log("MongoDb connected")
}).catch((err) => {
    console.log(err.message)
});

app.use('/' ,route)

app.listen( process.env.Port ,function(){
    console.log('App running on port ' + process.env.PORT )
});