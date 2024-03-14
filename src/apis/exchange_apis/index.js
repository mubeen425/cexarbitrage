import axiosInstance from "../../hooks/useAxiosInstance";
import { baseURL } from "../../shared/baseURL";

const EXCHANGE_URL = `${baseURL}api/exchange/`;

export const addNewExchange = (values, setIsLoading, navigate) => {
  setIsLoading(true);
  axiosInstance
    .post(`${EXCHANGE_URL}add-new-Exchange`, values)
    .then((response) => {
      navigate("/dashboard/exchanges");
    })
    .catch((error) => console.log(error))
    .finally(() => {
      setIsLoading(false);
    });
};

export const updateExchange = (values, setIsLoading) => {
  setIsLoading(true);
  axiosInstance
    .put(`${EXCHANGE_URL}update-exchange`, values)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      setIsLoading(false);
    });
};

export const getExchangeByID = (exchange_id) => {
  return axiosInstance
    .get(`${EXCHANGE_URL}get-exchange-by-id?id=${exchange_id}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => console.log(error))
    .finally(() => {});
};

export const deleteExchange = (exchange_id) => {
  return axiosInstance
    .delete(`${EXCHANGE_URL}delete-exchange?id=${exchange_id}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => console.log(error))
    .finally(() => {});
};
