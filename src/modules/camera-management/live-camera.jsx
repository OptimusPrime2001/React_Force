import React, { useState, useRef, useEffect } from 'react'
import {
    DialogContent,
    DialogTitle,
    Dialog,
    makeStyles,
    Typography,
    IconButton,
} from "@material-ui/core";
import Slide from '@material-ui/core/Slide';
import CloseIcon from "@material-ui/icons/Close";
import VideoPlayer from '../../components/video-player/video-player';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const LiveCam = (props) => {
    const classes = useStyles();
    const videoRef = useRef(null);


    const { isOpen, onClose } = props;
    const [currentVideo, setCurrentVideo] = useState();


    return (
        <div>
            <Dialog maxWidth="lg" open={isOpen} onClose={onClose} TransitionComponent={Transition}>
                <DialogTitle disableTypography className="border-bottom">
                    <Typography variant="h6">Camera</Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="pt-4 pb-4">
                    <VideoPlayer src={'https://vidsto-api.uro-solution.info/Uploads/18082024/9a9d5eff-8353-4ebe-9cb5-175b1b1517ab.mp4'} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LiveCam