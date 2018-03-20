import axios from "axios";

export default {
  // Gets all audience members
  getAudience: function () {
    return axios.get("/venue");
  },

  //Updates lifetime claps and boos
  updateClaps: function (id, data) {
    return axios.put("/venue/" + id, data)
  },

  findOrCreateUser: function (data) {
    return axios.post("/venue", data)
  }  
}
