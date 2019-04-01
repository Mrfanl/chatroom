const express = require('express');
const utils = require('utility');
const Router = express.Router();

const model = require('./models');
const User = model.getModel('user');

const _filiter = {'Password':0};

Router.post('/register',function(req,res){
  const { NickName,Gender,Password } = req.body;
  User.findOne({NickName},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名已存在'});
    }
    User.create({NickName,Password:md5Pwd(Password),Gender},function(err,doc){
      if(err){
        return res.json({code:1,msg:后端出错了});
      }
      res.cookie('userid',doc._id);
      return res.json({code:0,data:doc});
    })
  })
})

//通过用户名查看用户个人信息
Router.post('/query_one',function(req,res){
  const {NickName} = req.body;
  User.findOne({NickName},_filiter,function(err,doc){
    if(!doc){
      return res.json({code:1,msg:'用户名错误'});
    }else{
      return res.json({code:0,data:doc})
    }
  })
})

//改变个人信息
Router.post('/change_one',function(req,res){
  const {NickName,Name,Birthday,Gender,Address,Email,Note} = req.body;
      User.updateOne({NickName:NickName},{$set:{NickName:NickName,Name:Name,Birthday:Birthday,Gender:Gender,Address:Address,Email:Email,Note:Note}},function(err,doc){
        if(err){
          return res.json({code:1,msg:"后端出错"})
        }
        if(doc){
          return res.json({code:0,data:doc});
        }
    })
})



Router.post('/login',function(req,res){
  const { NickName,Password } = req.body;
  User.findOne({NickName:NickName,Password:md5Pwd(Password)},_filiter,function(err,doc){
    if(!doc){
      return res.json({code:1,msg:'用户名不存在或密码错误'})
    }else{
      res.cookie('user',doc.NickName);
      return res.json({code:0,data:doc});
    }
  })
})

function md5Pwd(pwd){
  const salt = "hello world";
  return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router
