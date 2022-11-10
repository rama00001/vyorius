import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TaskDataService from "../services/TaskDataService";

const Task = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTaskState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const getTask = id => {
    TaskDataService.get(id)
      .then(response => {
        setCurrentTask(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTask(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      published: status
    };

    TaskDataService.update(currentTask.id, data)
      .then(response => {
        setCurrentTask({ ...currentTask, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTask = () => {
    TaskDataService.update(currentTask.id, currentTask)
      .then(response => {
        console.log(response.data);
        setMessage("The task was updated successfully!");
        navigate("/tasks");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTask = () => {
    TaskDataService.remove(currentTask.id)
      .then(response => {
        console.log(response.data);
        navigate("/tasks");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTask.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTask.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTask.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTask.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTask}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTask}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Task...</p>
        </div>
      )}
    </div>
  );
};

export default Task;
