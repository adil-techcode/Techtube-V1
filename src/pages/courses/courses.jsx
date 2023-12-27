import React from "react";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import YoutubeAPI from "../../services/youtubeapi";
import { Link } from "react-router-dom";
import styles from "./courses.module.css";
import Header from "../../layout/header/header";
import Footer from "../../layout/footer/footer";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Courses = () => {
  const db = getDatabase();

  const variants = {
    // motion object for animation
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [courses, setCourses] = useState();
  const [searchCourses, setSearchCourses] = useState();

  useEffect(() => {
    document.title = "Courses";
    fetchPlaylistId();
  }, []);

  // Function for fetching playlist ids from firebase database
  const fetchPlaylistId = async () => {
    const playlists = [];
    const Couref = ref(db, "courses/");
    

    const prom = new Promise((resolve, reject) => {
      onValue(Couref, (snapshot) => {
        const data = snapshot.val();
        console.log(snapshot)
        if (data) {
          Object.keys(data).forEach((randomKey) => {
            const courseData = data[randomKey];
            const playlistId = courseData.playlistId;
            playlists.push(playlistId);
            resolve(playlists);
          });
        } else {
          reject('No data available in the "courses" path.');
        }
      });
    });

    prom.then((data) => {
      console.log(data  )
      fetchPlaylistDetail(data);
    });
    prom.catch((error) => {
      console.log("error bahi")
      // console.log(error);
    });
  };

  // function for fecthing playlist detail from youtube API
  const fetchPlaylistDetail = async (ids) => {
    let playlistData = [];
    for (var i = 0; i < ids.length; i++) {
      const resData = await YoutubeAPI.playlistdetail(ids[i]);
      const updatedData = {
        ...resData,
        playlistId: ids[i],
      };
      playlistData.push(updatedData);
    }

    setCourses(playlistData);
    setSearchCourses(playlistData);
  };

  // Function fOR Search functionality in courses
  const handlesearch = (value) => {
    const searchArray = searchCourses;
    const researchdata = searchArray.filter((course) =>
      course.localized.title.toLowerCase().includes(value.toLowerCase())
    );
    setCourses(researchdata);
  };

  return (
    <>
      <Header fixed={false} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-sm-6 fw-bold">
            Courses({courses && courses.length})
          </div>
          <div className={`col-12 col-sm-6  text-end `}>
            <div className={`  ${styles.seacrhCol} `}>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search"
                onChange={(e) => handlesearch(e.target.value)}
              />
              <FaSearch />
            </div>
          </div>
        </div>

        <div className={`row `} style={{ marginBottom: "55px" }}>
          {courses
            ? courses.map((course, index) => (
                <motion.div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mt-4"
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ duration: 1 }}
                >
                  <motion.div className="card shadow-sm border-0">
                    <motion.img
                      src={course.thumbnails.medium.url}
                      className="card-img-top"
                      alt="#thumbnail"
                    />
                    <motion.div className="card-body">
                      <motion.h5
                        className={`card-title ${styles.playlistTitle}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {course.localized.title}
                      </motion.h5>
                      <motion.p
                        className={`card-text ${styles.playlistDesc}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {course.localized.description}
                      </motion.p>
                      <Link
                        className={`btn btn-primary shadow-sm ${styles.stLearnBtn}`}
                        to={`/playlist/${course.playlistId}`}
                      >
                        Start Learning
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))
            : Array.from({ length: 8 }, (_, index) => (
                // Placeholder Animation Elements Bootsrap
                <div
                  key={index}
                  className="   col-12 col-sm-6  col-md-4 col-lg-3  mt-3 "
                >
                  <div className="card   " aria-hidden="true">
                    <svg
                      className="bd-placeholder-img card-img-top"
                      width="100%"
                      height={180}
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#868e96" />
                    </svg>
                    <div className="card-body">
                      <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6" />
                      </h5>
                      <p className="card-text placeholder-glow">
                        <span className="placeholder col-7" />
                        <span className="placeholder col-4" />
                        <span className="placeholder col-4" />
                        <span className="placeholder col-6" />
                        <span className="placeholder col-8" />
                      </p>
                      <a
                        className={` btn  btn-secondary   disabled placeholder  shadow-sm  col-12 `}
                        aria-disabled="true"
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Courses;
