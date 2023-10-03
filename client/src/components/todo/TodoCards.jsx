import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

export const TodoCards = ({ title, body, status, id, delid, display, updateId , toBeUpdate}) => {
  const currentStatus = status;

  const renderStatusButton = () => {
    if (currentStatus) {
      return <button className="btn btn-success">Completed</button>;
    } else {
      return <button className="btn btn-warning">Pending</button>;
    }
  };

  return (
    <div className="p-3 todo-card">
      <div>
        <h5>{title}</h5>
        <p className="todo-card-p">{body.split("", 100)}</p>
        <div className="d-flex justify-content-center align-items-center px-2 py-1">
          {renderStatusButton()}
        </div>
        <br />
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={() => {
            display("block");
            toBeUpdate(updateId)
          }}
        >
          <BiEdit className="card-icon update-icon" /> Update
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <AiFillDelete className="card-icon delete-icon" /> Delete
        </div>
      </div>
    </div>
  );
};
