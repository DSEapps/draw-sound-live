import axios from "axios";

export default {
  // Gets all audience members
  getAudience: function() {
    return axios.get("/api/venue");
  }
}
