import { useContext } from 'react'
import AuthContext from '../auth'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert'; 
import Button from '@mui/material/Button';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIErrorModal() {
    const { auth } = useContext(AuthContext);
    
    function handleCloseModal(event) {
        auth.closeErrorModal();
    }

    return (
        <Modal
            open={auth.errorFlag}
        >
            <Box sx={style}>
            <Alert severity="error">{auth.error}</Alert>
            <Button variant='contained' onClick={handleCloseModal}>
                Close Alert
              </Button>
            </Box>
        </Modal>
    );
}