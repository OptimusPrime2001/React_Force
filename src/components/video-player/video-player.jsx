import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import CSS của video.js

const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const determineVideoType = (url) => {
        if (url.includes('.m3u8')) {
            return 'application/x-mpegURL';
        } else if (url.includes('.mpd')) {
            return 'application/dash+xml';
        } else if (url.includes('.mp4')) {
            return 'video/mp4';
        } else if (url.includes('.webm')) {
            return 'video/webm';
        } else if (url.includes('.ogv')) {
            return 'video/ogg';
        } else {
            return 'video/mp4'; // Mặc định nếu không xác định được
        }
    };

    useEffect(() => {
        // Khởi tạo video.js
        const player = videojs(videoRef.current, {
            autoplay: true,
            controls: true,
            sources: [{ src, type: determineVideoType(src) }],
        });

        playerRef.current = player;

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
    }, [src]);

    return (
        <div>
            <div data-vjs-player style={{maxWidth: '1200px', maxHeight: "650px"}}>
                <video ref={videoRef} className="video-js vjs-default-skin" />
            </div>
        </div>
    );
};

export default VideoPlayer;