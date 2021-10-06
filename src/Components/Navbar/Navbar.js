import React from 'react'
import { Menu, Layout,Breadcrumb } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

class Navbar extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display:"inline-flex" }}>
      <a href="/">
        <div className="logo" style={{color:"white", fontSize:"24px",cursor:"pointer",userSelect:"none"}}>
          ConversionLamp
        </div>
      </a>

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{float:"right",placeContent:"end",width:"100%"}}>
        <Menu.Item key="1">Blogs</Menu.Item>
        <Menu.Item key="2"> <a href="https://github.com/pushpendrahpx/conversion-lamp">Github</a></Menu.Item>
        <Menu.Item key="3">Sponsor</Menu.Item>
        <Menu.Item key="4"> About </Menu.Item>
      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      
    </Content>
  </Layout>
    );
  }
}

export default Navbar