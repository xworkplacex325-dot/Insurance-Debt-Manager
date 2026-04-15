import { useContext, useState, cloneElement } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./modalContext";

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>
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
    <div
      className="pointer-events-auto fixed inset-0 z-[100] flex items-center
        justify-center"
    >
      {/* Dimmed Background */}
      <div className="fixed inset-0 bg-on-background/10 backdrop-blur-[2px]" onClick={close}></div>

      {/* Modal Container */}
      <div
        className="animate-in fade-in zoom-in-95 relative z-10 m-4 w-full max-w-lg
          transform overflow-hidden rounded-xl border border-outline-variant/10
          bg-surface-container-lowest p-6 shadow-[0_40px_80px_rgba(44,52,55,0.12)]
          transition-all duration-200"
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 flex cursor-pointer select-none items-center
            justify-center rounded-full p-2 text-on-surface-variant transition-colors
            hover:bg-surface-container-high dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">close</span>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
