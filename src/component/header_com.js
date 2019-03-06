import React from 'react';
import { Menu,Icon } from 'antd';

import '../static/layout.css';


const MenuItemGroup = Menu.ItemGroup;

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
      <li className="header-li">     <span>ChatRoom</span></li>
      <li className="header-li">     <a href="#1"><Icon type='home'/>主页  </a></li>
      <li className="header-li">     <a href="#2"><Icon type='team'/>聊天室   </a></li>
      <li className="header-li">     <a href="#3"><Icon type='user'/>个人中心  </a> </li>
     </ul>
    );
  }
}

export default Header_Com;
