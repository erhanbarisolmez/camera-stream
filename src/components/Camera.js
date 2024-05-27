'use client'
import React, { useRef, useState } from 'react';

export default function Camera() {
  const videoRef = useRef(null);
  const [devices, setDevices] = useState([]);

  const openCamera = async (selectedDevice) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedDevice.deviceId } });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Kamera erişim hatası:", error);
    }
  };

  const scanDevices = async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceList.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
    } catch (error) {
      console.error("Cihaz tarama hatası:", error);
    }
  };

  return (
    <>
      <h1>Kamera Açma Uygulaması</h1>
      <button onClick={scanDevices}>Cihazları Tara</button>
      <ul>
        {devices.map(device => (
          <li key={device.deviceId}>
            {device.label}
            <button onClick={() => openCamera(device)}>Kamerayı Aç</button>
          </li>
        ))}
      </ul>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
    </>
  );
}
