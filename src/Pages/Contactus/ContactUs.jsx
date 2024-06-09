import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./ContactUs.scss"
import COntactBana from "../../assets/about03.png"
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter   } from "react-icons/fa6";
export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_9k7elih', 'template_tzrt7x9', form.current, {
        publicKey: '1M4P2cntb_bcTmNme',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="contact display flexCol">
      <h1 className="HeaderNAme">Contact Us</h1>
      <div className="Sect sectOne display ">
        <div className="imgCol display flexCol">
          <div className="img">
            <img src={COntactBana} alt="Contact IMG here" />
          </div>

          <div className="Social display">
            <div className="icsClas display">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook/>
              </a>
              <small>Facebook</small>
            </div>

            <div className="icsClas display">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin/>
              </a>
              <small>Linkedin</small>
            </div>

            <div className="icsClas display">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <small>Github</small>
            </div>

            <div className="icsClas display">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <small>Twitter</small>
            </div>
          </div>

        </div>


        <form className='sectOneForm display flexCol' ref={form} onSubmit={sendEmail}>
          <div className="formControl display flexCol">

            <label>Name</label>
            <input type="text" name="user_name" />
          </div>

          <div className="formControl display flexCol">

            <label>Email</label>
            <input type="email" name="user_email" />
          </div>
          <div className="formControl display flexCol">
            <label>Message</label>
            <textarea name="user_message" />
          </div>
          
          <input className='Submit' type="submit" value="Send" />
        </form>
      </div>

      <div className="Sect sectTwo display">
        <div className="sect">
          <h1>Our Location</h1>
          <ul className="display">
            <span className='addressL'><b>Address: </b>Africa | Cameroon | Yaounde, Dovv Essos</span>

            <a className='addressL' href="tel:+237670436196"><b>Tel: </b>+ 237 670 436 196 </a>
            <a className='addressL' href="mailto:bonifacefonju@gmail.com"><b>Email: </b>bonifacefonju@gmail.com</a>
            
            <div className="addressL">
              <b>Address History</b>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore sint quod, ratione velit fuga ipsam. Nemo vel aperiam aliquid molestias dolore earum tempore facere itaque? Reprehenderit consequuntur nemo, placeat maxime accusamus sit ipsum earum voluptate magni cumque ab, perferendis maiores odit deserunt soluta, eius eveniet impedit commodi natus doloribus accusantium? Eos doloremque libero adipisci. Dicta, rerum. Deserunt ipsum possimus tempora rem iusto suscipit, voluptas at incidunt maiores et consequatur cum omnis dicta, soluta, quos animi veniam hic id aut. Inventore doloribus quod eligendi obcaecati corrupti adipisci delectus. Provident vel nostrum, voluptates facilis maxime inventore porro alias quia expedita eaque neque.</p>
            </div>
          </ul>
        </div>

        <div className="sect">
          <h1>Map Location</h1>

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9287.21426689236!2d11.5342272520492!3d3.873455093254027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bc59bbeffdff7%3A0x1ae588457c62e753!2sDovv%20Essos!5e0!3m2!1sen!2scm!4v1714768631069!5m2!1sen!2scm" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

    </div>
  );
};
