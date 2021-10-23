import React from "react";
import { Menu, Layout, Typography, Breadcrumb } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
const { Footer } = Layout;
const { SubMenu } = Menu;

class FooterComponent extends React.Component {
  render() {
    return (
        <Footer>
        <div>
          <ul className="footer-ul">
            <li>
              <Title level={5}> Reach Us at </Title>
            </li>
            <li>
              <a href={"https://github.com/pushpendrahpx/conversion-lamp"}>
                Github
              </a>
            </li>
            <li>
              <a
                href={
                  "https://join.slack.com/t/conversion-lamp/shared_invite/zt-wl17ezcm-TWDqC2KzKlGvdV6QPY0hrg"
                }
              >
                Slack Channel
              </a>
            </li>
          </ul>
        </div>

        <hr className="footer-hr" />
        <div className="text-center">
          <Title level={5}>Made with ❤️ by Open Source Community</Title>
        </div>
      </Footer>
    );
  }
}

export default FooterComponent;
