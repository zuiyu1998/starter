import { useCallback, useEffect, useState } from 'react';
import { StarterProject } from '/#/abi/project';
import { ProjectItem } from './ProjectItem';

import { FloatButton } from 'antd';
import { useModal } from '/@/components/Modal';
import { projectCommand } from '/@/api/project';
import { FolderAddOutlined } from '@ant-design/icons';

import { ProjectCreateModal } from './ProjectCreateModal';

export function Dashboard() {
  const [list, setList] = useState<StarterProject[]>([]);

  const {
    register,
    method: { openModal, closeModal },
  } = useModal();

  const _getData = useCallback(async () => {
    try {
      const res = await projectCommand.getProjectList(0, 50);
      setList(res.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    _getData();
  }, [_getData]);

  function onAdd() {
    openModal({ isUpdate: false });
  }

  function onEdit(item: StarterProject) {
    openModal({ isUpdate: true, item });
  }

  async function onOpen(uuid: string) {
    try {
      await projectCommand.executeProject(uuid);
    } catch (error) {}
  }
  async function onDelete(uuid: string) {
    try {
      await projectCommand.deleteProject(uuid);
      await _getData();
    } catch (error) {}
  }

  function onSuccess() {
    closeModal();
    _getData();
  }

  return (
    <div className='h-full w-full bg-slate-50'>
      <div className='py-4'>
        {list.map((item) => {
          return (
            <ProjectItem
              item={item}
              key={item.meta.uuid}
              onOpen={onOpen}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </div>
      <FloatButton icon={<FolderAddOutlined />} onClick={onAdd}>
        添加
      </FloatButton>

      <ProjectCreateModal register={register} onSuccess={onSuccess} />
    </div>
  );
}
