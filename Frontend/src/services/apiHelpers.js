import apiUrls from "./apiUrls";
import axios from "axios";
export const baseUrl = "http://localhost:4001";

export const Sentiment_analysis = async (method, url, data) => {
  let response = await axios({
    method: method,
    url: `${baseUrl}${url}`,
    data: data,
  });
  return response;
};
