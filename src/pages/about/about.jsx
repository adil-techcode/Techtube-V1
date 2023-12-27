import React from "react";
import Header from "../../layout/header/header";
import styles from "./about.module.css";
import Footer from "../../layout/footer/footer";

import Aboutsvg from "../../components/svg/aboutsvg";

import pfp from "../../assests/about/profile-pic-9dc398d4.png";
import {
    FaFacebook,
    FaTwitter,
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaWhatsapp,
  } from "react-icons/fa";

import { useEffect } from "react";

import AOS from "aos";

const About = () => {
  document.title = "About"
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <Header />
      <div className={`container ${styles.aboutsection1}`}>
        <div className="row">
          <div
            data-aos="flip-up"
            className={` col-12 mt-5  px-3 order-2 order-md-1  col-md-6 d-flex align-items-start  justify-content-center flex-column ${styles.aboutsection1About}`}
          >
            <h1>About Us</h1>
            <p>
              Welcome to our technology-centric platform! At{" "}
              <strong> Techtube </strong> , we are dedicated to bringing you
              handpicked YouTube playlists covering a wide range of topics,
              including technology, web app development, and blockchain. Our
              mission is to provide a valuable resource for enthusiasts,
              learners, and professionals in the tech industry.
            </p>
            <p>
              Explore our curated playlists to stay updated on the latest
              trends, tutorials, and insights in the ever-evolving world of
              technology. Whether you're a seasoned developer or just starting
              your journey, <strong> Techtube </strong> is here to support your
              learning and growth.
            </p>
          </div>
          <div
            data-aos="flip-up"
            className={` col-12 col-md-6  order-1 order-md-2  d-flex align-items-center  justify-content-center  ${styles.aboutsection1Svg}`}
          >
            <Aboutsvg />
          </div>
        </div>
      </div>

      <div className={`container ${styles.aboutsection2}`}>
        <div className="row">
          <div
            data-aos="flip-down"
            className={` col-12 col-md-6  mt-3 order-1 order-md-1  d-flex align-items-center  justify-content-center  ${styles.aboutsection2pfp}`}
          >
            <img src={pfp} alt="pfp" className="rounded-circle mr-3" />
          </div>

          <div
            data-aos="flip-down"
            className={` col-12 mt-5  px-3 order-2 order-md-2  col-md-6 d-flex align-items-start  justify-content-center flex-column ${styles.aboutsection1About}`}
          >
            <h1> Meet the Developer </h1>
            <p>
              Hello, I'm Adil Amin, the founder, and developer behind{" "}
              <strong> Techtube </strong> . With a passion for technology and a
              commitment to education, I created this platform to foster a
              community of knowledge-sharing and skill development. My goal is
              to make <strong> Techtube </strong> a go-to resource for anyone
              interested in staying informed and empowered in the rapidly
              advancing field of technology.
            </p>
            <p>
              As a developer, I understand the importance of accessible and
              curated content. I strive to create an environment where learning
              is not only informative but also enjoyable. Join me on this
              journey of exploration and skill-building, and let's navigate the
              exciting landscape of technology together!
            </p>

            <div className={`${styles.SocailWrapper}`}>
            <a  href="https://www.linkedin.com/in/adil-amin-bhatti520">
              {" "}
              <FaLinkedin size={30} color="white" />{" "}
            </a>
            <a  href="https://github.com/adil-techcode"  >
              {" "}
              <FaGithub size={30} color="white" />{" "}
            </a>
            <a  href="https://wa.me/qr/APPS2AEJBU4RK1">
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
            <a  href="https://www.facebook.com/profile.php?id=100018624416353&mibextid=ZbWKwL"  >
              {" "}
              <FaFacebook size={30} color="white" />{" "}
            </a>
          </div>
          </div>
        </div>
      </div>

      <div className={`${styles.footer}`}>
        <Footer />
      </div>
    </div>
  );
};

export default About;
