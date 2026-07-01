import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ZoomIn } from 'lucide-react';
import type { GalleryImage, ImageGalleryProps } from '@/types';
import { useTranslation } from "react-i18next";

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  layout = 'grid', 
  columns = 3 
}) => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedImages = showAll ? images : images.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getGridClasses = () => {
    const baseClass = 'grid gap-4';
    switch (columns) {
      case 1:
        return `${baseClass} grid-cols-1`;
      case 2:
        return `${baseClass} grid-cols-1 md:grid-cols-2`;
      case 3:
        return `${baseClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
      case 4:
        return `${baseClass} grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
      default:
        return `${baseClass} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
    }
  };

  if (layout === 'masonry') {
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {displayedImages.map((image) => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="break-inside-avoid mb-4 group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300">
              <img src={image.src} alt={image.alt} className="w-full h-auto object-cover" loading="lazy" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm">{image.caption}</p>
                  {image.year && (
                    <p className="text-white/60 text-xs">{image.year}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Lightbox */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="bg-black border-white/10 max-w-4xl max-h-[90vh] overflow-hidden">
            {selectedImage && (
              <div className="relative">

                <div className="relative w-full h-[80vh] flex items-center justify-center bg-black rounded-sm overflow-hidden">
                  <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-full object-contain" />
                </div>
                {selectedImage.caption && (
                  <div className="mt-4 text-center">
                    <p className="text-white">{selectedImage.caption}</p>
                    {selectedImage.year && (
                      <p className="text-white/60 text-sm">{selectedImage.year}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {!showAll && images.length > 6 && (
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
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={getGridClasses()}
    >
      {displayedImages.map((image) => (
        <motion.div
          key={image.id}
          variants={itemVariants}
          className="group cursor-pointer"
          onClick={() => setSelectedImage(image)}
        >
          <div className="relative overflow-hidden rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 lift-hover">
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Caption */}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm">{image.caption}</p>
                {image.year && (
                  <p className="text-white/60 text-xs">{image.year}</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
      
      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="bg-black border-white/10 max-w-4xl max-h-[90vh] overflow-hidden">
          {selectedImage && (
            <div className="relative">

              <div className="relative w-full h-[80vh] flex items-center justify-center bg-black rounded-sm overflow-hidden">
                <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-full object-contain" />
              </div>
              {selectedImage.caption && (
                <div className="mt-4 text-center">
                  <p className="text-white">{selectedImage.caption}</p>
                  {selectedImage.year && (
                    <p className="text-white/60 text-sm">{selectedImage.year}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {!showAll && images.length > 6 && (
        <div className="col-span-full flex justify-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="btn-secondary"
          >
            {t('jsx_view_more')}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ImageGallery;