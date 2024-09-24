import axios from "axios";

const fetch = () => axios.get("/organizations");

const organizationApi = {
  fetch,
};

export default organizationApi;
