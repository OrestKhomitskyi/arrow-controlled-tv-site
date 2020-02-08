import axios from "axios";
import { videosDomain } from "../constants/api_urls";

export const videoAxiosInstance = axios.create({
  baseURL: videosDomain
});
