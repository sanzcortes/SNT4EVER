// YouTube API service
export const youtubeService = {
  getVideoEmbedUrl: (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  },

  getVideoThumbnailUrl: (videoId: string, quality: 'default' | 'medium' | 'high' = 'medium'): string => {
    const qualityMap = {
      default: 'default',
      medium: 'mqdefault',
      high: 'hqdefault'
    };
    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
  },

  validateVideoId: (videoId: string): boolean => {
    // Basic YouTube video ID validation
    const youtubeRegex = /^[a-zA-Z0-9_-]{11}$/;
    return youtubeRegex.test(videoId);
  }
};

// Image service
export const imageService = {
  preloadImage: (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },

  preloadImages: (srcs: string[]): Promise<HTMLImageElement[]> => {
    return Promise.all(srcs.map(src => imageService.preloadImage(src)));
  }
};

// Analytics service (placeholder)
export const analyticsService = {
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
    // Placeholder for analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) gtag('event', eventName, properties);
    }
  },

  trackPageView: (page: string) => {
    // Placeholder for page view tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: page,
        });
      }
    }
  }
};