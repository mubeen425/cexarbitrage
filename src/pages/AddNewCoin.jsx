import React, { useEffect, useState } from "react";
import MainLayout from "../component/layout/MainLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { addNewCoin, getCoinByID, updateCoin } from "../apis/coin_apis";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../hooks/useAxiosInstance";

const formValidations = object().shape({
  coin_id: string().required("Required"),
  name: string().required("Required"),
  symbol: string().required("Required"),
  current_price: string().required("Required"),
});

const AddNewCoin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditPage, setIsEditPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let { coin_id } = useParams();

  const initialValues = {
    coin_id: "",
    name: "",
    symbol: "",
    current_price: "",
    image: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (location.pathname === `/dashboard/edit-coin/${coin_id}`) {
      setIsEditPage(true);
    } else {
      setIsEditPage(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isEditPage) {
      const fetchCoin = async () => {
        try {
          const response = await getCoinByID(coin_id);
          if (response.status === 200) {
            const coin = response.data.coin;
            setFormValues({
              coin_id: coin.coin_id,
              name: coin.name,
              symbol: coin.symbol,
              current_price: coin.current_price,
            });
          }
        } catch (e) {
          throw e;
        }
      };
      fetchCoin();
    }
  }, [isEditPage]);

  const onSubmit = async (values) => {
    if (isEditPage) {
      updateCoin(values, setIsLoading);
    } else {
      addNewCoin(values, setIsLoading, navigate);
    }
  };

  return (
    <MainLayout>
      {/* <Container> */}
      <Formik
        initialValues={formValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={formValidations}
      >
        <Form className={"my-5"}>
          <div className="form-group mb-3">
            <label>Coin ID</label>
            <Field
              name="coin_id"
              type="text"
              placeholder="Coin ID"
              className={"form-control"}
            />
            <ErrorMessage name={"coin_id"} />
          </div>
          <div className="form-group mb-3">
            <label>Coin Name</label>
            <Field
              name="name"
              type="text"
              placeholder="Coin Name"
              className={"form-control"}
            />
            <ErrorMessage name={"name"} />
          </div>
          <div className="form-group mb-3">
            <label>Coin Symbol</label>
            <Field
              name={"symbol"}
              type="text"
              placeholder="Symbol"
              className={"form-control"}
            />
            <ErrorMessage name={"symbol"} />
          </div>
          <div className="form-group mb-3">
            <label>Coin Current Price</label>
            <Field
              name={"current_price"}
              type="string"
              placeholder="Price"
              className={"form-control"}
            />
            <ErrorMessage name={"current_price"} />
          </div>
          {/*<div className="form-group mb-3">*/}
          {/*  <label>Coin Image</label>*/}
          {/*  <Field name={"image"} type="file" className={"form-control"} />*/}
          {/*</div>*/}
          {/* <Button variant="primary" type="submit">
              {isEditPage ? (
                <>{isLoading ? "Updating..." : "Update"}</>
              ) : (
                <>{isLoading ? "Submitting..." : "Submit"}</>
              )}
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => navigate("/dashboard")}
              className={"ms-3"}
            >
              Back
            </Button> */}
        </Form>
      </Formik>
      {/* </Container> */}
    </MainLayout>
  );
};

export default AddNewCoin;
