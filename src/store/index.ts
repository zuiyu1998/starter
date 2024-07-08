import { executerStore } from './src/executer';

export async function initStore() {
  await executerStore.ensureInitialization();
}
