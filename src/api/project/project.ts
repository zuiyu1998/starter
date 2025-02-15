import {
  StarterProject,
  StarterProjectCreate,
  ExecuterOption,
  StarterProjectUpdate,
} from '/#/abi/project';
import { PageListResponse } from '../baseModel';

export interface ProjectRepo {
  getProjectList(
    page: number,
    page_size: number,
    tags?: string
  ): Promise<PageListResponse<StarterProject>>;
  executeProject(uuid: string): Promise<void>;
  createProject(create: StarterProjectCreate): Promise<void>;
  deleteProject(uuid: string): Promise<void>;
  getExecuterOptions(): Promise<ExecuterOption[]>;
  updateProject(update: StarterProjectUpdate): Promise<ExecuterOption[]>;
}
