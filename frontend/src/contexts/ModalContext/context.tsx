import React, { createContext, useEffect, useMemo, useState } from "react";

import ConfirmationModal from "../../components/ConfirmationModal";
import Modal from "../../components/Modal";

type Props = {
  children: React.ReactNode;
};

const defaultValue: Modal = {
  content: null,
  open: false,
  type: null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext<{
  modal: Modal;
  onClose: () => void;
  setModal: React.Dispatch<React.SetStateAction<Modal>>;
}>({
  modal: defaultValue,
  setModal: () => {},
  onClose: () => {},
});

export const ModalContextProvider: React.FC<Props> = ({ children }) => {
  const [modal, setModal] = useState(defaultValue);
  const onClose = () => setModal(defaultValue);
  const initialValue = useMemo(() => ({ modal, setModal, onClose }), [modal]);

  useEffect(() => {
    if (modal.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal.open]);

  return (
    <ModalContext.Provider value={initialValue}>
      {children}
      {modal.type === "confirmation" ? (
        <ConfirmationModal {...modal} onClose={onClose}>
          {modal.content}
        </ConfirmationModal>
      ) : (
        <Modal {...modal} onClose={onClose}>
          {modal.content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
