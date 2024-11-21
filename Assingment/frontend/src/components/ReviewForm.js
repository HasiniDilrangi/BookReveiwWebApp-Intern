import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task._id}>
            <td>{index + 1}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>
              <Button variant="primary" size="sm" onClick={() => onEdit(task)}>
                Edit
              </Button>{' '}
              <Button variant="danger" size="sm" onClick={() => onDelete(task._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskList;
