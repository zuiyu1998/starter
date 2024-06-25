import { useEffect, useState } from 'react';
import { StarterProject } from '/#/abi/project';
import { projectCommand } from '/@/api/project';
import { ProjectItem } from './ProjectItem';

export function Dashboard() {
  const [list, setList] = useState<StarterProject[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await projectCommand.getProjectList();

        console.log(res);

        setList(res.data);
      } catch (error) {}
    }

    getData();
  }, []);

  return (
    <div>
      {list.map((item) => {
        return <ProjectItem item={item} key={item.meta.uuid} />;
      })}
    </div>
  );
}
