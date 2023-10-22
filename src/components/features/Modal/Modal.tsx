import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
import { Button } from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          {children}
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
