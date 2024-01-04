import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const User = {
  getUser: async (token: string | undefined) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .get(`${baseUrl}/profile`, config)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
};

export default User;
