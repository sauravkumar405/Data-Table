import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import "./Table.css";
import { MyContext } from "./App";

const Table = () => {
  const { records, deleteRecord, setRecords } = useContext(MyContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [filteredList, setFilteredList] = useState(records);
  const [columnSearch, setColumnSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [totalLength, setTotalLength] = useState(filteredList.length);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleAdd = () => {
    setEditMode(false);
    setSelectedItem(undefined);
    setModalOpen(true);
  };
  const handleUpdate = (item) => {
    setSelectedItem(item);
    setEditMode(true);
    setModalOpen(true);
  };
  const handleDelete = (id) => {
    deleteRecord(id);
  };
  const handleSort = (field) => {
    let temp = [...filteredList];
    temp.sort((a, b) => (a[field] < b[field] ? -1 : 1));
    setFilteredList(temp);
  };
  const nextPage = () => {
    if (endIndex >= totalLength) return;
    setCurrentPage((prev) => prev + 1);
    setStartIndex(endIndex);
    setEndIndex(endIndex + 5);
  };
  const prevPage = () => {
    if (startIndex === 0) return;
    setCurrentPage((prev) => prev - 1);
    setStartIndex(startIndex - 5);
    setEndIndex(startIndex);
  };
  useEffect(() => {
    const handleFilter = () => {
      const temp = records.filter((record) =>
        Object.values(record).some((val) =>
          val.toLowerCase().includes(columnSearch.toLowerCase())
        )
      );
      setFilteredList(temp);
    };
    handleFilter();
  }, [columnSearch]);
  useEffect(() => {
    setTotalLength(filteredList.length);
  }, [filteredList]);

  return (
    <>
      <div className={isModalOpen ? "container blurred" : "container"}>
        <h1>Contact Information</h1>
        <div id="headline">
          <button className="save-button" onClick={handleAdd}>
            Add Record
          </button>

          <div>
            <label>Filter:</label>
            <input
              type="text"
              value={columnSearch}
              onChange={(e) => {
                setColumnSearch(e.target.value);
              }}
            ></input>
          </div>

          <button className="save-button" onClick={prevPage}>
            -
          </button>
          {currentPage}
          {" of "}
          {Math.ceil(totalLength / 5)}
          <button className="save-button" onClick={nextPage}>
            +
          </button>
          <div>{`Showing ${totalLength} records`}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <span>Name</span>
                <button
                  className="icon-button"
                  onClick={(e) => {
                    handleSort("name");
                  }}
                >
                  sort
                </button>
              </th>
              <th>
                <span>Age</span>
                <button
                  className="icon-button"
                  onClick={(e) => {
                    handleSort("age");
                  }}
                >
                  sort
                </button>
              </th>
              <th>
                <span>Gender</span>
                <button
                  className="icon-button"
                  onClick={(e) => {
                    handleSort("gender");
                  }}
                >
                  sort
                </button>
              </th>
              <th>
                <span>Address</span>
                <button
                  className="icon-button"
                  onClick={(e) => {
                    handleSort("address");
                  }}
                >
                  sort
                </button>
              </th>
              <th>
                <span>Mobile Number</span>
                <button
                  className="icon-button"
                  onClick={(e) => {
                    handleSort("mobile");
                  }}
                >
                  sort
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.slice(startIndex, endIndex).map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.address}</td>
                <td>{item.mobile}</td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(item)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal
          item={selectedItem}
          closeModal={closeModal}
          editMode={editMode}
        />
      )}
    </>
  );
};

export default Table;
