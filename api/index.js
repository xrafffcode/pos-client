import axios from "axios";

// https://0be9-125-164-20-250.ngrok-free.app ini baseurl server gue guys jgn dipake
// kalian pake aja http://localhost:3000

const api = axios.create({
  baseURL: "http://localhost:3000", //ganti url ini ke localhost api kalian
});

export default api;
