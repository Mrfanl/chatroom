//当用户未登录并且cookie失效时，只能到登录和注册界面
import React from 'react';
import {withRouter} from 'react-router-dom';
class Authroute extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const exemptPath = ['/login','/register'];
    const pathname = this.props.location.pathname
    if(exemptPath.indexOf(pathname)>-1){
      return null;
    }else{
      var allcookies = document.cookie
      if(allcookies.indexOf('user=')==-1){
        this.props.history.push('/login');
      }
    }
  }
  render(){
    return null
  }
}

Authroute = withRouter(Authroute)
export default Authroute
