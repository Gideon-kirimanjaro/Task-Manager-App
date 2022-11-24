import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const TaskForm = (props) => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState(0);

  const onTaskChange = (e) => {
    setTask(e.target.value);
  };
  const onTimeChange = (e) => {
    setTime(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4500/api/tasks", {
        taskName: task,
        taskTime: time,
      })
      .then(alert("added"));
    props.updateRender(task);
  };
  return (
    <div
      style={{
        width: "400px",
        margin: "auto",
      }}
    >
      <Form>
        {" "}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={onTaskChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Time (mins)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Time"
            value={time}
            onChange={onTimeChange}
          />
        </Form.Group>
        <Button
          disabled={task.length < 3 || time < 1}
          variant="primary"
          type="submit"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
