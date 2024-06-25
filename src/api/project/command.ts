import { PageListResponse } from './../baseModel';
import { invoke } from '@tauri-apps/api/core';
import { ProjectRepo } from './project';
import { StarterProject } from '/#/abi/project';

async function getProjectList() {
  return (await invoke('get_project_list')) as PageListResponse<StarterProject>;
}

async function executeProject(uuid: string) {
  await invoke('excute_project', { uuid: uuid });
}

export const projectCommand: ProjectRepo = {
  getProjectList: getProjectList,
  executeProject: executeProject,
};
