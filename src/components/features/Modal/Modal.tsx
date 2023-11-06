/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
import { Box, Button } from "@mui/material";

export enum ModalRoleEnum {
  general = "GENERAL",
  confirmDelete = "CONFIRM_DELETE",
  confirm = "CONFIRM",
}

interface ModalProps {
  isOpen: boolean;
  role?: ModalRoleEnum;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  textConfirm?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  role = ModalRoleEnum.general,
  onSubmit = () => {},
  children,
  textConfirm = "submit",
}) => {
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
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}
          >
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
            {role === ModalRoleEnum.confirmDelete && (
              <Button
                color="error"
                sx={{ color: "white" }}
                variant="contained"
                onClick={() => {
                  onSubmit();
                  onClose();
                }}
              >
                DELETE
              </Button>
            )}
            {role === ModalRoleEnum.confirm && (
              <Button
                color="primary"
                sx={{ color: "white" }}
                variant="contained"
                onClick={() => {
                  onSubmit();
                  onClose();
                }}
              >
                {textConfirm}
              </Button>
            )}
          </Box>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
