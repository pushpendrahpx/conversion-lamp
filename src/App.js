import logo from './logo.svg';
import './App.css';
import AppContext from './ContextAPIs/AppContext';
import { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Button } from 'antd';



function App() {
  
  let defaultState={
    title: 'Conversion-Lamp',
    icon:'✨'
  };

  let [ appState, setAppState ] = useState(defaultState);


  return (
    <AppContext.Provider value={appState}>
      <div className="App">
        <div>
          {appState.icon} {appState.title }
          <Navbar />
          <div style={{
            width: "100vw",
            height: "100vh",
            display: "grid",
            placeContent: "center"
          }}>
          <Button type="primary" >Button</Button>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
