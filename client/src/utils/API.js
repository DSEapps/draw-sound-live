import axios from "axios";

export default {
  // Gets all audience members
  getAudience: function () {
    return axios.get("/venue");
  },

  //Updates lifetime claps and boos
  updateClaps: function (id, data) {
    console.log("updating claps in API");
    return axios.put("/venue/" + id, data)
  },

  saveUser: function (userData) {
    console.log("This is the data passed to the API: " + userData.google_id);
    console.log("This is the data passed to the API: " + userData.google_email);
    console.log("This is the data passed to the API: " + userData.in_venue);
    console.log("This is the data passed to the API: " + userData.lifetime_claps);
    console.log("This is the data passed to the API: " + userData.perf_num);
    console.log("This is the data passed to the API: " + userData.last_perf);
    return axios.post("/venue", userData);
  }
}
