import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const CustomModal = ({ task, time, id }) => {
  const [show, setShow] = useState(false);
  const [itemTask, setItemTask] = useState(task);
  const [itemTime, setItemTime] = useState(time);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {}, []);
  const taskHandler = (e) => {
    setItemTask(e.target.value);
  };
  const timeHandler = (e) => {
    setItemTime(e.target.value);
  };
  const updateApi = async () => {
    await axios
      .put(`http://localhost:4500/api/tasks/${id}`, {
        taskName: itemTask,
        taskTime: itemTime,
      })
      .then(setShow(false));
  };
  const updateTask = async () => {
    await updateApi();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={itemTask.length < 1 || itemTime < 1}
            variant="primary"
            onClick={updateTask}
          >
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CustomModal;
