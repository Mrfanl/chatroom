import React from 'react';
import { Avatar,Row,Col,Divider,Icon,Input,Select,DatePicker,Cascader,AutoComplete,Modal,List} from 'antd';
import { connect } from 'react-redux';
import provinces from "china-division/dist/provinces.json";
import cities from "china-division/dist/cities.json";
import areas from "china-division/dist/areas.json";
import moment from 'moment';

import '../static/user.css';
import { query_one,change_one } from '../redux/user.redux';
import getCookie from '../util/getCookie';

const Option = Select.Option;

areas.forEach(area => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.code
    });
  }
});

cities.forEach(city => {
  const matchProvince = provinces.filter(
    province => province.code === city.provinceCode
  )[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children
    });
  }
});

const options = provinces.map(province => ({
  label: province.name,
  value: province.code,
  children: province.children
}));

class Meinfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      NickName:'mrfanl',
      Name:'',
      Birthday:'',
      Gender:'',
      Address:'',
      Avatar:'',//
      Email:'',
      Note:'',
      isChange:[0,0,0,0,0,0,0],
      result: [],//用于输入邮箱
      visible:false,//用于头像选择框是否显示
    }
  }

  componentWillMount(){
    const cookie_user = getCookie('user');
    this.props.query_one(cookie_user);
    setTimeout(()=>{
      this.setState({
        NickName:this.props.NickName,
        Name:this.props.Name,
        Birthday:this.props.Birthday,
        Gender:this.props.Gender,
        Address:this.props.Address,
        Email:this.props.Email,
        Note:this.props.Note,
        Avatar:this.props.Avatar,
      });
    },500);
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

    var tmp1 = this.state.isChange;
    tmp1[index] = 0;
    var tmp2 = {...this.state,[k]:v}
    this.props.change_one(tmp2);
    //改变state中的值
    this.setState({
    [k]:v,
    isChange:tmp1
  })
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

//头像选择框点击确定
 handleOk = (e) => {
   this.setState({
     visible: false,
   });
   this.props.change_one(this.state);
 }

//头像选择框点击取消
 handleCancel = (e) => {
   this.setState({
     visible: false,
   });
 }

 //点击头像显示出头像选择框
 selectAvatar = ()=>{
   this.setState({
     visible: true,
   });
 }

//点击头像选择指定的头像
 clickAvatar = (v)=>{
   this.setState({
     Avatar:v
   });

 }


  render(){
    console.log(this.state.Avatar)
    //用于邮箱的自动完成
    const { result } = this.state;
    const children = result.map(email => <Option key={email}>{email}</Option>);

    //存放所有图片的地址
    const avatarList='atongmu,baicai,boluo,haidao,kongshao,tuzi,women,xiaowanzi,xinpuseng,yazi,yifu,zhanshi'
                       .split(',')
                       .map(v=>({
                         icon:'/avatar/'+v+'.jpeg',
                         text:v
                       }));

    return (
      <div>
      <Row type="flex" justify="start">
        <Col span={2}>
          <a onClick={()=>this.selectAvatar()} ><Avatar size="large" src={this.state.Avatar}/></a>
        </Col>
      <h2 >{this.state.NickName}</h2>
      </Row>
      <Divider dashed />
      <Row type="flex" justify="center" className={"MessageRow"}>
        <Col span={10}>姓名&emsp;
          {this.state.isChange[1]?
          <Input type="text" placeholder={this.state.Name} style={{ 'width':'200px' }} onBlur={()=>this.onBlur(1)} onPressEnter={(e)=>this.changeState("Name",e.target.value,1)}  autoFocus />
          :<span>{this.state.Name}</span>}
          <Icon type="edit" theme="twoTone" style={{'marginLeft':'1em','marginTop':'10px'}} onClick={()=>this.selectChange(1)}/>
        </Col>
        <Col span={10}>性别&emsp;
          {this.state.isChange[2]?
          <Select defaultValue={this.state.Gender} style={{ 'width':'100px'}} onBlur={()=>this.onBlur(2)} onSelect={(v)=>this.changeState("Gender",v,2)} autoFocus open><Option value="1">男</Option><Option value="0">女</Option></Select>
          :<span>{(this.state.Gender===1)?'男':'女'}</span>}
          <Icon type="edit" theme="twoTone" style={{'marginLeft':'1em','marginTop':'10px'}} onClick={()=>this.selectChange(2)}/>
        </Col>
      </Row>

      <Row type="flex" justify="center" className={"MessageRow"}>
        <Col span={10}>生日 &emsp;
          {this.state.isChange[3]?
          <DatePicker  style={{ 'width':'150px' }} format={'YYYY/MM/DD'}  onChange={(e,v)=>this.changeState("Birthday",v,3)} autoFocus />
          :<span>{this.state.Birthday}</span>}
          <Icon type="edit" theme="twoTone" style={{'marginLeft':'1em','marginTop':'10px'}} onClick={()=>this.selectChange(3)}/>
        </Col>
        <Col span={10}>家庭住址 &emsp;
          {this.state.isChange[4]?
          <Cascader options={options} onChange={(v,e)=>this.changeState("Address",e[0].label+'/'+e[1].label+'/'+e[2].label,4)}  style={{ 'width':'200px' }} placeholder={this.state.Address} autoFocus/>
          :<span>{this.state.Address}</span>}
          <Icon type="edit" theme="twoTone" style={{'marginLeft':'1em','marginTop':'10px'}} onClick={()=>this.selectChange(4)}/>
        </Col>
      </Row>

      <Row type="flex" justify="center" className={"MessageRow"}>
        <Col span={10}>邮箱 &emsp;
          {this.state.isChange[5]?
          <AutoComplete style={{ width: 200 }} onSearch={this.handleSearch} onBlur={()=>this.onBlur(5)} onSelect={(v)=>this.changeState("Email",v,5)} placeholder={this.state.Email} autoFocus>{children}</AutoComplete>
            :<span>{this.state.Email}</span>}
          <Icon type="edit" theme="twoTone" style={{'marginLeft':'1em','marginTop':'10px'}} onClick={()=>this.selectChange(5)}/>
        </Col>
        <Col span={10}>备注 &emsp;
          {this.state.isChange[6]?
          <Input type="text"  style={{ 'width':'200px' }} onBlur={()=>this.onBlur(6)} placeholder={this.state.Note}  onPressEnter={(e)=>this.changeState("Note",e.target.value,6)} autoFocus   />
          :<span>{this.state.Note}</span>}
          <Icon type="edit" theme="twoTone" style={{'marginLeft':'1em','marginTop':'10px'}} onClick={()=>this.selectChange(6)}/>
        </Col>
      </Row>
    {/*选择头像*/}
      <Modal
          title="选择你的头像"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
{/*gutter: 20, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,*/}
        <List
          grid={{
             gutter: 16, column: 4

          }}
          dataSource={avatarList}
          renderItem={item => (
          <List.Item>
          <a onClick={()=>this.clickAvatar(item.icon)}>  <Avatar  size="large" src={item.icon} alt="无法显示"/> </a>
          </List.Item>
          )}
        />
        </Modal>

      </div>
    );
  }
}
Meinfo = connect(state=>state.User,{ query_one,change_one})(Meinfo)

export default Meinfo;
