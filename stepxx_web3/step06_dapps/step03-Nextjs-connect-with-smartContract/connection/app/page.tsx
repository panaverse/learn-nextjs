"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../components/fetchData";

const ContractData = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    const data = await fetchData();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Smart Contract Data</h1>
      {data ? <p>{data.toString()}</p> : <p>Loading data...</p>}
    </div>
  );
};

export default ContractData;
