import logo from './logo.svg';
import './App.css';
import AppContext from './ContextAPIs/AppContext';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'antd';



function App() {
  
  let defaultState={
    title: 'Conversion-Lamp',
    icon:'✨'
  };

  let [ appState, setAppState ] = useState(defaultState);


  return (
    <BrowserRouter>
      <Switch>
        <AppContext.Provider value={appState}>
            <div className="App">
              <div>
                {appState.icon} {appState.title }
                <Navbar />
              </div>
            </div>
        </AppContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
