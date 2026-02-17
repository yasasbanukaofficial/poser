import { X } from "lucide-react";
import { type ModalProps } from "../interfaces/Modal";

const Modal = ({ isOpen, onClose, children, footer }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-[#0f0f0f] border border-zinc-800 p-10 shadow-2xl animate-in">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white"
        >
          <X size={20} />
        </button>
        {children}
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
