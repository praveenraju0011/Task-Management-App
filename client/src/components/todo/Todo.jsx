import React, { useEffect, useState } from "react";
import "./Todo.css";
import { TodoCards } from "./TodoCards.jsx";
import { Update } from "./Update.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store";
import axios from "axios";
let toUpdateArray = [];

export const Todo = () => {
  let id = sessionStorage.getItem("id");

  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  const [Status, setStatus] = useState(false);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body should not be empty");
    } else {
      if (id) {
        await axios
          .post("http://localhost:1000/api/v2/addTask", {
            title: Inputs.title,
            body: Inputs.body,
            status: Status,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        setInputs({ title: "", body: "" });
        toast.success("Your Task is Added");
      } else {
        setArray([...Array, { ...Inputs, status: Status }]);
        setInputs({ title: "", body: "" });
        toast.success("Your Task is Added");
        toast.error("Your Task is not saved !! Please Sign Up/Sign In");
      }
    }
  };

  const del = async (Cardid) => {
    if (id) {
      await axios
        .delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`, {
          data: { id: Cardid },
        })
        .then((response) => {
          toast.success("Your task is Deleted");
        });
    } else {
      // toast.error("please Sign up First");
      toast.error("please Sign up First", {
        toastId: "success1",
      });
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };
  const update = (value) => {
    toUpdateArray = Array[value];
  };
  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios
          .get(`http://localhost:1000/api/v2/getTasks/${id}`)
          .then((response) => {
            setArray(response.data.list);
          });
      };
      fetch();
    } else {
      // toast.error("please Sign up First");
      toast.error("please Sign up First", {
        toastId: "success1",
      });
    }
  }, [submit]);
  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4">
          <div className="d-flex flex-column todo-inputs-div w-75 p-1">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="todo-inputs my-2 p-2"
              value={Inputs.title}
              onClick={show}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              name="body"
              placeholder="Body"
              className="todo-inputs my-2 p-2"
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

            <button className="home-btn" onClick={submit}>
              Add task
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item, index) => {
                  return (
                    <div key={index} className="col-lg-3 col-10 mx-4 my-2">
                      <TodoCards
                        title={item.title}
                        body={item.body}
                        status={item.status}
                        id={item._id}
                        delid={del}
                        display={dis}
                        updateId={index}
                        toBeUpdate={update}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update display={dis} update={toUpdateArray} currentStatus={Status} />
        </div>
      </div>
    </>
  );
};
