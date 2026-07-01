import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import type { VideoGalleryProps } from '@/types';
import { useTranslation } from "react-i18next";

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  autoplay?: boolean;
  muted?: boolean;
  showControls?: boolean;
  className?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title,
  aspectRatio = '16:9',
  autoplay = false,
  muted = false,
  showControls = true,
  className = ''
}) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);


  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square';
      default:
        return 'aspect-video';
    }
  };

  const getYouTubeEmbedUrl = () => {
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      fs: showControls ? '1' : '0',
      controls: showControls ? '1' : '0',
      autoplay: isPlaying ? '1' : '0', // Siempre autoplay cuando isPlaying es true (cuando montamos el iframe tras clickar)
      mute: muted ? '1' : '0',
      playsinline: '1',
      loop: '0',
      playlist: videoId,
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative ${getAspectRatioClasses()} ${className}`}>
      {/* YouTube Embed */}
      {isPlaying ? (
        <div className="w-full h-full rounded-lg overflow-hidden bg-black">
          <iframe
            src={getYouTubeEmbedUrl()}
            title={title || `YouTube video ${videoId}`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Custom Mute Button (if controls are hidden) */}
          {!showControls && (
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors z-10"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      ) : (
        <div 
          className="relative w-full h-full rounded-lg overflow-hidden bg-black/50 border border-white/10 cursor-pointer group"
          onClick={handlePlayClick}
        >
          {/* Video Thumbnail Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/80">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-yellow rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow/90 transition-colors"
                >
                  <Play className="h-8 w-8 text-black ml-1" />
                </motion.div>
                <p className="text-white text-lg font-medium mb-2">
                  {title || 'Watch Video'}
                </p>
                <p className="text-white/60 text-sm">
                  {t('jsx_click_to_play_youtube')}</p>
              </div>
            </div>
          </div>

          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          
          {/* Video Info Badge */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
            {t('jsx_youtube')}</div>
        </div>
      )}
    </div>
  );
};

// VideoGallery Component
export const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const sortedVideos = [...videos].sort((a, b) => (b.year || 0) - (a.year || 0));
  const displayedVideos = showAll ? sortedVideos : sortedVideos.slice(0, 6);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedVideos.map((video) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <YouTubePlayer
            videoId={video.videoId || video.id}
            title={video.title}
            showControls={true}
          />
          <div className="text-center">
            <h3 className="text-white font-medium">{video.title}</h3>
            {video.year && (
              <p className="text-white/60 text-sm">{video.year}</p>
            )}
          </div>
        </motion.div>
      ))}
      </div>
      
      {!showAll && videos.length > 6 && (
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="btn-secondary"
          >
            {t('jsx_view_more')}
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubePlayer;