import { useState, useRef, createContext, useContext, useEffect } from "react";
import ReactDOM from "react-dom";

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
      <div  className="flex fixed items-center justify-center z-99 inset-0 ">
        <div className="absolute bg-black opacity-60 z-99 inset-0" onClick={onClose} />
        <div className="absolute z-99 bg-white border rounded-md">{children}</div>
      </div>,
      modalNode
    )
  );
};

export default ModalProvider;
