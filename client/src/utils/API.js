import axios from "axios";

export default {
  // Gets all audience members
  getAudience: function() {
    return axios.get("/venue");
  },

  saveUser: function(userData) {
    return axios.post("/venue", userData);
  }
}
