import React from "react";
import "./Footer.scss";
import Cmflag from "./cameroon-flag.png";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaPhone,
  FaRegCopyright,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="Footer display">
      <div className="span-country display">
        <span>Cameroon | Yaounde</span>
        <span className="display">
          +237 <img src={Cmflag} alt="" />
        </span>
      </div>

      <div className="address display">
        <a href="mailto:bonifacefonju@gmail.com">
          {" "}
          <FaEnvelope />
        </a>
        <a href="tel:+237670436196">
          <FaPhone />
        </a>
        <a href="http://www.google.com">
          <FaGlobe />
        </a>
        <a href="#" className="sosLink">
          <FaTwitter />
        </a>
        <a href="#" className="sosLink">
          <FaFacebook />
        </a>
        <a href="#" className="sosLink">
          <FaLinkedin />
        </a>
        <a href="#" className="sosLink">
          <FaGithub />
        </a>
        <a href="#" className="sosLink">
          <FaInstagram />
        </a>
      </div>

      <div className="links display">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/profile">
          Edit profile
        </Link>
        <Link className="link" to="/contact-us">
          Contact Us
        </Link>
        <Link className="link" to="/how-to-use">
          How To Use
        </Link>
        <Link className="link" to="/Services">
          Our Services
        </Link>
        <Link className="link" to="/about-us">
          Our Company
        </Link>
        <Link className="link" to="/terms-policy">
          Terms & Policies
        </Link>
        <Link className="link" to="/privacy-security">
          Privacy and Security
        </Link>
        <Link className="link" to="/profile">
          Edit profile
        </Link>
        <Link className="link" to="/loggins">
          Loggins
        </Link>
      </div>

      <span className="cpy display">
        ~~~~ || <b><FaRegCopyright /></b>
        opyright || 2024/2025 ~~~ <b>LOGGIN TRACKER</b> ~~~~ || <b>Locked-Code</b> ||{" "}
        ~~~~</span>
    </div>
  );
};

export default Footer;
