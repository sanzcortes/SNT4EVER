import React from 'react';
import { motion } from 'framer-motion';
import { InstagramEmbed } from 'react-social-media-embed';
import { useTranslation } from "react-i18next";
import SectionMarquee from '@/components/common/SectionMarquee';
import { useInstagramPostsSupabase } from '@/hooks/useInstagramPostsSupabase';

const NewsEvents: React.FC = () => {
  const { t } = useTranslation();
  const { posts, loading, error } = useInstagramPostsSupabase();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="scroll-mt-14 md:scroll-mt-24 bg-black" id="news">
      <SectionMarquee
        text={t('nav.news')}
        className="hidden w-full bg-yellow py-1 md:py-2 mb-4 mt-24 md:mt-32 md:flex items-center overflow-hidden"
      />
      <div className="container-snt pt-6 md:pt-24 pb-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-yellow">
              {t('jsx_news_events')}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {t('jsx_stay_updated_with_the_latest_h')}
            </p>
          </motion.div>

          {/* Instagram Slider */}
          <div className="flex overflow-x-auto overflow-y-hidden gap-4 md:gap-6 snap-x snap-mandatory pb-8 pt-4 px-4 w-full">
            {loading ? (
              <div className="w-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow"></div>
              </div>
            ) : error ? (
              <div className="w-full text-center py-12 text-red-500">
                Error: {error}
              </div>
            ) : posts.length === 0 ? (
              <div className="w-full text-center py-12 text-muted-foreground">
                {t('jsx_no_news_available', { defaultValue: 'No hay noticias disponibles.' })}
              </div>
            ) : (
              posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "50px" }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0 snap-center"
                  style={{ zoom: 0.85 }}
                >
                  <div className="card-dark border border-white/10 transition-all duration-300 h-full p-2 rounded-xl bg-black/50 shadow-lg">
                    <div className="w-full rounded-lg overflow-hidden flex justify-center bg-white" style={{ minWidth: 328 }}>
                      <InstagramEmbed url={post.url} width={328} />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Newsletter Signup (Optional, kept from before)
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center p-8 bg-white/5 rounded-lg border border-white/10"
          >
            <h3 className="text-2xl font-bold text-yellow mb-4">
              {t('jsx_stay_connected')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('jsx_subscribe_to_our_newsletter_fo')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow transition-colors"
              />
              <button className="btn-primary">
                {t('jsx_subscribe')}
              </button>
            </div>
          </motion.div>
          */}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsEvents;