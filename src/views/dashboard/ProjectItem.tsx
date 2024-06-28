import { StarterProject } from '/#/abi/project';
import { Icon } from '/@/components/Icon';
import { Button } from 'antd';

export type ProjectItemProps = {
  item: StarterProject;
  onOpen(uuid: string): Promise<void>;
  onDelete(uuid: string): Promise<void>;
};

export function ProjectItem({ item, onOpen, onDelete }: ProjectItemProps) {
  return (
    <div className='flex p-6 items-center'>
      <div>
        <Icon icon='godot' />
      </div>
      <div className='p-2 flex-1'>
        <div className='flex justify-between flex-row items-center '>
          <div>{item.meta.name}</div>
          <Button
            onClick={() => {
              onOpen(item.meta.uuid);
            }}
          >
            打开
          </Button>
          <Button
            onClick={() => {
              onDelete(item.meta.uuid);
            }}
          >
            删除
          </Button>
        </div>
        <div>{item.meta.description}</div>
      </div>
    </div>
  );
}
