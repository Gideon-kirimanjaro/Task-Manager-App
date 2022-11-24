import axios from "axios";
import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import TaskComponent from "./TaskComponent";
import TaskForm from "./TaskForm";
import CustomModal from "./Ui/Modal/CustomModal";

const Home = (props) => {
  const { data } = props;
  const deleteTaskHandler = (id) => {
    axios.delete(`http://localhost:4500/api/tasks/${id}`);
    props.deleteRender(id);
  };

  return (
    <div>
      <TaskForm
        updateRender={(data) => {
          props.postRender(data);
        }}
      />
      <TaskComponent>
        {data &&
          data.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  {" "}
                  {item.completed === true ? (
                    <p> ✔ complete</p>
                  ) : (
                    <p> ❌ incomplete</p>
                  )}
                </td>
                <td
                  style={
                    item.completed === true
                      ? { textDecoration: "line-through" }
                      : null
                  }
                >
                  {item.taskName}
                </td>
                <td>{item.taskTime}</td>
                <td>
                  <Button>
                    {" "}
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/task/${item._id}`}
                    >
                      Edit
                    </Link>
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteTaskHandler(item._id);
                    }}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            );
          })}
      </TaskComponent>
    </div>
  );
};

export default Home;
