import React from "react";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { getDatabase,ref, set ,serverTimestamp } from "firebase/database";
import { Link } from "react-router-dom";
import signupvalidation from "./signupvalidation"; // schema for validation form
import styles from "./signup.module.css";
import Loader from "../../components/loader";
import img1 from "../../assests/signup/img1.png";
import img2 from "../../assests/signup/img2.png";
import img3 from "../../assests/signup/img3.png";
import Carousel from "react-bootstrap/Carousel"; // bootrsap carousel
import AOS from "aos"; // library for animation
import { useNavigate } from "react-router-dom";
import firebaseApp from "../../config/firebase";

import { Formik, Form, Field, ErrorMessage } from "formik"; // library for from handling

const Signup = () => {
  const navigate = useNavigate(); // for navigation
  const database = getDatabase(firebaseApp);

  //states
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // object for inititial values for form handling with formik
  const initialValues = {
    displayName: "",
    email: "",
    password: "",
    conPassword: "",
  };

  useEffect(() => {
    document.title = "signup-Techtube";
    AOS.init(); // init aos for animation
  }, []);

  // function for  registered user  and upload data in firebase auth
  const handleDataSubmit = async (email, password, displayName) => {
    setLoading(true); // start loading

    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password, displayName) // function for registered user in firebase auth
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        //  if registration success then Set the user's display name and update its profile in auth
        updateProfile(user, {
          displayName: displayName,
          photoURL: `https://randomuser.me/api/portraits/men/${
            Math.floor(Math.random() * (9 - 1 + 1)) + 1
          }.jpg`,
        })
          .then(() => {
               
            const coursesRef = ref(database, `users/${user.uid}`);

            // Set the data to firebase database
            set(coursesRef, {
              userId: user.uid,
              name : displayName ,
              registrationTime: serverTimestamp(),
            })
              .then(() => {

             // if update and register  successful navigate to login screen
            setTimeout(() => {
              setLoading(false);
              navigate("/signin");
            }, 1000);
                console.log("Data added successfully");
              })
              .catch((error) => {
                console.error("Error adding data:", error);
              });



          
          })
          .catch((error) => {
            // if any error while updating profile
            setTimeout(() => {
              alert("updation error");
              setMsg(error.message);
            }, 1000);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // if any error while registering user
        setTimeout(() => {
          setLoading(false);
          setMsg(errorMessage);
        }, 2000);
        // ..
      });
  };

  return (
    <>
      <div className={`${styles.container}  row  gx-0`}>
        <div
          data-aos="fade-left"
          className={` ${styles.carouselPanel}  col-12  col-md-6 p-5 bg-dark text-white  d-flex justify-content-center align-items-center flex-column  d-none d-md-flex`}
        >
          <Carousel controls={false} interval={2000}>
            <Carousel.Item>
              <img src={img1} alt="slideimg" className={styles.carouselImg} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={img2} alt="slideimg" className={styles.carouselImg} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={img3} alt="slideimg" className={styles.carouselImg} />
            </Carousel.Item>
          </Carousel>
        </div>

        <div
          data-aos="fade-right"
          className="col-12  col-md-6 d-flex justify-content-center align-items-center  flex-column p-0"
        >
          <div className={styles.formWrapper}>
            <h1 className="mb-3"> Sign up </h1>

            {/* Bootstrap alert box display error */}
            {msg && (
              <div
                class={` ${styles.alertbox} alert alert-danger mb-3`}
                role="alert"
              >
                {msg}
              </div>
            )}
            <div>
              {/* Use fromik  component and yup schema for form handling and validation */}
              <Formik
                validationSchema={signupvalidation}
                initialValues={initialValues}
                onSubmit={(values) => {
                  handleDataSubmit(
                    values.email,
                    values.password,
                    values.displayName
                  );
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      type="text"
                      name="displayName"
                      placeholder="Name"
                      className={
                        errors.displayName && touched.displayName
                          ? `${styles.errorfield}  ${styles.inputfield}`
                          : ` ${styles.inputfield}`
                      }
                    />
                    <br />
                    <small style={{ color: "red" }}>
                      {" "}
                      <ErrorMessage name="displayName" />{" "}
                    </small>
                    <br />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={
                        errors.email && touched.email
                          ? `${styles.errorfield}  ${styles.inputfield}`
                          : ` ${styles.inputfield}`
                      }
                    />
                    <br />
                    <small style={{ color: "red" }}>
                      {" "}
                      <ErrorMessage name="email" />{" "}
                    </small>
                    <br />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className={
                        errors.password && touched.password
                          ? `${styles.errorfield}  ${styles.inputfield}`
                          : ` ${styles.inputfield}`
                      }
                    />
                    <br />
                    <small style={{ color: "red" }}>
                      {" "}
                      <ErrorMessage name="password" />{" "}
                    </small>
                    <br />
                    <Field
                      type="password"
                      name="conPassword"
                      placeholder="Confirm Password"
                      className={
                        errors.conPassword && touched.conPassword
                          ? `${styles.errorfield}   ${styles.inputfield}`
                          : ` ${styles.inputfield}`
                      }
                    />
                    <br />
                    <small style={{ color: "red" }}>
                      {" "}
                      <ErrorMessage name="conPassword" />{" "}
                    </small>
                    <br />
                    <Field
                      type="submit"
                      value="Submit"
                      className={styles.submitBtn}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <span>
            {" "}
            Have an Account? <Link to={"/signin"}> Sign in </Link>{" "}
          </span>
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default Signup;
