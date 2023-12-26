import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const Login = {
  postLogin: async (email: string, password: string) => {
    return axios
      .post(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
};

export default Login;
