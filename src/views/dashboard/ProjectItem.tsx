import { StarterProject } from '/#/abi/project';
import classNames from './index.module.less';

export type ProjectItemProps = {
  item: StarterProject;
};

export function ProjectItem({ item }: ProjectItemProps) {
  return (
    <div className={classNames['project-item']}>
      <div>
        <img src={item.icon} />
      </div>
      <div>
        <div>
          <div>{item.name}</div>
          <div>打开</div>
        </div>
        <div>{item.description}</div>
      </div>
    </div>
  );
}
