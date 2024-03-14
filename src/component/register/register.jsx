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

function Register() {
    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const { setToken } = useAuth();

  const navigate = useNavigate();

  const initialValues = {
    first_name:'',
    last_name:'',
    name:"",
    email: "",
    password: "",
    confirm_password:''

  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    first_name:Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    confirm_password:Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setIsLoading(true);
    axios
      .post(`${baseURL}api/auth/signup`, values)
      .then((response) => {
        setError({});
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("timer", new Date());
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
      <>
        <section class="bg-gray-200">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
              <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              CEX ARBITRAGE
            </a>
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Create an account
                </h1>
                <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4 md:space-y-6">

              <div class="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                    <div>
                      <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 text-left">First Name</label>
                      <Field
                    type="text"
                    name="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="jhon"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-700 font-bold text-sm text-left"
                  />

                    </div>
                    <div>
                      <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 text-left">Last Name</label>
                      <Field
                    type="text"
                    name="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="smith"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-700 font-bold text-sm text-left"
                  />

                    </div>
                  </div>

                  <div>
                  <label
                    htmlFor="name"
                    class="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="jhon_smith"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-700 font-bold text-sm text-left"
                  />
                </div>

                  <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 text-left">Email</label>
                    <Field
                    type="email"
                    name="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" 
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-700 font-bold text-sm text-left"
                  />
                   </div>
                  <div class="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                    <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 text-left">Password</label>
                      <Field
                    type="password"
                    name="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-700 font-bold text-sm text-left"
                  />
                      </div>
                    <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 text-left">Confirm password</label>
                      <Field
                    type="password"
                    name="confirm_password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="text-red-700 font-bold text-sm text-left"
                  />

                   </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="terms" class="font-light text-gray-500">I accept the <a class="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                    </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                  <p class="text-sm font-light text-gray-500">
                    Already have an account? <Link to={"/auth/login"} class="font-medium text-primary-600 hover:underline">Login here</Link> or <Link to="/" class="font-medium text-primary-600 hover:underline">Home Page</Link>
                  </p>
              </Form>
            </Formik>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  
  export default Register;
  