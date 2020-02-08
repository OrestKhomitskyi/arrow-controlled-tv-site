import { videoAxiosInstance } from "../config/axios";

export const getVideosState = () =>
  videoAxiosInstance.get("/videoJson/master/videoJson.json");
