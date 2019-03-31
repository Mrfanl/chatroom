import React from 'react';
import { Avatar,Row,Col,Divider,Icon,Input,Select,DatePicker,Cascader,AutoComplete} from 'antd';
import moment from 'moment';

import '../static/user.css';
import residence from'../component/residence';

const Option = Select.Option;

class Meinfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      NickName:'mrfanl',
      Name:'fanl',
      Birthday:'1998/01/08',
      Gender:'男',
      Address:'安徽省/合肥市/蜀山区',
      Email:'无',
      Note:'无',
      isChange:[0,0,0,0,0,0,0],
      result: []//用于输入邮箱
    }
  }

  selectChange = (v)=>{
    var tmp = this.state.isChange;
    tmp[v] = 1
    this.setState({
      isChange:tmp
    })

  }

//其中k表示State中的键,v表示点击事件（里面有输入的值），index表示第几个组件，便于隐藏修改框
  changeState = (k,v,index)=>{
    var tmp = this.state.isChange;
    tmp[index] = 0;

    //改变state中的值
    this.setState({
      [k]:v,
      isChange:tmp
    })

    //改变数据库中的值
  }
   //失去焦点时调用
  onBlur = (index)=>{
    var tmp = this.state.isChange;
    tmp[index] = 0;
    this.setState({
      isChange:tmp
    })
  }

  //邮箱的自动完成
  handleSearch = (value) => {
   let result;
   if (!value || value.indexOf('@') >= 0) {
     result = [];
   } else {
     result = ['gmail.com', '163.com', 'qq.com','sina.com'].map(domain => `${value}@${domain}`);
   }
   this.setState({ result });
 }

  render(){
    //用于邮箱的自动完成
    const { result } = this.state;
    const children = result.map(email => <Option key={email}>{email}</Option>);
    return (
      <div>
      <Row type="flex" justify="start">
        <Col span={2} xs>
          <a href="#"><Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/></a>
        </Col>
        {this.state.isChange[0]?
        <Input type="text" placeholder={this.state.NickName} style={{ 'width':'200px' }}  onBlur={()=>this.onBlur(0)} onPressEnter={(e)=>this.changeState("NickName",e.target.value,0)}  autoFocus/>
        :<h2 >{this.state.NickName}</h2>}
        <Icon type="edit" theme="twoTone" style={{'margin-left':'1em','margin-top':'10px'}} onClick={()=>this.selectChange(0)}/>

      </Row>
      <Divider dashed />
      <Row type="flex" justify="center" className={"MessageRow"}>
        <Col span={10}>姓名&emsp;
          {this.state.isChange[1]?
          <Input type="text" placeholder={this.state.Name} style={{ 'width':'200px' }} onBlur={()=>this.onBlur(1)} onPressEnter={(e)=>this.changeState("Name",e.target.value,1)}  autoFocus />
          :<span>{this.state.Name}</span>}
          <Icon type="edit" theme="twoTone" style={{'margin-left':'1em','margin-top':'10px'}} onClick={()=>this.selectChange(1)}/>
        </Col>
        <Col span={10}>性别&emsp;
          {this.state.isChange[2]?
          <Select defaultValue={this.state.Gender} style={{ 'width':'100px'}} onBlur={()=>this.onBlur(2)} onSelect={(v)=>this.changeState("Gender",v,2)} autoFocus open><Option value="男">男</Option><Option value="女">女</Option></Select>
          :<span>{this.state.Gender}</span>}
          <Icon type="edit" theme="twoTone" style={{'margin-left':'1em','margin-top':'10px'}} onClick={()=>this.selectChange(2)}/>
        </Col>
      </Row>

      <Row type="flex" justify="center" className={"MessageRow"}>
        <Col span={10}>生日 &emsp;
          {this.state.isChange[3]?
          <DatePicker defaultValue={moment(this.state.Birthday, 'YYYY/MM/DD')} style={{ 'width':'150px' }} format={'YYYY/MM/DD'} onBlur={()=>this.onBlur(3)} onChange={(e,v)=>this.changeState("Birthday",v,3)} autoFocus />
          :<span>{this.state.Birthday}</span>}
          <Icon type="edit" theme="twoTone" style={{'margin-left':'1em','margin-top':'10px'}} onClick={()=>this.selectChange(3)}/>
        </Col>
        <Col span={10}>家庭住址 &emsp;
          {this.state.isChange[4]?
          <Cascader options={residence} onChange={(e)=>this.changeState("Address",e,4)} onBlur={()=>this.onBlur(4)} style={{ 'width':'200px' }} placeholder={this.state.Address} autoFocus/>
          :<span>{this.state.Address}</span>}
          <Icon type="edit" theme="twoTone" style={{'margin-left':'1em','margin-top':'10px'}} onClick={()=>this.selectChange(4)}/>
        </Col>
      </Row>

      <Row type="flex" justify="center" className={"MessageRow"}>
        <Col span={10}>邮箱 &emsp;
          {this.state.isChange[5]?
          <AutoComplete style={{ width: 200 }} onSearch={this.handleSearch} onBlur={()=>this.onBlur(5)} onSelect={(v)=>this.changeState("Email",v,5)} placeholder={this.state.Email} autoFocus>{children}</AutoComplete>
            :<span>{this.state.Email}</span>}
          <Icon type="edit" theme="twoTone" style={{'margin-left':'1em','margin-top':'10px'}} onClick={()=>this.selectChange(5)}/>
        </Col>
        <Col span={10}>备注 &emsp;
          {this.state.isChange[6]?
          <Input type="text"  style={{ 'width':'200px' }} onBlur={()=>this.onBlur(6)} placeholder={this.state.Note}  onPressEnter={(e)=>this.changeState("Note",e.target.value,6)} autoFocus   />
          :<span>{this.state.Note}</span>}
          <Icon type="edit" theme="twoTone" style={{'margin-left':'1em','margin-top':'10px'}} onClick={()=>this.selectChange(6)}/>
        </Col>
      </Row>
      </div>
    );
  }
}

export default Meinfo;
