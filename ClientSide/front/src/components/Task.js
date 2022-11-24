import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UpdateAlert from "./Ui/Update/Alert";
const Task = (props) => {
  const params = useParams();
  console.log("PARAMS", params.taskId);
  const [itemTask, setItemTask] = useState("");
  const [itemTime, setItemTime] = useState("");
  const [update, setupdate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const fetchTask = useCallback(() => {
    fetch(`http://localhost:4500/api/tasks/${params.taskId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data", data);
        const { taskName, taskTime, completed } = data;
        setItemTask(taskName);
        setItemTime(taskTime);
        setTaskCompleted(completed);
      });
  }, [params.taskId]);
  useEffect(() => {
    fetchTask();
  }, [fetchTask]);
  const taskHandler = (e) => {
    setItemTask(e.target.value);
  };
  const timeHandler = (e) => {
    setItemTime(e.target.value);
  };
  const handleCheck = () => {
    setTaskCompleted(!taskCompleted);
  };
  const updateApi = async () => {
    setLoader(true);
    await axios
      .put(`http://localhost:4500/api/tasks/${params.taskId}`, {
        taskName: itemTask,
        taskTime: itemTime,
        completed: taskCompleted,
      })
      .then(props.liftState({ itemTask, itemTime, taskCompleted }))
      .then((response) => {
        if (response.status === 200) {
          setupdate(true);
        }
        console.log(response);
      })
      .then(setupdate(false));
    setLoader(false);
  };
  const updateTask = () => {
    updateApi();
  };

  return (
    <div>
      <Form
        style={{
          width: "400px",
          margin: "auto",
          padding: "30px",
          border: "1px solid green",
          borderRadius: "20px 20px",
          backgroundColor: "whitesmoke",
        }}
      >
        <p>Task id: {params.taskId}</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            value={itemTask}
            autoFocus
            onChange={taskHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="Number"
            value={itemTime}
            autoFocus
            onChange={timeHandler}
          />
          <Form.Check type="checkbox" id="custom-switch" className="mt-2">
            <Form.Check.Input
              type="checkbox"
              isValid
              checked={taskCompleted}
              onChange={handleCheck}
            />{" "}
            <Form.Check.Label style={{ color: "black", fontWeight: "bold" }}>
              Task Completed
            </Form.Check.Label>
          </Form.Check>
        </Form.Group>

        <Button
          disabled={itemTask.length < 1 || itemTime < 1}
          variant="primary"
          onClick={updateTask}
        >
          {" "}
          Update Task
        </Button>
        <div>
          {loader && <p style={{ color: "green" }}>Updating...</p>}
          {update ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Updated Successfully!
            </p>
          ) : null}
        </div>
      </Form>

      <Button variant="info" className="m-2">
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          Back to Tasks
        </Link>
      </Button>
    </div>
  );
};

export default Task;
