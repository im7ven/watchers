import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "4e744e9e8e134827cdae45391d5038e2",
  },
});
