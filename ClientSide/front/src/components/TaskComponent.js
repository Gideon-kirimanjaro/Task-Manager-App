import React from "react";
import Button from "react-bootstrap/esm/Button";

import Table from "react-bootstrap/Table";

function TaskComponent({ id, task, time, children, onEdit, onDelete }) {
  return (
    <Table
      striped
      bordered
      hover
      variant="dark"
      style={{ width: "400px", margin: "auto", marginTop: "10px" }}
    >
      <thead>
        <tr>
          <th>complete</th>
          <th>Task</th>
          <th>Time</th>
          <th>edit</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
}

export default TaskComponent;
