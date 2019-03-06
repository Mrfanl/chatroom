import React from 'react';
import { Button,Card,Input,Icon,Radio} from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import { register } from '../redux/user.redux';

import '../static/user.css';


const RadioGroup = Radio.Group;

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:'',
      gender:1,
      password:'',
      repassword:''
    }
  }

  handleChange = (d,v)=>{
    this.setState({
      [d]:v
    })
  }

  handleRegister = ()=>{
    this.props.register(this.state);

  }

  render(){
    return (
      <div>
      {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
        <Card
        className="register-card"
        title="注册页面"
        >
        <p className="msg">{this.props.msg}</p>
        <Input
        prefix={ <Icon type="user" style={{ color:'#08c' }} /> }
        placeholder="username"
        onChange={e=>this.handleChange("user",e.target.value)}
        />
        <p/>
        <RadioGroup
        onChange={e=>this.handleChange("gender",e.target.value)}
        value={this.state.gender}>
          <Radio value={1} style={{ 'marginRight':'60px'}}>男生</Radio>
          <Radio value={2}>女生</Radio>
        </RadioGroup>
        <p/>
        <Input.Password
        prefix={<Icon type="lock" style={{ color: '#08c' }} />}
        placeholder="Password"
        onChange={e=>this.handleChange("password",e.target.value)}
        />
        <p/>
        <Input.Password
        prefix={<Icon type="lock" style={{ color: '#08c' }} />}
         placeholder="Password"
         onChange={e=>this.handleChange("repassword",e.target.value)}
         />
        <p/>
        <p>
        <Button type="primary" style={{'marginRight':'20px'}} onClick={()=>this.handleRegister()}>注册</Button>
        <a href="/login">已注册？点击这里登录</a></p>
        </Card>

      </div>
    );
  }
}

Register = connect(state=>state.User,{ register })(Register);

export default Register;
