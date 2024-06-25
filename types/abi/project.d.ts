export type StarterProjectMeta = {
  path: string;
  exePath: string;
  uuid: string;
  createAt: number;
  updateAt: number;
  icon: string;
};

export type Executer = any;

export type StarterProject = {
  meta: StarterProjectMeta;
  executer: Executer;
};
