import React from "react";

const TableData = ({ isMulti = false, row_data,row_img }) => {
  if (isMulti) {
    return (
      <td className="p-2 w-52 h-20 border text-left">
        <div>
          <span>{Number((row_data).toFixed(3))}</span>
          <br />
          <span className="text-xs text-gray-500">
            ({Number((row_data).toFixed(3))} USDT)
          </span>
        </div>
      </td>
    );
  }else if (row_img){
    return(
<td className="p-2 w-52 h-20 border text-left">
  <div className="space-x-2 flex items-center">
  <img src={row_img} alt="Icon" className="icon" width={'30px'} />
  <span>{row_data}</span></div>
</td>

    )   
  } else {
    return (
      <td className="p-2 w-52 h-20 border text-left">
          
        <span>{row_data}</span>
      </td>
    );
  }
};

export default TableData;
