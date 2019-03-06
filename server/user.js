const express = require('express');
const utils = require('utility');
const Router = express.Router();

const model = require('./models');
const User = model.getModel('user');

const _filiter = {'password':0};

Router.post('/register',function(req,res){
  const { user,gender,password } = req;
  User.findOne({user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名已存在'});
    }
    User.create({user,password:md5Pwd(password),gender},function(err,doc){
      if(err){
        return res.json({code:1,msg:后端出错了});
      }
      res.cookie('userid',doc._id);
      return res.json({code:0,data:doc});
    })
  })
})

function md5Pwd(pwd){
  const salt = "hello world";
  return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router
