import "./App.css";
import AppContext from "./ContextAPIs/AppContext";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import FileUploadComponent from "./Components/FileUpload/FileUpload";
import Section1Component from "./Components/LandingComponents/Section1/Section1";
import FooterComponent from "./Components/FooterComponent/Footer";

function App() {
  let defaultState = {
    title: "Conversion-Lamp",
    icon: "✨",
  };

  let [appState] = useState(defaultState);

  return (
    <AppContext.Provider value={appState}>
      <div className="App">
        <div>
          <Navbar />
          <Section1Component />
          <div className="pd-20">
            <FileUploadComponent />
          </div>
          <div>
            <FooterComponent />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
