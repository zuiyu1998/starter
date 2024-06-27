import { useCallback, useEffect, useState } from 'react';
import { StarterProject } from '/#/abi/project';
import { projectCommand } from '/@/api/project';
import { ProjectItem } from './ProjectItem';

import { FloatButton } from 'antd';

export function Dashboard() {
  const [list, setList] = useState<StarterProject[]>([]);

  const _getData = useCallback(async () => {
    try {
      const res = await projectCommand.getProjectList(0, 50);
      setList(res.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    _getData();
  }, [_getData]);

  async function onAdd() {
    try {
      await projectCommand.createProject({
        path: '.',
        exe_path: 'code',
        icon: 'godot',
        name: 'test',
        description: 'test',
        executer: 2,
      });

      await _getData();
    } catch (error) {}
  }

  return (
    <div>
      <div>
        {list.map((item) => {
          return <ProjectItem item={item} key={item.meta.uuid} />;
        })}
      </div>
      <FloatButton onClick={onAdd}>添加</FloatButton>
    </div>
  );
}
