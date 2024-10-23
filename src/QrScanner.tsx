import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';
import { getIdClient } from './Store';

// Definimos las props que va a recibir QrScanner, incluyendo onScan
interface QrScannerProps {
  onScan: (data: string | null) => void; // Función que se llamará al escanear un QR
}

const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const startVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          video.play();

          const scan = () => {
            const canvas = canvasRef.current;

            if (canvas && scanning) {
              const context = canvas.getContext('2d');
              if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);

                if (code) {
                  onScan(code.data); // Llamamos a la función onScan con el resultado
                  setScanning(false); // Detenemos el escaneo
                  console.log(code.data)
                if(code.data){
                  const url = new URL(code.data);
                  const idString: string | null = url.searchParams.get('id');
                  const idNumber: number | null = idString ? Number(idString) : null;
                  if(idNumber===getIdClient()){
                    console.log("si es igual")
                    verification(code.data)
                  }
                }
                  stopCamera(); // Detenemos la cámara
                }
              }
            }
            if (scanning) {
              requestAnimationFrame(scan);
            }
          };

          requestAnimationFrame(scan);
        } catch (error) {
          console.error('Error al acceder a la cámara: ', error);
        }
      };

      const stopCamera = () => {
        if (video.srcObject instanceof MediaStream) {
          const tracks = video.srcObject.getTracks();
          tracks.forEach(track => track.stop()); // Detener la cámara
          video.srcObject = null; // Limpiar la referencia al stream de video
        }
      };

      startVideo();

      return () => {
        setScanning(false);
        stopCamera();
      };
    }
  }, [scanning, onScan]);

  const verification = async (apiUrl: string) => {
    try {
      const response = await fetch(apiUrl);
      
      // Verificamos que la respuesta sea exitosa
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} width={300} height={300} />
    </div>
  );
};

export default QrScanner;




/*

  
                */