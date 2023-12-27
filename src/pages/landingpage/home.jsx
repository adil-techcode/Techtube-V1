import React from "react";
import Header from "../../layout/header/header";
import styles from "./homey.module.css";
import Svgherosection from "../../components/svg/svgherosection";
import { Link } from "react-router-dom";
import Videosvg from "../../components/svg/videosvg";
import AOS from "aos";

import Supporticon from "../../components/svg/supportsvg";
import Teachersvg from "../../components/svg/teachersvg";
import Hdsvg from "../../components/svg/hdsvg";

import Section4svg from "../../components/svg/section4svg";
import HomeSlider from "../../components/slider/slider";

import sect5logo1 from "../../assests/home/section5partner/code eater.png";
import sect5logo2 from "../../assests/home/section5partner/dapp logo.png";
import sect5logo3 from "../../assests/home/section5partner/jawan pakistan.png";
import sect5logo4 from "../../assests/home/section5partner/js-mastery.png";

import Footer from "../../layout/footer/footer";

import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home"
    AOS.init();
  }, []);

  return (
    <div>
      <Header />

      {/* Hero Section */}

      <div className="container-fluid">
        <div className="row">
          <div
            data-aos="zoom-in"
            className={`col-12 col-md-6 p-4 ${styles.heroSectionP1}`}
          >
            <h6>Discover the Ultimate Online Learning Hub</h6>
            <h1>Curated Selection of Premier Online Courses</h1>
            <h6 className="text-muted">
              Elevate your skills with top-notch courses on the best platforms
            </h6>
            <button type="button" class="btn btn-success">
              {" "}
              <Link
                className="text-decoration-none text-white "
                to={"/courses"}
              >
                {" "}
                Get Started{" "}
              </Link>{" "}
            </button>
          </div>
          <div className={`col-12 col-md-6  ${styles.heroSectionP2} `}>
            <div className={`${styles.heroSectionSvg} `}>
              <Svgherosection />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="container mt-5 d-flex justify-content-center  align-items-center ">
        <div className={`row justify-content-between ${styles.section2Row} `}>
          <div
            data-aos="fade-down"
            className={` col-11 col-sm-4 col-md-4 col-lg-2  m-3 shadow   ${styles.statsbox}`}
          >
            <div className={`${styles.statsSectionsvg}`}>
              <Videosvg />
            </div>
            <p className="text-muted fw-bold mt-2 mx-3">
              100+ <br /> Courses
            </p>
          </div>
          <div
            data-aos="fade-down"
            className={`col-11 col-sm-4 col-md-4 col-lg-2 m-3 shadow  ${styles.statsbox}`}
          >
            <div className={`${styles.statsSectionsvg}`}>
              <Hdsvg />
            </div>
            <p className="text-muted fw-bold mt-2  mx-3">
              Quality <br /> Videos{" "}
            </p>
          </div>
          <div
            data-aos="fade-down"
            className={`col-11 col-sm-4 col-md-4 col-lg-2 m-3 shadow   ${styles.statsbox}`}
          >
            <div className={`${styles.statsSectionsvg}`}>
              <Teachersvg />
            </div>
            <p className="text-muted fw-bold mt-2  mx-3">
              Expert <br /> Mentors
            </p>
          </div>

          <div
            data-aos="fade-down"
            className={`col-11 col-sm-4 col-md-4 col-lg-2 m-3 shadow  ${styles.statsbox}`}
          >
            <div className={`${styles.statsSectionsvg}`}>
              <Supporticon />
            </div>
            <p className="text-muted fw-bold mt-2 mx-3">
              24/7 <br /> Support{" "}
            </p>
          </div>
        </div>
      </div>

      {/*  section 3 Slider  */}

      <div className="container d-flex justify-content-center flex-column  align-items-center  mt-5 ">
        <div className={`text-center mb-3 ${styles.section3Header} `}>
          <h6> Categories </h6>
          <h1> Most Popular Categories </h1>
        </div>
        <HomeSlider />
      </div>

      {/* Section 4  */}

      <div className={`container-fluid ${styles.section4} `}>
        <div className="row py-5 x-3   ">
          <div
            data-aos="fade-up"
            className={` col-12 col-md-6    d-flex justify-content-center ${styles.section4svg} `}
          >
            <Section4svg />
          </div>
          <div data-aos="fade-down" className="col-12 col-md-6 ">
            <div
              className={` mb-3 d-flex justify-content-center align-items-start px-3 flex-column ${styles.section4Mentor} `}
            >
              <h1> Want to Share Your Knowledge? Join us a Mentor </h1>
              <h6> Best Youtube Courses </h6>
              <h6> Best Youtube Instructor </h6>
              <button type="button" class="btn btn-success">
                {" "}
                <Link
                  className="text-decoration-none text-white "
                  to={"/courses"}
                >
                  {" "}
                  Contact Us{" "}
                </Link>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5 */}

      <div className="container d-flex justify-content-center flex-column  align-items-center mb-3  mt-5">
        <div className={`text-center mb-3 ${styles.section5Header} `}>
          <h6> Trusted by </h6>
          <h1> 10 + Youtube Channels and Mentors </h1>
        </div>
        <div className="row">
          <div data-aos="fade-down" className="col-8  col-md-6 ">
            {" "}
            <img width={"250"} height={"100"} src={sect5logo3} alt="" />{" "}
          </div>
          <div data-aos="fade-down" className="col-4  text-center col-md-2 ">
            {" "}
            <img
              width={"100"}
              height={"100"}
              className="img-fluid"
              src={sect5logo1}
              alt=""
            />{" "}
          </div>
          <div data-aos="fade-down" className="col-6   text-center  col-md-2 ">
            {" "}
            <img width={"70"} height={"70"} src={sect5logo2} alt="" />{" "}
          </div>
          <div data-aos="fade-down" className="col-6   text-center col-md-2 ">
            {" "}
            <img width={"100"} height={"100"} src={sect5logo4} alt="" />{" "}
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className={`${styles.footer}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
