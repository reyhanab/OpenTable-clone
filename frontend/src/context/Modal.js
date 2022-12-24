import { useState, useRef, createContext, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const modelRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => setValue(modelRef.current), []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modelRef} />
    </>
  );
};

export const Modal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);

  return (
    modalNode &&
    ReactDOM.createPortal(
      <div  className="w-64 h-96 bg-slate-100 border border-blue-800">
        <div id="modal-background" onClick={onClose} />
        <div id="modal-content">{children}</div>
      </div>,
      modalNode
    )
  );
};

export default ModalProvider;
