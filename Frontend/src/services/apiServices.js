import { Sentiment_analysis } from "./apiHelpers";
import apiUrls from "./apiUrls";
export const adeyeltaUser = async (data) => {
    let response = await Sentiment_analysis(
      apiUrls.adeyeltaUser.signup.method,
      apiUrls.adeyeltaUser.signup.url,
      data
    );
    return response;
  };
