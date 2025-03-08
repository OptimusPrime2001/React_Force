import React, { useEffect, useState } from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const ModalQr = (props) => {
    const { isOpen, onClose, onSuccess, header, content, btnName, data } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        // maxWidth="xs"
        >
            <DialogTitle className="border-bottom">
                {header ? header : "Mã QR"}
            </DialogTitle>
            <DialogContent className="pt-4 pb-4">
                <div style={{ textAlign: 'center' }}>
                    {data && data.filePath && (
                        <img src={data.filePath} alt='qr' />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ModalQr