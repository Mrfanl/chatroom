import axios from 'axios';

const REGISTER_SUCESS = 'REGISTER_SUCESS';
const LOGIN_SUCESS = 'LOGIN_SUCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  redirectTo:'',
  isAuth:'',
  msg:'',
  NickName:'',
  gender:'',
  Password:''
}

export function User(state=initState,action){
  switch(action.type){
    case REGISTER_SUCESS:
        return {...state,isAuth:true,redirectTo:'/login',...action.payload};
    case ERROR_MSG:
        return {...state,isAuth:false,msg:action.payload};
    case LOGIN_SUCESS:
        return {...state,isAuth:true,redirectTo:'/',...action.payload};
    default:
    return state

  }
}

function register_sucess(data){
  return {type:REGISTER_SUCESS,payload:data};
}

function login_sucess(data){
  return {type:LOGIN_SUCESS,payload:data};
}

function errorMsg(data){
  return {type:ERROR_MSG,payload:data};
}

export function register({NickName,gender,Password,repassword}){
  if(!NickName||!Password||!repassword){
    return errorMsg('用户名密码不能为空');
  }

  if(Password!==repassword){
    return errorMsg('密码不一致');
  }
  return dispatch =>{
    axios.post('/user/register',{NickName,gender,Password,repassword})
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
