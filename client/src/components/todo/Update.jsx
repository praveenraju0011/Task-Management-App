import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const Update = ({ display, update, currentStatus }) => {
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const [Status, setStatus] = useState(currentStatus);

  const submit = async () => {
    await axios
      .put(`http://localhost:1000/api/v2/updateTask/${update._id}`, {
        ...Inputs,
        status: Status,
      })
      .then((response) => {
        toast.success("Your Task is updated successfully");
      });
   
    display("none");
  };
  useEffect(() => {
    setInputs({
      title: update.title,
      body: update.body,
    });
  }, [update]);
  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  return (
    <div className="p-5 d-flex justify-content-start align-items-start flex-column update">
      <h2>Update your task</h2>
      <input
        className="todo-inputs my-4 w-100 p-3"
        type="text"
        name="title"
        value={Inputs.title}
        onChange={change}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        name="body"
        value={Inputs.body}
        onChange={change}
      />

      <div className="container-fluid d-flex col-lg-3 col-10 justify-content-center align-items-center my-2">
        <br />
        <button
          className="btn btn-warning"
          onClick={() => {
            setStatus(false);
          }}
        >
          Pending
        </button>
        &nbsp;
        <button
          className="btn btn-success"
          onClick={() => {
            setStatus(true);
          }}
        >
          Completed
        </button>
        <br />
      </div>
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          Update
        </button>
        <button className="btn btn-danger my-4" onClick={() => display("none")}>
          Close
        </button>
      </div>
    </div>
  );
};
