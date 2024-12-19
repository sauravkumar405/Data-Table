import React, { useState, useContext } from "react";
import "./Table.css";
import { MyContext } from "./App";

const Modal = ({ closeModal, editMode, item }) => {
  const [record, setRecord] = useState(item ? item : { gender: "Male" });
  const { addRecord, updateRecord } = useContext(MyContext);

  const handleChange = (value, field) => {
    setRecord((record) => ({ ...record, [field]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateRecord(record);
    } else {
      addRecord(record);
    }
    closeModal();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{editMode ? "Edit Record" : "Add Record"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={record.name}
              onChange={(e) => {
                handleChange(e.target.value, "name");
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={record.age}
              onChange={(e) => {
                handleChange(e.target.value, "age");
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={record.gender}
              onChange={(e) => {
                handleChange(e.target.value, "gender");
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={record.address}
              onChange={(e) => {
                handleChange(e.target.value, "address");
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              value={record.mobile}
              onChange={(e) => {
                handleChange(e.target.value, "mobile");
              }}
            />
          </div>
          <button className="save-button" onClick={closeModal}>
            Close
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
