import { create } from 'zustand';

import { StoreInterface } from '../types';
import { projectCommand } from '/@/api/project';

export type ExecuterItem = {
  label: string;
  value: number;
};

interface ExecuterState {
  executerItems: ExecuterItem[];
  setExecuterItems: (executerItems: ExecuterItem[]) => void;
}

export const useExecuterStore = create<ExecuterState>()((set) => ({
  executerItems: [],
  setExecuterItems: (executerItems: ExecuterItem[]) =>
    set({ executerItems: executerItems }),
}));

export const executerStore: StoreInterface = {
  async ensureInitialization() {
    const executerItems: ExecuterItem[] = (
      await projectCommand.getExecuterOptions()
    ).map((item) => {
      return {
        label: item.name,
        value: item.executer,
      };
    });

    useExecuterStore.setState({ executerItems });
  },
};

export function getAppStoreWithOut(): ExecuterState {
  return useExecuterStore.getState();
}
