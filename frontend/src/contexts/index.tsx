import React from "react";

import { ModalContextProvider } from "./ModalContext";

type Props = {
  children: React.ReactNode;
};

const ContextProvider: React.FC<Props> = ({ children }) => {
  return <ModalContextProvider>{children}</ModalContextProvider>;
};

export default ContextProvider;
