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
          <Button type="primary" >dhfgj</Button>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
