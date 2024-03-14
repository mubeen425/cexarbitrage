import React, { useState } from "react";
import MainLayout from "../../component/layout/MainLayout";
import Table from "../../component/table/Table";
import CustomSelect from "../../component/customSelect";

const cryptocurrencies = [
  { key: 'BTC', value: 'Bitcoin' },
  { key: 'ETH', value: 'Ethereum' },
  { key: 'USDT', value: 'Tether' },
  { key: 'SOL', value: 'Solana' },
  { key: 'XRP', value: 'XRP' },
  { key: 'ADA', value: 'Cardano' },
  { key: 'DOGE', value: 'Dogecoin' },
  { key: 'AVAX', value: 'Avalanche' },
  { key: 'TRX', value: 'TRON' },
  { key: 'LINK', value: 'Chainlink' },
  { key: 'DOT', value: 'Polkadot' },
  { key: 'MATIC', value: 'Polygon' },
  { key: 'LTC', value: 'Litecoin' },
  { key: 'UNI', value: 'Uniswap' },
  { key: 'ATOM', value: 'Cosmos' },
  { key: 'XLM', value: 'Stellar' },
  { key: 'OKB', value: 'OKB' },
  { key: 'XMR', value: 'Monero' },
  { key: 'FIL', value: 'Filecoin' },
  { key: 'STX', value: 'Stacks' },
  { key: 'VET', value: 'VeChain' },
  { key: 'TUSD', value: 'TrueUSD' },
  { key: 'MKR', value: 'Maker' },
];


const Exchanges = () => {
  const [selected, setSelected] = useState('bitcoin/BTC')
  return (
    <MainLayout>
      <div class="relative mb-4 overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white ">
        
        
    
      <div className="flex justify-center">
      <div className="min-w-[80%] pt-10">
      <div class="relative h-10 w-72 min-w-[200px]">
  <select
  value={selected}
  onChange={(e)=>{setSelected(e.target.value)}}
    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
   {cryptocurrencies.map((item)=>{
   return <option value={`${item.value.toLocaleLowerCase()}/${item.key}`} >{item.value}</option>
   })} 
  </select>
  <label
    class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
    Select a Coin
  </label>
</div>
</div></div>
</div>

      <Table selected={selected}/>

</div>

    </MainLayout>
  );
};

export default Exchanges;
