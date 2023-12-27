import React from "react";
import Header from "../../layout/header/header";
import styles from "./contact.module.css";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import Footer from "../../layout/footer/footer";
import { useEffect } from "react";
import AOS from "aos";
const Contact = () => {
  useEffect(() => {
    document.title = "Contact";
    AOS.init();
  }, []);

  return (
    <div>
      <Header />
      <div
        data-aos="zoom-in"
        className="container d-flex justify-content-center mt-5  "
      >
        <div className={`${styles.contactWrapper}`}>
          <h1> Contact Us </h1>

          <div className={`${styles.SocailWrapper}`}>
            <a href="https://www.linkedin.com/in/adil-amin-bhatti520">
              {" "}
              <FaLinkedin size={30} color="white" />{" "}
            </a>
            <a href="https://github.com/adil-techcode">
              {" "}
              <FaGithub size={30} color="white" />{" "}
            </a>
            <a href="https://wa.me/qr/APPS2AEJBU4RK1">
              {" "}
              <FaWhatsapp size={30} color="white" />{" "}
            </a>
            <a href="https://www.instagram.com/adil_amin_bhatti">
              {" "}
              <FaInstagram size={30} color="white" />{" "}
            </a>
            <a href="https://twitter.com/AD___520?t=iatHVCPW8K11FItZOLXneg&s=09">
              {" "}
              <FaTwitter size={30} color="white" />{" "}
            </a>
            <a href="https://www.facebook.com/profile.php?id=100018624416353&mibextid=ZbWKwL">
              {" "}
              <FaFacebook size={30} color="white" />{" "}
            </a>
          </div>

          <form
            action="mailto:adiltechcode@gmail.com"
            method="POST"
            className={`${styles.ContactForm} `}
          >
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  id=""
                />
              </div>
              <div className="col-6">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder=" Your Email"
                  id=""
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Subject"
                  id=""
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <textarea
                  name="message"
                  required
                  placeholder="Your Message"
                  id=""
                  cols="30"
                  rows="15"
                ></textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-12  text-end">
                <input type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={`${styles.footer}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
