import { StarterProject } from '/#/abi/project';
import { Icon } from '/@/components/Icon';
import { Button, Space } from 'antd';

import {
  FolderOpenOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

export type ProjectItemProps = {
  item: StarterProject;
  onOpen(uuid: string): Promise<void>;
  onDelete(uuid: string): Promise<void>;
  onEdit(item: StarterProject): Promise<void>;
};

export function ProjectItem({
  item,
  onOpen,
  onDelete,
  onEdit,
}: ProjectItemProps) {
  return (
    <div className='flex p-6 items-center bg-white mx-4 rounded-lg'>
      <div>
        <Icon icon='godot' size={40} />
      </div>
      <div className='p-4 flex-1 flex flex-row items-center justify-between'>
        <div>
          <div className='text-black text-lg'>{item.meta.name}</div>
          <div className='text-slate-400 text-xs'>{item.meta.description}</div>
        </div>

        <Space>
          <Button
            type='primary'
            icon={<FolderOpenOutlined />}
            onClick={() => {
              onOpen(item.meta.uuid);
            }}
          ></Button>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => {
              onEdit(item);
            }}
          ></Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              onDelete(item.meta.uuid);
            }}
          ></Button>
        </Space>
      </div>
    </div>
  );
}
