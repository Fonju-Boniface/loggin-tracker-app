import React from "react";
import "./AboutUs.scss";
import image from "../../assets/about03.png";

const AboutUs = () => {
  return (
    <div className="aboutUs display">
      <div className="img display">
        <div className="content display">
          <div className="boxes display">
            <a href="#aboutText" className="span">
              About Our Company
            </a>
            <a href="#OurVission" className="span">
              {" "}
              Our Vission
            </a>
            <a href="#OurMission" className="span">
              {" "}
              Our Mission
            </a>
            <a href="#OurObjectives" className="span">
              {" "}
              Our Objectives{" "}
            </a>
            <a href="#Ourtarget" className="span">
              {" "}
              Who We Target{" "}
            </a>
            <a href="#OurTeam" className="span">
              {" "}
              Our Team{" "}
            </a>
            <a href="#OurSponsors" className="span">
              {" "}
              Big Sponsors{" "}
            </a>
            {/* <a href='#' className='span'> Our Partnership </a> */}
          </div>
        </div>
        <img src={image} alt={image} />
      </div>

      <div className="aboutText" id="aboutText">
        <h3>Who We Are</h3>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eius
          magnam ex dolore quos iste est quod accusantium cum temporibus!
          Cumque, ipsam? Asperiores possimus recusandae, suscipit odit nesciunt
          mollitia ea iste, repellat quisquam illo culpa exercitationem.
          Exercitationem asperiores unde minus cumque corrupti architecto
          mollitia maxime doloremque aliquid, error culpa veniam possimus vitae
          temporibus in velit accusamus cupiditate? Harum consequuntur
          voluptatibus ex. Recusandae aliquid eum unde quod vero architecto
          molestiae, cum vitae labore deserunt quasi tempora? Accusantium porro
          impedit obcaecati quis tempora unde magni, aspernatur nesciunt
          blanditiis asperiores non itaque dicta quos corporis placeat
          reiciendis molestias tenetur dolorem quasi pariatur eos delectus,
          deserunt similique. Vero expedita dignissimos aspernatur deleniti
          mollitia corrupti, libero possimus. Quasi aliquid, ut officia,
          deserunt dolore unde culpa, voluptatem distinctio doloremque cumque
          aspernatur nostrum natus. Molestias, eos nostrum.
        </p>
      </div>

      <div className="MisVisob display" id="OurMission">
        <div className="box" id="OurMission">
          <h3>Our Mission</h3>
          <br />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
            a omnis, praesentium distinctio possimus unde et temporibus
            repudiandae assumenda error. Vero illum tenetur voluptate facere sit
            molestiae, rerum sint! Accusamus!
          </p>
        </div>
        <div className="box" id="OurVission">
          <h3>Our Vission</h3>
          <br />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
            a omnis, praesentium distinctio possimus unde et temporibus
            repudiandae assumenda error. Vero illum tenetur voluptate facere sit
            molestiae, rerum sint! Accusamus!
          </p>
        </div>
        <div className="box" id="OurObjectives">
          <h3>Our Objectives</h3>
          <br />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
            a omnis, praesentium distinctio possimus unde et temporibus
            repudiandae assumenda error. Vero illum tenetur voluptate facere sit
            molestiae, rerum sint! Accusamus!
          </p>
        </div>
        <div className="box" id="Ourtarget">
          <h3>Our Who We Target</h3>
          <br />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
            a omnis, praesentium distinctio possimus unde et temporibus
            repudiandae assumenda error. Vero illum tenetur voluptate facere sit
            molestiae, rerum sint! Accusamus!
          </p>
        </div>
      </div>
        <br />

      <div className="team" id="OurTeam">
        <h3>Our Team</h3>
        <br />
        <div className="cards display">

            <div className="card display">
                <div className="imag">
                    <img src={image} alt="" />
                </div>
                <br />
                <div className="info display">
                    <h4>John Doe</h4>
                    <b>CEO And Co-founder</b>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
                    eius magnam ex dolore quos iste est quod accusantium cum
                    temporibus! Cumque.
                    </p>
                </div>

            </div>
            
            <div className="card display">
                <div className="imag">
                    <img src={image} alt="" />
                </div>
                <br />
                <div className="info display">
                    <h4>John Doe</h4>
                    <b>CEO And Co-founder</b>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
                    eius magnam ex dolore quos iste est quod accusantium cum
                    temporibus! Cumque.
                    </p>
                </div>

            </div>

            <div className="card display">
                <div className="imag">
                    <img src={image} alt="" />
                </div>
                <br />
                <div className="info display">
                    <h4>John Doe</h4>
                    <b>CEO And Co-founder</b>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
                    eius magnam ex dolore quos iste est quod accusantium cum
                    temporibus! Cumque.
                    </p>
                </div>

            </div>

            <div className="card display">
                <div className="imag">
                    <img src={image} alt="" />
                </div>
                <br />
                <div className="info display">
                    <h4>John Doe</h4>
                    <b>CEO And Co-founder</b>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
                    eius magnam ex dolore quos iste est quod accusantium cum
                    temporibus! Cumque.
                    </p>
                </div>

            </div>
        </div>
      </div>

      <div className="team OurSponsors" id="OurSponsors">
        <h3>Our Sponsors</h3>
        <br />
        <div className="cards display">

            <div className="card display">
                <div className="imag">
                    <img src={image} alt="" />
                </div>
                <br />
                <div className="info display">
                    <h4>John Doe</h4>
                    <b>CEO And Co-founder</b>
                </div>

            </div>
            <div className="card display">
                <div className="imag">
                    <img src={image} alt="" />
                </div>
                <br />
                <div className="info display">
                    <h4>John Doe</h4>
                    <b>CEO And Co-founder</b>
                </div>

            </div>
            <div className="card display">
                <div className="imag">
                    <img src={image} alt="" />
                </div>
                <br />
                <div className="info display">
                    <h4>John Doe</h4>
                    <b>CEO And Co-founder</b>
                </div>

            </div>
            <div className="card display">
                <div className="imag">
                    <img src={image} alt="" />
                </div>
                <br />
                <div className="info display">
                    <h4>John Doe</h4>
                    <b>CEO And Co-founder</b>
                </div>

            </div>
            
           
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
