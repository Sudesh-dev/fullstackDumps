const express = require("express");
const path = require('path');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello gang");
});

app.get('/date',(req,res)=>{
    const date = new Date();
    res.send(date);
})

app.get('/page',(req,res)=>{
    res.sendFile(path.join(__dirname,'../flex-box/iphone/index.html',));
})

app.listen(3001);

console.log('server running on https://localhost:3000');