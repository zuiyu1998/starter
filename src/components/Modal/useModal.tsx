import { useEffect, useRef } from 'react';
import { ModalInnerMethod } from './BaseModal';
import { ModalProps } from 'antd';

export interface ModalMethod {
  openModal: (data?: any) => void;
  closeModal: () => void;
}

export type CustomModelProps = ModalProps & {
  register?: (method: ModalMethod) => void;
};

export type ModalInnerCallback = (data: any) => void | Promise<void>;

export function useModalInner(
  props: CustomModelProps,
  callback?: ModalInnerCallback
) {
  const methodRef = useRef<null | ModalInnerMethod>();

  function register(method: ModalInnerMethod) {
    methodRef.current = method;
  }

  function openModal(data?: any) {
    methodRef.current?.openModal();
    callback && data && callback(data);
  }

  function closeModal() {
    methodRef.current?.closeModal();
  }

  const modalMethod: ModalMethod = { openModal, closeModal };

  useEffect(() => {
    if (props.register) {
      props.register(modalMethod);
    }
  }, []);

  return { register, modalMethod };
}

export function useModal() {
  const methodRef = useRef<null | ModalMethod>();

  function register(method: ModalMethod) {
    methodRef.current = method;
  }

  return { register, method: { ...(methodRef.current as ModalMethod) } };
}
