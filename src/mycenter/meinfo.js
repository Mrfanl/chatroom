import React from 'react';
import { Avatar,Row,Col,Divider,Icon} from 'antd';

import '../static/user.css';

class Meinfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      NickName:'mrfanl',
      Name:'fanl',
      Birthday:'1998',
      Gender:'男',
      Address:'安徽省',
      Email:'无',
      Others:'无'
    }
  }

  changeName = ()=>{

  }

  render(){
    return (
      <div>
      <Row type="flex" justify="start">
        <Col span={2} xs>
          <a href="#"><Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/></a>
        </Col>
        <Col span={2} xs>
          <h2>{this.state.NickName}</h2>
        </Col>
        <Col span={2} style={{"marginTop":"8px"}} xs>
          <Icon type="edit" theme="twoTone" onClick={()=>this.changeName()}/>
        </Col>
      </Row>
      <Divider dashed />
      <Row type="flex" justify="center" className={"MessageRow"}>
        <Col span={10}>姓名&emsp;{this.state.Name}</Col>
        <Col span={10}>性别&emsp;{this.state.Gender}</Col>
      </Row>
      <Row type="flex" justify="center" className={"MessageRow"}>
        <Col span={10}>生日 &emsp;{this.state.Birthday}</Col>

        <Col span={10}>家庭住址 &emsp;{this.state.Address}</Col>

      </Row>
      <Row type="flex" justify="center" className={"MessageRow"}>
        <Col span={10}>邮箱 &emsp;{this.state.Email}</Col>

        <Col span={10}>备注 &emsp;{this.state.Others}</Col>

      </Row>
      </div>
    );
  }
}

export default Meinfo;
