import React from "react";

import ConversionLampLogo from "./../../../Assets/ConversionLampLogo.jpeg";

const Section1Component = (props)=>{
    return <div style={{width:"100vw",height:"40vh", textAlign:"center",background:"#2f54eb"}}>
        <div style={{display:"grid",placeContent:"center",height:"60%"}}>
            <img src={ConversionLampLogo} width="128px" height="128px" style={{borderRadius:"10px",boxShadow:"0 0 5px #dedede", cursor:"pointer"}}  />
        </div>
        <div style={{display:"grid",placeContent:"center",height:"40%", maxWidth:"646px",textAlign:"center",margin:"0 auto",padding:"10px",color:"white",fontSize:"28px"}}>
        A 📁 file conversion app, you'll ever need.
        </div>
    </div>
}
export default Section1Component