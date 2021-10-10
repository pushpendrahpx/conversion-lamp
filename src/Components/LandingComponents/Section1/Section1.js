import React from "react";
import "./Section1.css";
import ConversionLampLogo from "./../../../Assets/ConversionLampLogo.jpeg";

const Section1Component = (props) => {
  return (
    <div className="image-cover">
      <div className="image-inner">
        <img
          src={ConversionLampLogo}
          className="lamp-logo"
          alt="Conversion Lamp Logo"
        />
      </div>
      <div className="moto">A 📁 file conversion app, you'll ever need.</div>
    </div>
  );
};
export default Section1Component;
