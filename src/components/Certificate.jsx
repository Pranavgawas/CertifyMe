import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import certificateImage from '../assets/Certificate.png';
import Navbar from './Navbar';

function Certificate() {
  const { state } = useLocation();
  const { recipientName, event, canvasRef } = state || {};
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasContainerRef.current) {
        const canvas = canvasRef.current;
        const canvasContainer = canvasContainerRef.current;
        const containerWidth = canvasContainer.offsetWidth;
        const containerHeight = canvasContainer.offsetHeight;

        const image = new Image();
        image.src = certificateImage;

        image.onload = () => {
          const imageRatio = image.width / image.height;
          const containerRatio = containerWidth / containerHeight;

          let width, height;

          if (imageRatio > containerRatio) {
            width = containerWidth * 0.9; // 90% of container width
            height = width / imageRatio;
          } else {
            height = containerHeight * 0.9; // 90% of container height
            width = height * imageRatio;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);
          ctx.font = `${Math.floor(height / 20)}px Arial`; 
          ctx.fillStyle = 'black';
          ctx.fillText(recipientName, width * 0.3, height * 0.499); 
          ctx.font = `${Math.floor(height / 30)}px Arial`; 
          ctx.fillText(event, width * 0.5, height * 0.6); 
        };
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [recipientName, event, canvasRef]);

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'certificate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="flex justify-center">
          <div className="w-full max-w-md p-10 rounded-md text-center glass text-white">
            <h1 className="text-5xl font-bold">Hello {recipientName}</h1>
            <div>Your Certificate for {event} is here!!</div>
          </div>
        </div>
        <div
          ref={canvasContainerRef}
          className="certificate-image-container mt-8 w-full h-[80vh] flex justify-center items-center"
        >
          <canvas ref={canvasRef} className="max-w-full max-h-full" />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-outline btn-success"
            onClick={downloadCertificate}
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Certificate;