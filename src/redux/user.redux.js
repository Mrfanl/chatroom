import axios from 'axios';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const CHANGE_SUCCESS = 'CHANGE_SUCCE';
const QUERY_SUCCESS = 'QUERY_SUCCESS';

const initState = {
  redirectTo:'',
  isAuth:'',
  msg:'',
  NickName:'',
  Name:'',
  Gender:'',
  Password:'',
  Birthday:'',
  Address:'',
  Email:'',
  //头像
  Avatar:'',
  //个人简介
  Note:''
}

export function User(state=initState,action){
  switch(action.type){
    case REGISTER_SUCCESS:
        return {...state,isAuth:true,redirectTo:'/login',...action.payload};
    case ERROR_MSG:
        return {...state,isAuth:false,msg:action.payload};
    case LOGIN_SUCCESS:
        return {...state,isAuth:true,redirectTo:'/mycenter',...action.payload};
    case QUERY_SUCCESS:
        return {...state,...action.payload,isAuth:true}
    case CHANGE_SUCCESS:
        return {...state,...action.payload,isAuth:true}
    default:
    return state

  }
}

function register_sucess(data){
  return {type:REGISTER_SUCCESS,payload:data};
}

function login_sucess(data){
  return {type:LOGIN_SUCCESS,payload:data};
}

function change_success(data){
  return {type:CHANGE_SUCCESS,payload:data};
}

function query_success(data){
  return {type:QUERY_SUCCESS,payload:data};
}

function errorMsg(data){
  return {type:ERROR_MSG,payload:data};
}


export function register({NickName,Gender,Password,repassword}){
  if(!NickName||!Password||!repassword){
    return errorMsg('用户名密码不能为空');
  }

  if(Password!==repassword){
    return errorMsg('密码不一致');
  }
  return dispatch =>{
    axios.post('/user/register',{NickName,Gender,Password,repassword})
    .then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(register_sucess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
     }
    )
  }
}

export function login({NickName,Password}){
  if(!NickName||!Password){
    return errorMsg('用户名密码不能为空');
  }

  return dispatch =>{
    axios.post('/user/login',{NickName,Password})
    .then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(login_sucess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
     }
    )
  }
}

//通过用户名查看用户的个人信息
export function query_one(NickName){
  if(!NickName){
    return errorMsg('查询出错');
  }
  return dispatch =>{
    axios.post('/user/query_one',{NickName})
    .then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(query_success(res.data.data));
      }else{
        dispatch(errorMsg(res.data.msg));
      }
    }
  );
  }
}

//改变个人信息
export function change_one({NickName,Name,Avatar,Birthday,Gender,Address,Email,Note}){
  return dispatch=>{
    axios.post('/user/change_one',{NickName,Name,Avatar,Birthday,Gender,Address,Email,Note})
    .then(res=>{
      if(res.status===200&&res.data.code===0){
        dispatch(change_success(res.data.data));
      }else{
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}
