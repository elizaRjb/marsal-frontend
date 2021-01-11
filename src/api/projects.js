import { request } from 'services/httpService';

class ProjectsApi {
  static getProjects() {
    const url = '/projects';

    return request(url, 'get');
  }

  static createProject(data) {
    const url = '/projects';

    return request(url, 'post', data);
  }
}

export default ProjectsApi;
