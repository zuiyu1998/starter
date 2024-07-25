import { storageCommand } from './command';
import { StorageInterface } from './types';

class PersistentImpl implements StorageInterface {
  storage: StorageInterface;

  constructor(storage: StorageInterface) {
    this.storage = storage;
  }

  get_item(key: string): Promise<string | undefined> {
    return this.storage.get_item(key);
  }

  set_item(key: string, value: string): Promise<void> {
    return this.storage.set_item(key, value);
  }

  remove_item(key: string): Promise<string | undefined> {
    return this.storage.remove_item(key);
  }

  clear(): Promise<void> {
    return this.storage.clear();
  }
}

export const Persistent = new PersistentImpl(storageCommand);
