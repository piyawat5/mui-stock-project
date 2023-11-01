import * as React from "react";
import Modal from "../../features/Modal";
import { Button } from "@mui/material";

type ReportPageProps = {
  //
};

const ReportPage: React.FC<any> = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div>
      <Button
        sx={{ color: "white" }}
        variant="contained"
        onClick={toggle}
        type="button"
      >
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={toggle}>
        <h1 className="modal-title">Modal Content</h1>
        <p className="modal-description">This is the content of the modal.</p>
      </Modal>
    </div>
  );
};

export default ReportPage;
