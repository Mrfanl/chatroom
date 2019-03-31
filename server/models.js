const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/chatroom';
mongoose.connect(DB_URL,{useNewUrlParser: true});

const mondels = {
  user:{
    'NickName':{'type':String,'require':true},
    //真实姓名
    'Name':{'type:':String},
    'Gender':{'type':Number,'require':true},
    'Password':{'type':String,'require':true},
    'Birthday':{'type':String},
    'Address':{'type':String},
    'Email':{'type':String},
    //头像
    'Avatar':{'type':String},
    //个人简介
    'Note':{'type':String},
  }
}

for (let m in mondels){
  mongoose.model(m,new mongoose.Schema(mondels[m]));
}

module.exports = {
  getModel:function(name){
    return mongoose.model(name);
  }
}
