'use client';

import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      video.classList.remove('opacity-0');
      video.classList.add('opacity-30');
    };

    const handleError = () => {
      video.style.display = 'none';
    };

    // If video is already loaded, apply opacity immediately
    // readyState >= HAVE_FUTURE_DATA (3) means enough data is available to start playing
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      handleLoadedData();
    }

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <video 
      ref={videoRef}
      autoPlay 
      loop 
      muted 
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000"
    >
      <source src="/hero/video/hero_video.mp4" type="video/mp4" />
    </video>
  );
}
