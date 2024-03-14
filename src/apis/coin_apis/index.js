import axiosInstance from "../../hooks/useAxiosInstance";
import { baseURL } from "../../shared/baseURL";

const COIN_URL = `${baseURL}api/coin/`;

export const addNewCoin = (values, setIsLoading, navigate) => {
  setIsLoading(true);
  axiosInstance
    .post(`${COIN_URL}add-new-coin`, values)
    .then((response) => {
      console.log(response);
      navigate("/dashboard");
    })
    .catch((error) => console.log(error))
    .finally(() => {
      setIsLoading(false);
    });
};

export const updateCoin = (values, setIsLoading) => {
  setIsLoading(true);
  axiosInstance
    .put(`${COIN_URL}update-coin`, values)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      setIsLoading(false);
    });
};

export const getCoinByID = (coinID) => {
  return axiosInstance
    .get(`${COIN_URL}get-coin-by-id?id=${coinID}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => console.log(error))
    .finally(() => {});
};
