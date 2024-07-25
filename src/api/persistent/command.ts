import { invoke } from '@tauri-apps/api/core';

import { StorageInterface } from './types';

async function set_item(key: string, value: string) {
  await invoke('persistent_set_item', {
    key,
    value,
  });
}

async function get_item(key: string) {
  return (await invoke('persistent_get_item', { key: key })) as string;
}

async function remove_item(key: string) {
  return (await invoke('persistent_remove_item', { key: key })) as string;
}

async function clear() {
  await invoke('persistent_clear');
}

export const storageCommand: StorageInterface = {
  set_item,
  clear,
  get_item,
  remove_item,
};
