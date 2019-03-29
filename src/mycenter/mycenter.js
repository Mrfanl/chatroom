import React from 'react';
import { Menu,Icon,Card,Row,Col} from 'antd';
import { Route,Redirect,Switch}from 'react-router-dom';

import Header_Com from '../component/header_com';
import Footer_Com from '../component/footer_com';
import Meinfo from './meinfo';
import Friend from './friend';
import Mychatroom from './mychatroom';

import '../static/user.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const urls = ['/meinfo','/friend','/mychatroom'];

class MyCenter extends React.Component{
  constructor(props){
      super(props);
      this.state={
        linkroute:''
      };
  }
  handleClick = (e)=>{
    this.setState({
      linkroute:'/mycenter'+urls[e.key-1]
    });
  }
  render(){
    return(
      <div>
          {this.state.linkroute?<Redirect to={this.state.linkroute}/>:null}
          <Header_Com/>
          <Row gutter={4}>
          <Col span={3} xs>
          <div className="left-nav">
            <Menu
              onClick={this.handleClick}
              style={{ width:150,height:'100%'}}
              defaultSelectedKeys={['1']}
              mode="vertical"
              theme='light'>
                <Menu.Item key="1"><Icon type="user" />个人信息</Menu.Item>
                <Menu.Item key="2"><Icon type="team" />好友列表</Menu.Item>
                <Menu.Item key="3"><Icon type="home" />加入的聊天室</Menu.Item>
            </Menu>
          </div>
          </Col>
          <Col span={18} xs>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Switch>
            <Route path={`${this.props.match.url}/meinfo`} component={Meinfo}/>
            <Route path={`${this.props.match.url}/friend`} component={Friend}/>
            <Route path={`${this.props.match.url}/mychatroom`} component={Mychatroom}/>
          </Switch>
          </div>
          </Col>
          </Row>
          <Footer_Com/>s
      </div>
    );
  }
}
export default MyCenter;
