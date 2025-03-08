import React, { useState } from 'react'
import {
    DialogActions,
    Button,
    TextField,
    DialogContent,
    DialogTitle,
    Dialog,
    makeStyles,
    Typography,
    IconButton,
} from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone'
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const ImportFile = (props) => {
    const classes = useStyles();
    const { isOpen, onClose } = props;
    const[file, setFile] = useState([])
    return (
        <div>
            <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth="xs">
                <DialogTitle disableTypography className="border-bottom">
                    <Typography variant="h6">Import file</Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="pt-4 pb-2">
                    <DropzoneArea
                        filesLimit={1}
                        acceptedFiles={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                        dropzoneText={"Tải lên file Excel"}
                        maxFileSize={500000000}
                        onChange={(files) => setFile(files)}
                        showFileNames={true}
                    />
                </DialogContent>
                <DialogActions className="border-top">
                    <Button
                        type="button"
                        onClick={onClose}
                        variant="contained"
                        startIcon={<CloseIcon />}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        startIcon={<SaveIcon />}
                    >
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ImportFile