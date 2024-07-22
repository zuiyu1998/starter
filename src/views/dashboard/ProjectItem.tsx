import { StarterProject } from '/#/abi/project';
import { Icon, IconName } from '/@/components/Icon';
import { Button, Space, Tag } from 'antd';

import {
  FolderOpenOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useMemo } from 'react';
import { getRandColor } from '/@/utils/rand_color';

export type ProjectItemProps = {
  item: StarterProject;
  onOpen(uuid: string): Promise<void>;
  onDelete(uuid: string): Promise<void>;
  onEdit(item: StarterProject): void;
};

export function ProjectItem({
  item,
  onOpen,
  onDelete,
  onEdit,
}: ProjectItemProps) {
  const colors = ['color', 'magenta'];

  const tags = useMemo(() => {
    return String(item.meta.tags)
      .split(' ')
      .map((item) => {
        return {
          name: item,
          color: getRandColor(colors),
        };
      });
  }, [item.meta.tags]);

  return (
    <div className='p-6  bg-white mx-4 rounded-lg'>
      <div className='flex items-center'>
        <div>
          <Icon icon={item.meta.icon as IconName} size={40} />
        </div>
        <div className='p-4 flex-1 flex flex-row items-center justify-between'>
          <div>
            <div className='text-black text-lg'>{item.meta.name}</div>
            <div className='text-slate-400 text-xs'>
              {item.meta.description}
            </div>
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

      <div>
        {tags.map((item) => {
          return (
            <Tag key={item.name} color={item.color}>
              {item.name}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
