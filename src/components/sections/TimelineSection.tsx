import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize2 } from 'lucide-react';
import TimelineStepper from '@/components/common/TimelineStepper';
import SectionMarquee from '@/components/common/SectionMarquee';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { TIMELINE_EVENTS } from '@/constants';
import { useTranslation } from "react-i18next";
import { useTimelinePostsSupabase } from '@/hooks/useTimelinePostsSupabase';
import type { TimelineEvent } from '@/types';

const TimelineSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [visibleYears, setVisibleYears] = useState<Set<number>>(new Set([1983]));

  const { posts } = useTimelinePostsSupabase();

  // Mapear los posts dinámicos a la estructura de TimelineEvent
  const dynamicEvents: TimelineEvent[] = posts.map(post => {
    let localizedTitle = post.title;
    let localizedContent = post.content;

    if (currentLang.startsWith('en')) {
      localizedTitle = post.title_en || post.title;
      localizedContent = post.content_en || post.content;
    } else if (currentLang.startsWith('ca')) {
      localizedTitle = post.title_ca || post.title;
      localizedContent = post.content_ca || post.content;
    }

    return {
      year: post.year,
      title: localizedTitle,
      content: localizedContent,
      type: post.media_type === 'video' ? 'video' : post.media_type === 'image' ? 'gallery' : 'history',
      videoId: post.media_type === 'video' ? post.media_url : undefined,
      image: post.media_type === 'image' ? post.media_url : undefined,
    };
  });

  // Combinar estáticos y dinámicos, y ordenarlos por año
  const allEvents = [...TIMELINE_EVENTS, ...dynamicEvents].sort((a, b) => {
    return parseInt(a.year) - parseInt(b.year);
  });

  const timelineEvents = allEvents;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const eventElements = document.querySelectorAll('[data-timeline-year]');
      let closestYear: number | null = null;
      let closestDistance = Infinity;
      const windowTarget = window.innerHeight * 0.4;

      eventElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const year = parseInt(element.getAttribute('data-timeline-year') || '0');

        // Mark year as visible if it's in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisibleYears(prev => new Set(prev).add(year));

          if (rect.top <= windowTarget && rect.bottom >= windowTarget) {
            closestYear = year;
            closestDistance = 0;
          } else if (closestDistance !== 0) {
            const distance = rect.top > windowTarget ? rect.top - windowTarget : windowTarget - rect.bottom;
            if (distance < closestDistance) {
              closestDistance = distance;
              closestYear = year;
            }
          }
        }
      });

      if (closestYear !== null) {
        setActiveYear(closestYear);
      } else {
        setActiveYear(null);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prepare timeline stepper data
  const timelineStepperData = timelineEvents.reduce((acc: { year: number, title: string, subtitle: string, isComplete: boolean }[], event) => {
    const year = parseInt(event.year);
    if (!acc.find(item => item.year === year)) {
      acc.push({
        year,
        title: event.title,
        subtitle: event.type === 'gallery' ? `${event.images?.length || 0} photos` :
          event.type === 'video' ? 'Video content' :
            event.type === 'events' ? `${event.events?.length || 0} events` :
              'Historical content',
        isComplete: visibleYears.has(year)
      });
    }
    return acc;
  }, []);
  return (
    <section className="scroll-mt-14 md:scroll-mt-24 bg-black" id="story">
      <SectionMarquee
        text={t('jsx_nuestra_historia')}
        className="hidden w-full bg-yellow py-1 md:py-2 mb-4 mt-24 md:mt-32 md:flex items-center overflow-hidden"
      />
      <div className="container-snt pt-6 md:pt-24 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-left md:text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-yellow">
              {t('jsx_nuestra_historia')}</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {t('jsx_desde_la_visi_n_arquitect_nica')}</p>
          </motion.div>

          {/* Timeline Stepper */}
          <motion.div
            variants={itemVariants}
            className="mb-16 sticky top-14 md:top-24 z-40"
          >
            <TimelineStepper
              years={timelineStepperData}
              activeYear={activeYear}
              onYearChange={setActiveYear}
            />
          </motion.div>

          {/* Timeline Events */}
          <div className="space-y-12 lg:space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={`${event.year}-${index}`}
                data-timeline-year={event.year}
                variants={itemVariants}
                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Year Display */}
                <div className="lg:w-1/4">
                  <div className="text-center lg:text-right">
                    <motion.span
                      className={`text-6xl md:text-7xl lg:text-8xl font-bold transition-colors duration-500 ${activeYear === parseInt(event.year)
                          ? 'text-yellow animate-year-glow'
                          : 'text-yellow/20'
                        }`}
                      initial={{ opacity: 0.6, scale: 0.8 }}
                      animate={{
                        opacity: activeYear === parseInt(event.year) ? 1 : 0.6,
                        scale: activeYear === parseInt(event.year) ? 1 : 0.8
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                    >
                      {event.year}
                    </motion.span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-3/4">
                  <Card className="card-dark border-white/10 overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                      {/* Header */}
                      <div className="mb-6 md:mb-10 text-center md:text-left">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          className="hidden lg:inline-block px-4 py-2 bg-yellow text-black font-bold rounded-full mb-4 md:mb-6 text-sm md:text-base shadow-lg shadow-yellow/20"
                        >
                          {event.year}
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                          {t(`timeline.${event.year}.title`, { defaultValue: event.title })}
                        </h3>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                          {t(`timeline.${event.year}.content`, { defaultValue: event.content })}
                        </p>
                      </div>

                      {/* Video Content */}
                      {event.videoId && (
                        <div className="aspect-video mb-8 rounded-lg overflow-hidden bg-black/50">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${event.videoId}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen></iframe>
                        </div>
                      )}

                      {/* Gallery Content */}
                      {event.images && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          {event.images.map((_, imgIndex) => (
                            <Dialog key={imgIndex}>
                              <DialogTrigger asChild>
                                <div className="group relative aspect-square bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer overflow-hidden">
                                  <img
                                    src={event.images![imgIndex]}
                                    alt={`Image ${imgIndex + 1} for ${event.title}`}
                                    className="object-cover w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                                    <Maximize2 className="text-white w-8 h-8" />
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl p-1 bg-black/90 border-white/10">
                                <div className="relative w-full h-[80vh] flex items-center justify-center bg-black rounded-sm overflow-hidden">
                                  <img
                                    src={event.images![imgIndex]}
                                    alt={`Enlarged image ${imgIndex + 1} for ${event.title}`}
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>
                      )}

                      {/* Single Image Content */}
                      {event.image && (
                        <div className="mb-8">
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className="group relative w-full bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer overflow-hidden">
                                <img
                                  src={event.image}
                                  alt={`Image for ${event.title}`}
                                  className="object-cover w-full max-h-[400px] rounded-lg transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                                  <Maximize2 className="text-white w-8 h-8" />
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-1 bg-black/90 border-white/10">
                              <div className="relative w-full h-[80vh] flex items-center justify-center bg-black rounded-sm overflow-hidden">
                                <img
                                  src={event.image}
                                  alt={`Enlarged image for ${event.title}`}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}

                      {/* Events List */}
                      {event.type === 'events' && event.events && (
                        <div className="bg-black/50 rounded-xl p-4 md:p-6 lg:p-8 border border-white/10 backdrop-blur-sm h-full flex flex-col justify-center mb-8">
                          <h4 className="text-xl md:text-2xl font-bold text-yellow mb-4 md:mb-6">
                            {t('jsx_key_moments', { defaultValue: 'Momentos Clave' })}
                          </h4>
                          <ul className="space-y-3 md:space-y-4">
                            {event.events.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start text-white/80 group text-sm md:text-base"
                              >
                                <span className="text-yellow mr-3 md:mr-4 mt-1 group-hover:scale-125 transition-transform">
                                  ✦
                                </span>
                                <span className="leading-relaxed">
                                  {t(`timeline.${event.year}.events.${i}`, { defaultValue: item })}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        variant="outline"
                        size="lg"
                        className="btn-secondary"
                        onClick={() => window.open('#archive', '_self')}
                      >
                        {t('jsx_view_archive')}</Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;