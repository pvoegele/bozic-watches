'use client';

export default function HeroVideo() {
  return (
    <video 
      autoPlay 
      loop 
      muted 
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000"
      onLoadedData={(e) => {
        (e.target as HTMLVideoElement).classList.remove('opacity-0');
        (e.target as HTMLVideoElement).classList.add('opacity-30');
      }}
      onError={(e) => {
        (e.target as HTMLVideoElement).style.display = 'none';
      }}
    >
      <source src="/Hero-video/hero-background.mp4" type="video/mp4" />
    </video>
  );
}
