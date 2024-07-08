import { lazy as _lazy } from 'react';

function lazy(importFn: Function) {
  return _lazy(async () => {
    const m = await importFn();
    return m;
  });
}

export const icons = {
  godot: lazy(async () => import('../../assets/icons/godot.svg?react')),
  react: lazy(async () => import('../../assets/icons/react.svg?react')),
  react_native: lazy(
    async () => import('../../assets/icons/react_native.svg?react')
  ),
  vue: lazy(async () => import('../../assets/icons/vue.svg?react')),
  rust: lazy(async () => import('../../assets/icons/rust.svg?react')),
};

export const iconData = Object.keys(icons);
