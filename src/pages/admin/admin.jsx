import React from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import firebaseApp from "../../config/firebase";
import { useState, useEffect } from "react";
import {
  orderByChild,
  startAt,
  endAt,
  get,
  query,
  onValue,
} from "firebase/database";
import Header from "../../layout/header/header";
import styles from "./admin.module.css";
import { FaUsers } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Modal from "react-bootstrap/Modal";
import Loader from "../../components/loader";
import { ToastContainer, toast } from "react-toastify";
import Chart from "../../components/chart/chart";
import Footer from "../../layout/footer/footer";

const Admin = () => {
  const database = getDatabase(firebaseApp); // Config Firebase Database

  const [playlistId, setPlaylistId] = useState("");
  const [usersStats, setUsersStats] = useState("");
  const [usersCounts, setUsersCounts] = useState("");
  const [coursesCounts, setCoursesCounts] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin"
    fetchUsersCounts();
    fetchCoursesCounts();
    fetchUserStats();
  }, [database]);

  // Function for Count Total Courses Store in Firebase
  const fetchCoursesCounts = () => {
    const coursesRef = ref(database, "courses/");
    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      setCoursesCounts(Object.keys(data).length);
    });
  };

  // Function for Count Total Userr Registered in Firebase
  const fetchUsersCounts = () => {
    const coursesRef = ref(database, "users/");
    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      setUsersCounts(Object.keys(data).length);
    });
  };

  // Fetch last month Users Stats last 4 week
  const fetchUserStats = async () => {

    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();

     // Times
    const fourWeeksAgoTimestamp =currentTimestamp - 4 * 7 * 24 * 60 * 60 * 1000;
    const threeWeeksAgoTimestamp =currentTimestamp - 3 * 7 * 24 * 60 * 60 * 1000;
    const twoWeeksAgoTimestamp = currentTimestamp - 2 * 7 * 24 * 60 * 60 * 1000;
    const lastWeekTimestamp = currentTimestamp - 1 * 7 * 24 * 60 * 60 * 1000;


    console.log(currentTimestamp)

    try {
      const week1ref = query(
        ref(database, "users/"),
        orderByChild("registrationTime"),
        startAt(fourWeeksAgoTimestamp),
        endAt(threeWeeksAgoTimestamp)
      );

      const week2ref = query(
        ref(database, "users/"),
        orderByChild("registrationTime"),
        startAt(threeWeeksAgoTimestamp),
        endAt(twoWeeksAgoTimestamp)
      );

      const week3ref = query(
        ref(database, "users/"),
        orderByChild("registrationTime"),
        startAt(twoWeeksAgoTimestamp),
        endAt(lastWeekTimestamp)
      );

      const week4ref = query(
        ref(database, "users/"),
        orderByChild("registrationTime"),
        startAt(lastWeekTimestamp),
        endAt(currentTimestamp)
      );

      console.log(lastWeekTimestamp)
      console.log(currentTimestamp)

      // Use Promise.all to fetch data for all weeks concurrently
      const [week1data, week2data, week3data, week4data] = await Promise.all([
        get(week1ref),
        get(week2ref),
        get(week3ref),
        get(week4ref),
      ]);
     
      // Process the results
      const week1 = week1data.val() === null ? 0 : week1data.val();
      const week2 = week2data.val() === null ? 0 : week2data.val();
      const week3 = week3data.val() === null ? 0 : week3data.val();
      const week4 = week4data.val() === null ? 0 : week4data.val();

      const result = [
        Object.keys(week1).length,
        Object.keys(week2).length,
        Object.keys(week3).length,
        Object.keys(week4).length,
      ];
      
      console.log(result)
      setUsersStats(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };


  //Methods to add playlist in Firebase Database 
  // User Store plalist Id 34 character long
  const handleplaylist = (e) => {
    setMsg("");

    if (playlistId.length !== 34) {
      setMsg("Invalid Playlist ID");
      return;
    }

    e.preventDefault();

    setLoading(true);
    const coursesRef = ref(database, "courses");

    // Use the push method to generate a random key for the new data
    const newCourseRef = push(coursesRef);

    // Set the data with the random key
    set(newCourseRef, {
      playlistId: playlistId,
    })
      .then(() => {
        setTimeout(() => {
          setShowModal(false);
          setLoading(false);
          toast.success("Playlist added successfully");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <>
      <Header />

      {usersCounts && coursesCounts ? (
        <div className="container" style={{ marginBottom: "55px" }}>
          <div className="row mt-3  mb-5 justify-content-center ">
            <div
              className={`col-11 col-sm-5 mt-3  p-4 mx-3 shadow-lg rounded  ${styles.userBox}`}
            >
              <span>
                {" "}
                <FaUsers size={30} />{" "}
              </span>

              <h3 className="mt-2"> {usersCounts} </h3>
              <h6> Total Users </h6>
            </div>
            <div
              className={`col-11 col-sm-5  p-4 mt-3 shadow-lg rounded ${styles.coursesBox}`}
            >
              <div>
                <span className={` ${styles.courseIcon} `}>
                  {" "}
                  <MdVideoLibrary size={30} />{" "}
                </span>
                <h3 className="mt-3"> {coursesCounts} </h3>
                <h6> Total Courses </h6>
              </div>

              <div>
                <span
                  className={` ${styles.addCourseIcon} `}
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  {" "}
                  <FaPlus />{" "}
                </span>
              </div>
            </div>
          </div>

          {usersStats && (
            <div className="row justify-content-center   ">
              <div className="col-10 text-center  rounded shadow-lg ">
                <Chart stats={usersStats} />
              </div>
            </div>
          )}
        </div>
      ) : (
        // Placeholder for Data
        <div className="container mt-5 ">
          <p class="placeholder-glow d-flex justify-content-around ">
            <span
              class="placeholder  col-12 col-md-5 mx-2  mt-3 rounded "
              style={{ height: "300px" }}
            ></span>
            <span
              class="placeholder  col-12 col-md-5 mx-2  mt-3  rounded "
              style={{ height: "300px" }}
            ></span>
          </p>

          <p class="placeholder-glow d-flex justify-content-around ">
            <span
              class="placeholder  col-11  mx-2  mt-3 rounded "
              style={{ height: "400px" }}
            ></span>
          </p>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Modal for Add Playlist */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Playlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={`${styles.modalBody}`}>
            {msg && (
              <div class="alert alert-danger" role="alert">
                {msg}
              </div>
            )}
            <form>
              <input
                type="text"
                placeholder="Enter Playlist ID"
                onChange={(e) => {
                  setPlaylistId(e.target.value);
                }}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-success"
            onClick={handleplaylist}
          >
            {" "}
            Add{" "}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
            }}
            class="btn btn-outline-success"
          >
            {" "}
            Close{" "}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Toast Message */}
      <ToastContainer />
      {loading && <Loader />}
    </>
  );
};

export default Admin;
