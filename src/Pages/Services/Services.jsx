import React from "react";
import { FcPrivacy } from "react-icons/fc";
import "./Services.scss";

const Services = () => {
  return (
    <div className="Services display">
      <div className="block display">
        <h3 className="HeaderNAme">Services</h3>
        <p>
          he login tracker application provides a valuable service for users to
          efficiently manage and organize their login credentials. With its
          clean and user-friendly interface, the application simplifies the
          process of keeping track of multiple accounts, ensuring users never
          forget their login information again. The application offers a secure
          and convenient way to store usernames, passwords, and other relevant
          details, allowing users to access their accounts with ease. By
          providing a centralized platform to store and manage login
          credentials, the application enhances security and reduces the risk of
          forgetting or misplacing vital information. With its intuitive design
          and comprehensive features, the login tracker application is a
          reliable companion for users seeking a convenient and efficient
          solution to manage their login credentials effectively.{" "}
          <b>Some of our services includes;</b>
        </p>
      </div>

      <div className="cards display">
        
        <div className="card display">
          <span className="display">
            <FcPrivacy />
          </span>
          <h3>Security</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            tempora amet accusantium quas at .
          </p>
        </div>

        <div className="card display">
          <span className="display">
            <FcPrivacy />
          </span>
          <h3>Security</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            tempora amet accusantium quas at .
          </p>
        </div>

        <div className="card display">
          <span className="display">
            <FcPrivacy />
          </span>
          <h3>Security</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            tempora amet accusantium quas at .
          </p>
        </div>

        <div className="card display">
          <span className="display">
            <FcPrivacy />
          </span>
          <h3>Security</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            tempora amet accusantium quas at .
          </p>
        </div>

        <div className="card display">
          <span className="display">
            <FcPrivacy />
          </span>
          <h3>Security</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            tempora amet accusantium quas at .
          </p>
        </div>


      </div>
    </div>
  );
};

export default Services;
