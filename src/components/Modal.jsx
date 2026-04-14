import { createContext, useContext, useState, cloneElement, useEffect } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
      {/* Dimmed Background */}
      <div 
        className="fixed inset-0 bg-on-background/10 backdrop-blur-[2px]" 
        onClick={close}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-surface-container-lowest rounded-xl shadow-[0_40px_80px_rgba(44,52,55,0.12)] border border-outline-variant/10 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 p-6 z-10 w-full max-w-lg m-4">
        <button 
          onClick={close}
          className="absolute top-4 right-4 p-2 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center cursor-pointer select-none"
        >
          <span className="material-symbols-outlined font-bold text-[20px]">close</span>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
