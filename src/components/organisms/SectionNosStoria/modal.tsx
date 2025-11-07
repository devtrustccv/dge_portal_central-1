import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                className="relative bg-white bg-blend-lighten rounded-lg w-[90%] max-w-[800px]"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute bg-white right-0 text-black text-2xl" onClick={onClose}>
                    ✖
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
