import React from "react";

const FeatureListing = ({ title, content, src, alt }) => {
  return (
    <div className={"flex flex-col items-center"}>
      <div className={"bg-blue-700 p-3 rounded-full"}>
        <img src={src} alt={alt} width={20} height={50} />
      </div>
      <h6 className={"pt-8 font-bold"}>{title}</h6>
      <p className={"text-gray-500"}>{content}</p>
    </div>
  );
};

export default FeatureListing;
