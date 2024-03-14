import React from "react";
import { ErrorMessage, Field } from "formik";

const CustomFields = ({
  field_label,
  field_name,
  field_type = "text",
  field_placeholder,
}) => {
  return (
    <div className="mb-3">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {field_label}
      </label>
      <Field
        name={field_name}
        type={field_type}
        placeholder={field_placeholder}
        className={
          "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        }
      />
      <span className={"text-danger"}>
        <ErrorMessage name={field_name} />
      </span>
    </div>
  );
};

export default CustomFields;
