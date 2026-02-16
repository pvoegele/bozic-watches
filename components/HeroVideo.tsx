'use client';

export default function HeroVideo() {
  return (
    <video 
      autoPlay 
      loop 
      muted 
      playsInline
      className="inset-0 absolute  w-full h-full object-cover opacity-80 duration-1000"
      onLoadedData={(e) => {
        (e.target as HTMLVideoElement).classList.remove('opacity-0');
        (e.target as HTMLVideoElement).classList.add('opacity-30');
      }}
      onError={(e) => {
        (e.target as HTMLVideoElement).style.display = 'none';
      }}
    >
      <source src="hero\video\3907359529-preview.mp4" type="video/mp4" />
    </video>
  );
}
