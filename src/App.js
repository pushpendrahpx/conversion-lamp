import logo from './logo.svg';
import './App.css';
import AppContext from './ContextAPIs/AppContext';
import { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Button,Layout, Typography,Alert,notification } from 'antd';
import FileUploadComponent from './Components/FileUpload/FileUpload';
import Section1Component from './Components/LandingComponents/Section1/Section1';
import { useEffect } from 'react';


const { Title } = Typography;
const {Footer} = Layout;

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'This Project is underconstruction, it will start working soon',
  });
};
function App() {
  
  let defaultState={
    title: 'Conversion-Lamp',
    icon:'✨'
  };

  let [ appState, setAppState ] = useState(defaultState);
  useEffect(()=>{
    openNotificationWithIcon('error')
  },[])

  return (
    <AppContext.Provider value={appState}>
      <div className="App">
        <div>
          {/* {appState.icon} {appState.title } */}
          <Navbar />
          <Section1Component />
          <div style={{padding:"20px"}}>
          <Alert message="This Project is underconstruction, it will start working soon" type="error" />
            </div>
          <div style={{padding:"20px"}}>
            <FileUploadComponent />
          </div>
          <Footer>
            <div>
            <ul style={{listStyle:"none"}}>
              <li><Title level={5}> Reach Us at </Title></li>
              <li><a href={"https://github.com/pushpendrahpx/conversion-lamp"}>Github</a></li>
              <li><a href={"https://join.slack.com/t/conversion-lamp/shared_invite/zt-wl17ezcm-TWDqC2KzKlGvdV6QPY0hrg"}>Slack Channel</a></li>
            </ul>
            </div>

            <hr style={{borderTop:"1px solid #dedede"}} />
            <div style={{textAlign:"center"}}>
              <Title level={5}>
                Made with ❤️ by Open Source Community
              </Title>
            </div>
          </Footer>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
