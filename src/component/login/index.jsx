import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// ** Axios
import axios from "axios";

// ** Shared
import { baseURL } from "../../shared/baseURL";

// ** React Router Dom
import { Link, useNavigate } from "react-router-dom";

// ** Context
import { useAuth } from "../../context/AuthContext";

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const { setToken } = useAuth();

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setIsLoading(true);
    axios
      .post(`${baseURL}api/auth/login`, values)
      .then((response) => {
        setError({});
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        navigate("/dashboard/exchanges");
      })
      .catch((error) => setError(error.response?.data))
      .finally(() => {
        setIsLoading(false);
        setSubmitting(false); // Important to reset Formik state
      });
  };
  

  return (
    <section className="bg-gray-200">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          CEX ARBITRAGE
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Your email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-700 font-bold text-sm text-left"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-700 font-bold text-sm text-left"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isLoading ? "Please Wait..." : "Login"}
                </button>
                <p class="text-sm font-light text-gray-500">
                    Don't have an account? <Link to={"/auth/register"} class="font-medium text-primary-600 hover:underline">Register here</Link> or <Link to="/" class="font-medium text-primary-600 hover:underline">Home Page</Link>
                  </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
