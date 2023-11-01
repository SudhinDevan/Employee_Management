import axios from "axios";
import { baseurl } from "../Constans/Url";

const userAxios = axios.create({
    baseURL:baseurl
});

export default userAxios