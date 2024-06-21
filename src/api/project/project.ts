import { StarterProject } from '/#/abi/project';
import { PageListResponse } from '../baseModel';

export interface ProjectRepo {
  getProjectList(): Promise<PageListResponse<StarterProject>>;
}
