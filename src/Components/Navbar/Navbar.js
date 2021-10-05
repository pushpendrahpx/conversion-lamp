import React from 'react'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

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
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
          
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Conversion Lamp
          
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          About 
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          Contact 
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar