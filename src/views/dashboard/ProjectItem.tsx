import { StarterProject } from '/#/abi/project';

export type ProjectItemProps = {
  item: StarterProject;
};

export function ProjectItem({ item }: ProjectItemProps) {
  return (
    <div className='flex p-6 items-center'>
      <div>
        <img src={item.icon} />
      </div>
      <div className='p-2 flex-1'>
        <div className='flex justify-between flex-row items-center '>
          <div>{item.name}</div>
          <div>打开</div>
        </div>
        <div>{item.description}</div>
      </div>
    </div>
  );
}
