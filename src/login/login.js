import React from 'react';

import Header_Com from '../component/header_com';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return(
      <div>
      <Header_Com/>
        <h3>登录界面</h3>
      </div>
    )
  }
}

export default Login;
