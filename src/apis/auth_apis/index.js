import axiosInstance from "../../hooks/useAxiosInstance";

const logoutUser = (setToken, navigate) => {
  axiosInstance
    .post(`api/auth/logout`)
    .then((response) => {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    })
    .catch((error) => {
      console.log(error.response?.data);
    })
    .finally(() => {});
};

export { logoutUser };
