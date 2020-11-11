import axios from "axios";

const instance = axios.create({
    baseURL: "https://young-woodland-89279.herokuapp.com",
});

export default instance;
