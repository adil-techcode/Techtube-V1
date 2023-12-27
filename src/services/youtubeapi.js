import axios from "axios";

// class for sending Youtube Api request

class YoutubeAPI {
  static playlistdetail = async (id) => {
    const api = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=AIzaSyDERru2FK6OTs6hCYTBrqnlDmaepJ0sPM4`;
    try {
      const res = await axios.get(api);
      console.log("ok ha api ");
      return res.data.items[0].snippet;
    } catch (error) {
      console.log("error ");
      console.log(error);
    }
  };

  static playlistItems = async (id) => {
    const api = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=AIzaSyDERru2FK6OTs6hCYTBrqnlDmaepJ0sPM4`;

    try {
      const res = await axios.get(api);
      return res.data.items;
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
}

export default YoutubeAPI;
