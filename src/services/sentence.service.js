import http from "../http-common";

class SentenceDataService {
  getAll() {
    return http.get("/sentences");
  }

  create(data) {
    return http.post("/sentences", data);
  }
}

export default new SentenceDataService();
