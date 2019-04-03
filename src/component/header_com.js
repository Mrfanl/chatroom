import React from 'react';
import { Input,Icon,Button,Avatar } from 'antd';
import browserCookie from 'browser-cookies';
import '../static/layout.css';
import getCookie from '../util/getCookie';
import { query_one } from '../redux/user.redux';
import { connect } from 'react-redux';

const Search = Input.Search;

class Header_Com extends React.Component{
  constructor(props){
    super(props);
    this.state={
      current:'',
      Avatar:'',
    }
  }

  componentWillMount(){
    const cookie_user = getCookie('user');
    if(cookie_user){
      this.props.query_one(cookie_user);
        setTimeout(()=>{
          this.setState({
            Avatar:this.props.Avatar,
          });
        },500);
      }
    }

  handleLogout = ()=>{
    browserCookie.erase('user');
    window.location.href = window.location.href
  }

  render(){
    return(
      <ul className="header-ul">
        <li className="header-li">  <span>ChatRoom</span></li>
        <li className="header-li">  <a href="#1"><Icon type='home'/>主页  </a></li>
        <li className="header-li">  <a href="#2"><Icon type='team'/>聊天室   </a></li>
        <li className="header-li">  <a href="/mycenter/meinfo"><Icon type='user'/>个人中心  </a> </li>
        <li className="header-search">
        <Search
         placeholder="input search text"
         style={{width:200}}/>
        </li>
        <li className="header-li">
           {this.state.Avatar==''?
             <a href="/register" style={{'marginRight':'1em'}}><Button ghost>注册</Button></a>:
             <Avatar style={{'marginRight':'1em'}} size="large" src={this.state.Avatar} alt="无法显示"/>}
           {getCookie('user')?<Button style={{'marginLeft':'1em','marginTop':'1.5em'}} ghost onClick={()=>this.handleLogout()}>退出</Button>:null}
        </li>
     </ul>
    );
  }
}

Header_Com = connect(state=>state.User,{ query_one })(Header_Com)
export default Header_Com;
