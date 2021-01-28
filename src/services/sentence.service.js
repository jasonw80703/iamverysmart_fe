import http from "../http-common";

class SentenceDataService {
  getAll() {
    return http.get("/sentences");
  }

  get(id) {
    return http.get(`/sentences/${id}`);
  }

  create(data) {
    return http.post("/sentences", data);
  }

  findByOriginal(original) {
    return http.get(`/sentences?original=${original}`);
  }
}

export default new SentenceDataService();
