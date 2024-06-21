import { lazy as _lazy } from 'react';

function lazy(importFn: Function) {
  return _lazy(async () => {
    const m = await importFn();
    return m;
  });
}

export const icons = {
  godot: lazy(async () => import('../../assets/icons/godot.svg?react')),
};
