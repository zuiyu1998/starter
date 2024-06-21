import { ProjectRepo } from './project';

async function getProjectList() {
  return {
    data: [
      {
        id: 1,
        path: 'test',
        exePath: 'test',
        uuid: 'test',
        createAt: 1,
        updateAt: 1,
        icon: 'test',
        name: 'test',
        description: 'test',
      },
    ],
    has_next: false,
    page_size: 50,
    page: 10,
  };
}

export const projectCommand: ProjectRepo = {
  getProjectList: getProjectList,
};
