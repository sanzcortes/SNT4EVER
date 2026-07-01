import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast' | 'superfast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 'fast',
  direction = 'left',
  pauseOnHover = true,
  className = ''
}) => {
  // Velocity-based animation: pixels per second
  const getPixelsPerSecond = () => {
    switch (speed) {
      case 'slow':
        return 50; // pixels per second
      case 'fast':
        return 500; // pixels per second
      default:
        return 100; // pixels per second
    }
  };

  // Calculate duration based on distance (100vw) and velocity
  const getDuration = () => {
    const pixelsPerSecond = getPixelsPerSecond();
    const distancePercentage = 100; // moving 100% of width
    // Assuming ~1920px at 100%, adjust based on typical viewport
    const estimatedPixels = (distancePercentage / 100) * 1920;
    return estimatedPixels / pixelsPerSecond;
  };

  const getAnimationDirection = () => {
    return direction === 'left' ? ["0%", "-33.333333%"] : ["-33.333333%", "0%"];
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap w-max"
        initial={{
          x: direction === 'left' ? "0%" : "-33.333333%",
        }}
        animate={{
          x: getAnimationDirection(),
        }}
        transition={{
          duration: getDuration(),
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
      >
        {/* Triple the content for seamless loop, especially at fast speeds */}
        <div className="inline-block">{children}</div>
        <div className="inline-block">{children}</div>
        <div className="inline-block">{children}</div>
      </motion.div>
    </div>
  );
};

export default Marquee;