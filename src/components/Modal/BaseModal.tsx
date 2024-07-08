import { Modal, ModalProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';

export type BaseModelProps = ModalProps & {
  register?: (method: ModalInnerMethod) => void;
};

export interface ModalInnerMethod {
  openModal(): void;
  closeModal(): void;
}

export function BaseModal(props: BaseModelProps) {
  const [open, setOpen] = useState(false);

  const modalProps = useMemo(() => {
    let tmp = {
      ...props,
    };

    if (!tmp.onOk) {
      tmp.onOk = closeModal;
    }

    if (!tmp.onCancel) {
      tmp.onCancel = closeModal;
    }

    return tmp;
  }, [props]);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  useEffect(() => {
    if (props.register) {
      props.register({
        openModal,
        closeModal,
      });
    }
  }, []);

  return <Modal {...modalProps} open={open} />;
}
