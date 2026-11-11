'use client'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Dispatch, ReactNode, SetStateAction } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'fit-content',
};


interface AlertProp {
    children : ReactNode,
    open : boolean,
    handleClose : () => void
}

export default function AlertBox({
    open,
    handleClose,
    children
} : AlertProp) {

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
  );
}