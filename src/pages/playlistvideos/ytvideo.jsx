import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import YoutubeAPI from "../../services/youtubeapi";
import { useParams } from "react-router-dom";
import styles from "./ytvideo.module.css";
import Header from "../../layout/header/header";
import Footer from "../../layout/footer/footer";
const Ytvideo = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [video, setVideo] = useState();

  useEffect(() => {
    document.title = "Videos";
    fetchPlaylistItems();
  }, []);

  // fetch platlist videos from youtube api
  const fetchPlaylistItems = async () => {
    const res = await YoutubeAPI.playlistItems(id);
    setVideo(res[0].snippet.resourceId.videoId);
    setItems(res);
  };

  return (
    <>
      <div className={`container-fluid ${styles.navbarBox}`}>
        <Header fixed={true} />
      </div>

      <div className={`container-fluid ${styles.container} `}>
        <div className={`row`}>
          <div className="col-12  col-md-8 p-0">
            <iframe
              className={styles.iframeBox}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>

          <div className={` col-12  p-0  col-md-4 mb-5 `}>
            <div className={` ${styles.playlistItems}`}>
              <h3 className="p-3"> Playlist Videos </h3>

              {items &&
                items.map((item) => (
                  <div>
                    <h6
                      onClick={() => {
                        setVideo(item.snippet.resourceId.videoId);
                      }}
                    >
                      {" "}
                      {video === item.snippet.resourceId.videoId ? (
                        <span style={{ color: "blue" }}>
                          {" "}
                          {item.snippet.title}{" "}
                        </span>
                      ) : (
                        <span> {item.snippet.title} </span>
                      )}
                    </h6>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.footer} `}>
        <Footer />
      </div>
    </>
  );
};

export default Ytvideo;
