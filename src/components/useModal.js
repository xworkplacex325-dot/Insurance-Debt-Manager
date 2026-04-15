import { useContext } from "react";
import { ModalContext } from "./modalContext";

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within <Modal>");
  }
  return ctx;
}
