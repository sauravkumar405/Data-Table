import React, { createContext, useState } from "react";
import "./styles.css";
import Table from "./Table";
import mockData from "../data/records.json"; // Adjust the path based on your file structure

export const MyContext = createContext();

export default function App() {
  const [records, setRecords] = useState(mockData);

  const addRecord = (record) => {
    console.log("inside context", record);
    setRecords([...records, { ...record, id: Date.now() }]);
  };
  const deleteRecord = (id) => {
    setRecords(records.filter((ele) => ele.id !== id));
  };
  const updateRecord = (record) => {
    setRecords(records.map((ele) => (ele.id === record.id ? record : ele)));
  };
  return (
    <div className="App">
      <MyContext.Provider
        value={{ records, addRecord, deleteRecord, updateRecord, setRecords }}
      >
        <Table />
      </MyContext.Provider>
    </div>
  );
}
