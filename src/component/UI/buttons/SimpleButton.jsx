import React from "react";

const SimpleButton = ({
  name,
  type = "button",
  text_color = "text-blue-500",
  background_color = true,
}) => {
  return (
    <button
      type={type}
      className={`${text_color} ${
        background_color && `bg-blue-500 dark:bg-blue-500`
      } focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 shadow-md transition duration-300 ease-in-out hover:shadow-lg`}
    >
      {name}
    </button>
  );
};

export default SimpleButton;
