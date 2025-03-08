import React, { useState, useRef, useEffect } from 'react'
import * as orderAction from "../../redux/store/order/order.store";
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
import { NotificationMessageType, APIUrlDefault } from "../../utils/configuration";
import Slide from '@material-ui/core/Slide';
import CloseIcon from "@material-ui/icons/Close";
import dateformat from "dateformat";
import {  useNavigate, useParams } from "react-router-dom";

import './video.scss';

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


const VideoView = (props) => {
    const classes = useStyles();
    const videoRef = useRef(null);
    const navigate = useNavigate();
    // const {orderCode} = props.match.params;
    const { orderCode } = useParams();


    const [currentVideo, setCurrentVideo] = useState();
    const [listData, setListData] = useState([])

    useEffect(() => {
        orderCode && getListVideoByCode(orderCode);
    }, [])

    const getListVideoByCode = (code) => {
        orderAction.GetAllVideo({ pageIndex: 1, pageSize: 100, code: code }).then(res => {
            if (res && res.content && res.content.items && res.content.items.length > 0) {
                setListData(res.content.items)
                setCurrentVideo(res.content.items[0])
            } else {
                setListData([])
            }
        }).catch(err => {
        })
    }

    const getListSmallVideo = (id) => {
        return listData.map(x => `${x.id}` !== `${id}`)
    }

    useEffect(() => {
        if (currentVideo) {
            renderVideo();
        }
    }, [currentVideo])

    const renderVideo = () => {
        return (
            <div>
                <video key={currentVideo.id} width="100%" style={{ maxHeight: '460px', borderRadius: '5px' }} controls>
                    <source src={APIUrlDefault + currentVideo.videoPath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className='mt-3'>
                    <span style={{ fontSize: '14px', color: '#4b4b4b' }}>
                        {dateformat(currentVideo.created_date, "dd/mm/yyyy - HH:MM:ss", true)}
                    </span>
                    <h4 style={{ fontWeight: '500' }}>
                        {`Camera Code - ${currentVideo.cameraCode}`}
                    </h4>
                </div>
            </div>
        )
    }

    const handleClose = () => {
        navigate(-1)
    }

    return (
        <div>
            <Dialog fullScreen open={true} onClose={handleClose} TransitionComponent={Transition}>
                <DialogTitle disableTypography className="border-bottom">
                    <Typography variant="h6">Video</Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="pt-4 pb-2">
                    <div className='container'>
                        <div className='row'>
                            {listData && listData.length > 0 && currentVideo ? (
                                <>
                                    <div className='col-md-8'>
                                        {renderVideo()}
                                    </div>
                                    <div className='col-md-4'>
                                        {listData.map((item) => {
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`video_items mb-3 ${item.id == currentVideo.id ? 'active' : ''}`}
                                                    onClick={() => setCurrentVideo(item)}
                                                >
                                                    <div className='video_item'>
                                                        <video
                                                            src={APIUrlDefault + item.videoPath}
                                                            style={{ width: '100%' }}
                                                        />
                                                    </div>
                                                    <div className='video_text'>
                                                        <span style={{ fontWeight: '500' }}>
                                                            {`Camera - ${item.cameraCode}`}
                                                        </span><br />
                                                        <span style={{ fontSize: '12px', color: '#4b4b4b' }}>
                                                            {dateformat(item.created_date, "dd/mm/yyyy - HH:MM:ss", true)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            ): (
                                <div>Chưa có video!</div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default VideoView