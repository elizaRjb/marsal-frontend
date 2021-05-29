import { request } from 'services/httpService';

class TasksApi {
  static createTask(projectId, data) {
    const url = `projects/${projectId}/tasks`;

    return request(url, 'post', data);
  }

  static getTasks(projectId) {
    const url = `projects/${projectId}/tasks`;

    return request(url, 'get');
  }

  static deleteTask(projectId, data) {
    const url = `projects/${projectId}/tasks`;

    return request(url, 'delete', data);
  }

  static getTaskDetails(projectId, taskId) {
    const url = `projects/${projectId}/tasks/${taskId}`;

    return request(url, 'get');
  }

  static updateTaskDetails(projectId, taskId, data) {
    const url = `projects/${projectId}/tasks/${taskId}`;

    return request(url, 'put', data);
  }

  static getSubTasks(projectId, taskId) {
    const url = `projects/${projectId}/tasks/${taskId}/subtasks`;

    return request(url, 'get');
  }
}

export default TasksApi;
