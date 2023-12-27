import React from "react";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // firebase module for signin-auth
import { useNavigate } from "react-router-dom";
import styles from "./signin.module.css";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import AOS from "aos";
import { AES } from "crypto-js";

import logo from "../../assests/logo.png";

const SignIn = () => {
  const navigate = useNavigate(); // hook for navigate from page to another

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    document.title = "signin-Techtube";
    AOS.init(); // init aos library for animation
  }, []);

  // this function handle all login functionality

  const handleLogin = (e) => {
    setMsg("");
    e.preventDefault(); // prevent for  refreshing

    if (!email || !password) {
      // check
      setMsg("Login credentials required");
      return;
    }

    setLoading(true); // start loading
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password) // promise function for signin
      .then((userCredential) => {
        // Signed in successful
        const user = userCredential.user;


         // if Admin Logged in
        if (email == "adil520@gmail.com" && password == "adil520") {

        // encrypt password for only adminsecurity
          const encryptPassword = AES.encrypt(password, "adilhon").toString();

          const loginUser = {
            name: user.providerData[0].displayName,
            uid: user.providerData[0].uid,
            email: user.providerData[0].email,
            photo: user.providerData[0].photoURL,
            password: encryptPassword,
            role: "admin",
          };

          localStorage.setItem("user", JSON.stringify(loginUser));

          setTimeout(() => {
            //delay for 1 second
            setLoading(false);
            navigate("/admin");
          }, 1000);
          return;
        }

        const loginUser = {
          name: user.providerData[0].displayName,
          uid: user.providerData[0].uid,
          email: user.providerData[0].email,
          photo: user.providerData[0].photoURL,
          role: "user",
        };

        localStorage.setItem("user", JSON.stringify(loginUser));

        setTimeout(() => {
          setLoading(false);
          navigate("/courses");
        }, 1000);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setTimeout(() => {
          // delay 1 second
          setLoading(false);
          setMsg(errorMessage);
        }, 1000);
      });
  };

  return (
    <>
      <div className={`${styles.container}  row  gx-0`}>
        <div
          data-aos="fade-right"
          className="col-12  col-md-6 d-flex justify-content-center align-items-center  flex-column p-0"
        >
          <div className="text-center my-5">
            <Link to={"/"} >     <img src={logo} width={"350"} height={"80"} alt="logo" /> </Link>
          </div>
          <div className={styles.formWrapper}>
            <h1> Sign in </h1>
            {msg && (
              <div
                class={` ${styles.alertbox} alert alert-danger mt-3`}
                role="alert"
              >
                {msg}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                required
                className={styles.inputfield}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                required
                className={styles.inputfield}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <input type="checkbox" name="" id="rmme" />{" "}
              <label htmlFor="rmme"> Remember me </label>
              <input type="submit" value="Login" className={styles.submitBtn} />
            </form>
          </div>
          <span>
            {" "}
            Don't have an account? <Link to={"/signup"}> Sign up </Link>{" "}
          </span>
        </div>

        <div
          data-aos="fade-left"
          className={` ${styles.greetingPanel}  col-12  col-md-6 p-5 bg-dark text-white  d-flex justify-content-center align-items-center flex-column  d-none d-md-flex`}
        >
          <h1> Welcome back! </h1>
          <br />
          <p className="fs-5">
            {" "}
            Welcome back! We are so happy to have you here. It's great to see
            you again. We hope you had a safe and enjoyable time away.
          </p>
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default SignIn;
