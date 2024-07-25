export interface StorageInterface {
  get_item(key: string): Promise<string | undefined>;
  set_item(key: string, value: string): Promise<void>;
  remove_item(key: string): Promise<string | undefined>;
  clear(): Promise<void>;
}
