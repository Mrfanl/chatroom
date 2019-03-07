const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./user');


const app = express()
const server = require('http').Server(app)

app.use(bodyParser.json());
app.use('/user',userRouter)

server.listen(9093,function(){
  console.log('Node app start at port 9093');
})
