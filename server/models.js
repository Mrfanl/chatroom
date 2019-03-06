const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/chatroom';
mongoose.connect(DB_URL,{useNewUrlParser: true});

const mondels = {
  user:{
    'uer':{'type':String,'require':true},
    'gender':{'type':Number,'require':true},
    'password':{'type':String,'require':true},
    //头像
    'avatar':{'type':String},
    //个人简介
    'dsc':{'type':String},
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
