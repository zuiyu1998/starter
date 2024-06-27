import { useRef } from 'react';
import { ModalMethod } from './BaseModal';

export function useModal() {
  const methodRef = useRef<null | ModalMethod>();

  function register(method: ModalMethod) {
    methodRef.current = method;
  }

  return { register, method: { ...(methodRef.current as ModalMethod) } };
}
