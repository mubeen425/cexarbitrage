import React, { useEffect, useState } from "react";

// ** Hooks
import useFetch from "../../hooks/useFetch";

// ** React Router Dom
import { Link, useNavigate } from "react-router-dom";

// ** Components
import TableData from "./TableData";
import TableHead from "./TableHead";

// ** Apis
import { deleteExchange } from "../../apis/exchange_apis";
import axios from "axios";

const ImageGallery = ({ imageName }) => {
  let imageSource;
  try {
    imageSource = require(`../../images/${imageName}.png`);
  } catch (error) {
    console.error(`Image not found for ${imageName}:`, error);
    imageSource = require('../../images/cex.png'); // Placeholder image path
  }
  // console.log("Image name: ", imageName)
  return <img className="w-10 h-10 rounded-full" src={imageSource} alt={imageName}/>;
}
const Table = ({selected}) => {
  let symbol = selected?.split('/')[1];
  
// console.log(symbol);

  const [showLoading, setShowLoading] = useState(true);
  const { data, error } = useFetch("api/exchange/get-exchange", {}, [selected], true,{coin:selected});
  const [Apidata , setApiData] = useState()
  const navigate = useNavigate();
  console.log("Data: ", data);
  const currentUser = localStorage.getItem("token");

  useEffect(() => {
    if (data) {
      setShowLoading(false);
    }
  }, [data]);



  if (showLoading) {
    return <span className="py-3">Loading...</span>;
  }

  if (error) {
    return <span>{error.error_message}</span>;
  }

  const handleDelete = (id) => {
    console.log(id);
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      deleteExchange(id);
    }
  };

  if (data && data.data.length > 0) {
    const sortedData = data.data.slice().sort((a, b) => a.exchange_deviation_from_mean - b.exchange_deviation_from_mean);
    return (
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
               
                <th scope="col" class="px-14 py-3">
                Exchange
                </th>
                <th scope="col" class="px-2 py-3">
                Pair
                </th>
                <th scope="col" class="px-9 py-3">
                Market Price
                </th>
                <th scope="col" class="px-9 py-3">
                Deviation From Mean Percentage
                </th>
                <th scope="col" class="px-6 py-3">
                non-KYC limit
                </th>
                <th scope="col" class="px-6 py-3">
                Deposit
                </th>
                <th scope="col" class="px-6 py-3">
                Withdraw
                </th>
                {data.isAdmin && ( <th scope="col" class="px-6 py-3">
                Actions
                </th>)}
            </tr>
        </thead>
        <tbody>
        {sortedData.map((row, index) => {
          if(row.isEditable == false && row.exchange_pair != `${symbol}/USDT`){
            return null;
          }
          else return (
            <tr class="bg-white border-b hover:bg-gray-50">
                
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                    {/* <img class="w-10 h-10 rounded-full" src={binance} alt="Jese image" /> */}
                    <ImageGallery imageName={row.exchange_name} />

                    <div class="ps-3">
                        <div class="text-base font-semibold">{row.exchange_url ? (
                        <a href={row.append_exchage_pair_info? row.exchange_url + `${symbol}-USDT` : row.exchange_url} target="_blank" rel="noopener noreferrer">{row.exchange_name}</a>
                      ) : (
                        <span title="Exchange URL does not exist">{row.exchange_name}</span>
                        )}</div>
                    </div>  
                </th>
                <td class="px-2 py-4">
               {row.isEditable == false && row.exchange_pair != `${symbol}/USDT` ? 'NA' : row.exchange_pair }
               {/* {console.log("Row object",row)} */}
                </td>

                <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                    <div class="ps-3">        
         
                        <div class="text-base ">
               {row.isEditable == false && row.exchange_pair != `${symbol}/USDT` ? 'NA' : row.exchange_price.toFixed(4) }

                          
                          </div>
                        <div class="font-normal text-gray-500">
               {row.isEditable == false && row.exchange_pair != `${symbol}/USDT` ? 'NA' : `${row.exchange_price.toFixed(4)} USDT` }                     
                          </div>
                    </div>  
                </td>

                <td className="px-20 py-4" >
  {row.isEditable === false && row.exchange_pair !== `${symbol}/USDT` ? 'NA' : <span style={{ color: row.exchange_deviation_from_mean < 0 ? 'green' : 'red' }}>{row.exchange_deviation_from_mean.toFixed(7)*100}</span> }
</td>

                <td class="px-16 py-4">
                {row.isEditable == false && row.exchange_pair != `${symbol}/USDT` ? 'NA' : row.non_kyc  }
                  
                </td>

                <td class="px-6 py-4">
                    <div class="flex items-center"> 
               {row.isEditable == false && row.exchange_pair != `${symbol}/USDT` ? 'NA' : <><div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div><span>Enable</span></>  }
                    
                       
                    </div>
                </td>

                <td class="px-6 py-4">
                    <div class="flex items-center">
                    {row.isEditable == false && row.exchange_pair != `${symbol}/USDT` ? 'NA' : <><div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div><span>Enable</span></>  }

                    </div>
                </td>
                {console.log("currentUser: ", currentUser)}
                {currentUser && data.isAdmin && (  <td class="px-6 py-4">
                 { row.isEditable == false && row.exchange_pair != `${symbol}/USDT` ? 'No Actions' : <> <Link to={`/dashboard/edit-exchange/${row._id}`} class="font-medium text-blue-600 pr-2 hover:underline">Edit</Link>
                    <Link   class="font-medium text-blue-600 hover:underline" onClick={() => handleDelete(row.exchange_id)}>Delete</Link> </>}
  
                </td>)}
            </tr>
          )
  })}
           
        </tbody>
    </table>

    );
  } else {
    return <h5>No Record Found</h5>;
  }
};

export default Table;
