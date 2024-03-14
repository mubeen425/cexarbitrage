import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "./useAxiosInstance";

const useFetch = (url, options, dependencies, timeOut = false,queryParams = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance(url, { params: queryParams });
        const result = response.data;

        setData(result);
        setError(null);
      } catch (error) {
        setData(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (timeOut) {
      const intervalId = setInterval(() => {
        fetchData();
      }, 20000);

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;
