import type { HTMLAttributes } from 'react';
import { createElement, useMemo } from 'react';

import { icons } from './icons';

export type IconName = keyof typeof icons;

// Props can vary from project to project, some will require to have some specific variant passed for styling,
// others will extend base css classes with custom prop class etc

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  className?: string;
  // These props make styling component easier than creating new classes
  rotate?: number;
  size?: number | string;
}

/**
 *
 * @param icon string key icon name
 * @param className string classes for styling
 * @param rotate optional number rotation of the icon
 * @returns Icon react component
 */
export const Icon = ({
  icon,
  className,
  rotate,
  size = 20,
  ...rest
}: Props) => {
  const getStyle = useMemo(() => {
    let s = `${size}`;
    s = `${s.replace('px', '')}px`;
    return {
      width: s,
      height: s,
    };
  }, [size]);

  return (
    <div
      className={className}
      aria-label={icon}
      role='img'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...getStyle,
      }}
      {...rest}
    >
      {createElement(icons[icon], {
        style: { width: '100%', height: '100%' },
      })}
    </div>
  );
};
