import React from 'react';
import { motion } from 'framer-motion';
import { useInstagramPostsSupabase } from '../hooks/useInstagramPostsSupabase';
import { InstagramEmbed } from 'react-social-media-embed';

export const InstagramSlider: React.FC = () => {
  const { posts, loading, error } = useInstagramPostsSupabase();

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-8 text-red-500 bg-red-50 rounded-lg">
        <p>Error cargando publicaciones: {error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
        <p>Aún no hay publicaciones de Instagram destacadas.</p>
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory py-4 px-2 custom-scrollbar">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          className="snap-center shrink-0 w-[328px] bg-white rounded-xl shadow-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Usamos InstagramEmbed, asumiendo que tienes react-social-media-embed instalado */}
          <InstagramEmbed url={post.url} width={328} />
        </motion.div>
      ))}
    </div>
  );
};
