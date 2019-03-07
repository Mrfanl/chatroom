import React from 'react';
import { Input,Icon,Button } from 'antd';

import '../static/layout.css';


const Search = Input.Search;

class Header_Com extends React.Component{
  constructor(props){
    super(props);
    this.state={
      current:'',
    }
  }
  render(){
    return(
      <ul className="header-ul">
        <li className="header-li">  <span>ChatRoom</span></li>
        <li className="header-li">  <a href="#1"><Icon type='home'/>主页  </a></li>
        <li className="header-li">  <a href="#2"><Icon type='team'/>聊天室   </a></li>
        <li className="header-li">  <a href="#3"><Icon type='user'/>个人中心  </a> </li>
        <li className="header-search">
        <Search
         placeholder="input search text"
         style={{width:200}}/>
        </li>
        <li className="header-li">
           <a href="/register"><Button ghost>注册</Button></a>
        </li>
     </ul>
    );
  }
}

export default Header_Com;
