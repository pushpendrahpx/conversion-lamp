import React from "react";
import "./Navbar.css";
import { Menu, Layout, Breadcrumb } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

class Navbar extends React.Component {
  state = {
    current: "mail",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Layout>
        <Header className="header-cover">
          <a href="/">
            <div className="logo">ConversionLamp</div>
          </a>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            className="menu-cover"
          >
            <Menu.Item key="1">Blogs</Menu.Item>
            <Menu.Item key="2">
              {" "}
              <a href="https://github.com/pushpendrahpx/conversion-lamp">
                Github
              </a>
            </Menu.Item>
            <Menu.Item key="3">Sponsor</Menu.Item>
            <Menu.Item key="4"> About </Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout"></Content>
      </Layout>
    );
  }
}

export default Navbar;
