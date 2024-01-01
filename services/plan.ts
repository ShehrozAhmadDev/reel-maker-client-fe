import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const Plans = {
  getPlans: async () => {
    return axios
      .get(`${baseUrl}/plan`)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
};

export default Plans;
