import http from "../slices/http-common";

const getAll = () => {
  return http.get("/tasks");
};

const get = id => {
  return http.get(`/tasks/${id}`);
};

const create = data => {
  return http.post("/task/create", data);
};

const update = (id, data) => {
  return http.put(`/tasks/${id}`, data);
};

const remove = id => {
  return http.delete(`/tasks/${id}`);
};

const removeAll = () => {
  return http.delete(`/tasks`);
};

const TaskDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default TaskDataService;
