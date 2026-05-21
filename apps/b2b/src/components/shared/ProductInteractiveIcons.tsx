"use client";

import React, { useRef, useState } from "react";
import { Heart, Volume2 } from "lucide-react";

interface ProductInteractiveIconsProps {
  productName: string;
  className?: string;
}

export default function ProductInteractiveIcons({ productName, className = "" }: ProductInteractiveIconsProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!audioRef.current) {
      // Mock audio
      audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      audioRef.current.onended = () => setIsPlaying(false);
    }
    
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    alert(`Đã thêm ${productName} vào danh sách yêu thích`);
  };

  return (
    <div className={`absolute z-30 ${className} flex flex-col items-center gap-2`}>
      {/* Action Icons */}
      <div 
        className={`flex flex-col gap-2 transition-all duration-300 origin-top
          opacity-100 md:opacity-0 group-hover:opacity-100
        `}
      >
        <button
          onClick={handleFavorite}
          className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-md text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90"
          title="Yêu thích"
        >
          <Heart className="w-4 h-4 md:w-5 md:h-5 fill-transparent hover:fill-pink-500 transition-colors" />
        </button>

        <button
          onClick={handlePlayAudio}
          className={`w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-md hover:text-blue-600 hover:bg-blue-50 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90 ${isPlaying ? 'text-blue-600 ring-2 ring-blue-300 animate-pulse' : 'text-slate-400'}`}
          title="Nghe mô tả"
        >
          <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
}
