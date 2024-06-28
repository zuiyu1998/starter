import { PageListResponse } from './../baseModel';
import { invoke } from '@tauri-apps/api/core';
import { ProjectRepo } from './project';
import { StarterProject, StarterProjectCreate } from '/#/abi/project';

async function getProjectList(page: number, page_size: number) {
  return (await invoke('get_project_list', {
    page,
    page_size,
  })) as PageListResponse<StarterProject>;
}

async function executeProject(uuid: string) {
  await invoke('excute_project', { uuid: uuid });
}

async function deleteProject(uuid: string) {
  await invoke('delete_project', { uuid: uuid });
}

async function createProject(create: StarterProjectCreate) {
  await invoke('create_project', { create });
}

export const projectCommand: ProjectRepo = {
  getProjectList: getProjectList,
  executeProject: executeProject,
  createProject: createProject,
  deleteProject: deleteProject,
};
