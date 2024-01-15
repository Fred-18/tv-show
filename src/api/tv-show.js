import axios from "axios";
import { BASE_URL } from "../config";

export class TVSshowAPI {
  static async fetchPopulars() {
    const response = await axios.get(
      `${BASE_URL}tv/popular?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
    );
    return response.data.results;
  }
  static async fetchRecommendation(tvShowId) {
    const response = await axios.get(
      `${BASE_URL}tv/${tvShowId}/recommendations?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
    );
    return response.data.results;
  }

  static async fetchByTitle(title) {
    const response = await axios.get(
      `${BASE_URL}search/tv?api_key=${process.env.REACT_APP_API_KEY_PARAM}&query=${title}`
    );
    return response.data.results;
  }

  static async fetchCredit(tvShowId) {
    const response = await axios.get(
      `${BASE_URL}tv/${tvShowId}/credits?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
    );
    return response.data.cast;
  }
}
