import React, { useEffect, useState } from "react";

// ** Layout
import MainLayout from "../../component/layout/MainLayout";

// ** formik
import { Formik, Form } from "formik";

// ** Yup Validator
import { object, string } from "yup";

// ** React Router Dom
import { useLocation, useNavigate, useParams } from "react-router-dom";

// ** Components
import CustomFields from "../../component/formik/CustomFields";

// ** Apis
import {
  addNewExchange,
  getExchangeByID,
  updateExchange,
} from "../../apis/exchange_apis";

const formValidations = object().shape({
  exchange_id: string().required("Required"),
  exchange_name: string().required("Required"),
  exchange_price: string().required("Required"),
  exchange_pair: string().required("Required"),
});

const AddNewExchange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditPage, setIsEditPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { exchange_id } = useParams();


  const initialValues = {
    exchange_id: "",
    exchange_name: "",
    exchange_price: "",
    exchange_pair: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (location.pathname === `/dashboard/edit-exchange/${exchange_id}`) {
      setIsEditPage(true);
    } else {
      setIsEditPage(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isEditPage) {
      const fetchExchange = async () => {
        try {
          const response = await getExchangeByID(exchange_id);
          console.log(response);
          if (response.status === 200) {
            const exchange = response.data.exchange;
            // console.log("append_exchage_pair_info: ", exchange.append_exchage_pair_info)
            setFormValues({
              _id:exchange_id,
              exchange_id: exchange.exchange_id,
              exchange_name: exchange.exchange_name,
              exchange_price: exchange.exchange_price,
              exchange_pair: exchange.exchange_pair,
              exchange_deviation_from_mean:exchange.exchange_deviation_from_mean,
              non_kyc: exchange.non_kyc,
              exchange_url: exchange.exchange_url,
              // append_exchage_pair_info: exchange.append_exchage_pair_info || false
            });
          }
        } catch (e) {
          throw e;
        }
      };
      fetchExchange();
    }
  }, [isEditPage]);

  // const handleCheckboxChange = (event) => {
  //   const { checked } = event.target;
  //   console.log("event.target: ",event.target)
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     append_exchage_pair_info: checked,
  //   }));
  // };

  const onSubmit = async (values) => {
    if (isEditPage) {
      updateExchange(values, setIsLoading);
    } else {
      addNewExchange(values, setIsLoading, navigate);
    }
    navigate("/dashboard/exchanges");
  };

  return (
    <MainLayout>
      <div className="container mx-auto">
        <Formik
          initialValues={formValues}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validationSchema={formValidations}
        >
          <Form className={"my-5"}>
            <CustomFields
              field_label={"Exchange ID"}
              field_name={"exchange_id"}
              field_placeholder={"Exchange ID"}
            />
            <CustomFields
              field_label={"Exchange Name"}
              field_name={"exchange_name"}
              field_placeholder={"Exchange Name"}
            />
            <CustomFields
              field_label={"Exchange Price"}
              field_name={"exchange_price"}
              field_placeholder={"Exchange Price"}
            />
            <CustomFields
              field_label={"devision from mean"}
              field_name={"exchange_deviation_from_mean"}
              field_placeholder={"Exchange mean %"}
              field_type='number'
            />
            
            <CustomFields
              field_label={"Exchange Pair"}
              field_name={"exchange_pair"}
              field_placeholder={"Exchange Pair"}
            />

            <CustomFields
              field_label={"Non Kyc %"}
              field_name={"non_kyc"}
              field_placeholder={"Non Kyc %"}
            />
            
            <CustomFields
              field_label={"Exchange Url"}
              field_name={"exchange_url"}
              field_placeholder={"Exchange Url"}
            />
            {/* <CustomFields
              field_label={"Append Exchange Pair Info"}
              field_name={"append_exchage_pair_info"}
              field_placeholder={"Append Exchange Pair Info"}
              field_type='checkbox'
              onChange={handleCheckboxChange}
            /> */}

            <button
              type="submit"
              className="text-white bg-blue-500 dark:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
            >
              {isEditPage ? (
                <>{isLoading ? "Updating..." : "Update"}</>
              ) : (
                <>{isLoading ? "Submitting..." : "Submit"}</>
              )}
            </button>
            <button
              type="submit"
              onClick={() => navigate("/dashboard/exchanges")}
              className={
                "ms-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              }
            >
              Back
            </button>
          </Form>
        </Formik>
      </div>
    </MainLayout>
  );
};

export default AddNewExchange;
