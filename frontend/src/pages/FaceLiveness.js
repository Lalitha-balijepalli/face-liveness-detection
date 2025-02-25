import React, { useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs';

const FaceLiveness = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isLive, setIsLive] = useState(false);
    
    useEffect(() => {
        const startVideo = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        };

        const detectFace = async () => {
            const model = await blazeface.load();
            const ctx = canvasRef.current.getContext('2d');

            setInterval(async () => {
                if (videoRef.current && canvasRef.current) {
                    const faces = await model.estimateFaces(videoRef.current, false);
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                    
                    if (faces.length > 0) {
                        setIsLive(true);
                        faces.forEach(face => {
                            ctx.strokeStyle = "green";
                            ctx.lineWidth = 2;
                            ctx.strokeRect(face.topLeft[0], face.topLeft[1], 
                                           face.bottomRight[0] - face.topLeft[0], 
                                           face.bottomRight[1] - face.topLeft[1]);
                        });
                    } else {
                        setIsLive(false);
                    }
                }
            }, 500);
        };

        startVideo().then(detectFace);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Face Liveness Detection</h2>
            <video ref={videoRef} autoPlay playsInline className="hidden" />
            <canvas ref={canvasRef} width={640} height={480} className="border rounded" />
            <p className={`mt-4 p-2 text-white ${isLive ? 'bg-green-500' : 'bg-red-500'}`}>
                {isLive ? "Live Face Detected ✅" : "No Face Detected ❌"}
            </p>
        </div>
    );
};

export default FaceLiveness;
