import React, { useState, useEffect } from "react";
import TaskDataService from "../services/TaskDataService";
import { Link } from "react-router-dom";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveTasks();
  }, []);

 

  const retrieveTasks = () => {
    TaskDataService.getAll()
      .then(response => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTasks();
    setCurrentTasks(null);
    setCurrentIndex(-1);
  };

  const setActiveTasks = (task, index) => {
    setCurrentTasks(task);
    setCurrentIndex(index);
  };

  const removeAllTasks = () => {
    TaskDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

 
  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Tasks List</h4>

        <ul className="list-group">
          {tasks &&
            tasks.map((task, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTasks(task, index)}
                key={index}
              >
                {task.title}
              </li>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTasks}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-6">
        {currentTasks ? (
          <div>
            <h4>Task</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTasks.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTasks.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTasks.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tasks/" + currentTasks.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksList;
