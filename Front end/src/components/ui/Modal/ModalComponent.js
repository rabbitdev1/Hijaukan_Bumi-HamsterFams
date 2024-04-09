import React from "react";
import { createPortal } from "react-dom";

const ModalComponent = ({ children }) => {
  return createPortal(
    <div className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full">
      {children}
    </div>,
    document.getElementById("modal-root"),
  );
};

export default ModalComponent;
