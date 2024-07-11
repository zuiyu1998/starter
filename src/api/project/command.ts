import { PageListResponse } from './../baseModel';
import { invoke } from '@tauri-apps/api/core';
import { ProjectRepo } from './project';
import {
  StarterProject,
  StarterProjectCreate,
  ExecuterOption,
  StarterProjectUpdate,
} from '/#/abi/project';

async function getProjectList(page: number, page_size: number, tags?: string) {
  return (await invoke('get_project_list', {
    page,
    page_size,
    tags,
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

async function getExecuterOptions() {
  return (await invoke('get_executer_options')) as ExecuterOption[];
}

async function updateProject(update: StarterProjectUpdate) {
  return (await invoke('update_project', { update })) as ExecuterOption[];
}

export const projectCommand: ProjectRepo = {
  getProjectList: getProjectList,
  executeProject: executeProject,
  createProject: createProject,
  deleteProject: deleteProject,
  getExecuterOptions: getExecuterOptions,
  updateProject: updateProject,
};
