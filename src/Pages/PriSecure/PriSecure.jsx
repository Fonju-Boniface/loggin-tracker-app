import React from "react";
import "./PriSecure.scss";
import image from "../../assets/about03.png";
const PriSecure = () => {
  return (
    // <div>
    //     <h1 className="HeaderNAme">
    //     Our <b>Privacy & Security</b>
    //   </h1>
    // </div>

    <div className="aboutUs PriSecure display">
      <div className="img display">
        <div className="content display">
          <h1 className="HeaderNAme">
             <b>Privacy & Security</b>
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsum. Neque assumenda repellat quibusdam soluta aliquam, suscipit molestiae obcaecati, rem exercitationem accusantium, illum laudantium cumque. Quam eaque assumenda placeat sequi molestias dicta doloremque, quae quis mollitia sit quaerat provident explicabo qui cum illo! Quod, quis corrupti repudiandae officiis minus minima.0!</p>
        </div>
        <img src={image} alt={image} />
      </div>
    </div>
  );
};

export default PriSecure;
