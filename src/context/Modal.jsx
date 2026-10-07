import { createPortal } from "react-dom";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return createPortal(
    <div
    //   className="fixed inset-0 z-9999flex items-center justify-center bg-black/40"
      onClick={onClose}
    >

        <style>.</style>
      <div
        className="bg-white rounded-xl shadow-2xl  "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}