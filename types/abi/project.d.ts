export type StarterProjectMeta = {
  path: string;
  exe_path: string;
  uuid: string;
  createAt: number;
  updateAt: number;
  icon: string;
  name: string;
  description: string;
};

export type Executer = any;

export type StarterProject = {
  meta: StarterProjectMeta;
  executer: Executer;
};

export type StarterProjectCreate = {
  path: string;
  exe_path: string;
  icon: string;
  name: string;
  description: string;
  executer: number;
};
