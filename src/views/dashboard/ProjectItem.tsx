import { StarterProject } from '/#/abi/project';
import { projectCommand } from '/@/api/project';
import { Icon } from '/@/components/Icon';
import { Button } from 'antd';

export type ProjectItemProps = {
  item: StarterProject;
};

export function ProjectItem({ item }: ProjectItemProps) {
  async function onClick() {
    try {
      await projectCommand.executeProject(item.meta.uuid);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex p-6 items-center'>
      <div>
        <Icon icon='godot' />
      </div>
      <div className='p-2 flex-1'>
        <div className='flex justify-between flex-row items-center '>
          <div>{item.meta.name}</div>
          <Button onClick={onClick}>打开</Button>
        </div>
        <div>{item.meta.description}</div>
      </div>
    </div>
  );
}
