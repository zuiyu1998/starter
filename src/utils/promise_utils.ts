import { PromiseUtils } from '@handy-common-utils/promise-utils';

export function timeout(ms: number): Promise<void> {
  return PromiseUtils.delayedResolve(ms, undefined);
}
