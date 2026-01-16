import React, { useState } from 'react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Heart, Share2, Calendar, Camera } from 'lucide-react';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
  isVideo?: boolean;
}

interface InstagramResponse {
  data: InstagramPost[];
  hasMore?: boolean;
}

const mockInstagramData: InstagramResponse = {
  data: [
    {
      id: '1',
      imageUrl: 'https://picsum.photos/seed/snt4ever/800/600.jpg?random=1',
      caption: 'New skate plaza design proposal 🛹✨ Working with local council to make our dream a reality! The future looks bright for our community space. #SNT4EVER #SkateLife #Barcelona #CommunityFirst 📸',
      timestamp: '2025-01-15T10:30:00Z',
      likes: 127,
      comments: 23,
      isVideo: false
    },
    {
      id: '2', 
      imageUrl: 'https://picsum.photos/seed/snt4ever/800/600.jpg?random=2',
      caption: 'Throwback Thursday! Remember when this was just concrete and dreams? Look how far we\'ve come together! 🛹📸 10 years of preserving our culture. #SNT4EVER #SkateHistory #CommunityLove 📍',
      timestamp: '2025-01-12T14:15:00Z',
      likes: 89,
      comments: 15,
      isVideo: false
    },
    {
      id: '3',
      imageUrl: 'https://picsum.photos/seed/snt4ever/800/600.jpg?random=3',
      caption: 'Big news coming soon! 🤫 Excited to share our next project with everyone who has supported us on this journey. Stay tuned for updates! #SNT4EVER #ComingSoon #SkateCommunity 🚀',
      timestamp: '2025-01-10T09:45:00Z', 
      likes: 156,
      comments: 32,
      isVideo: false
    },
    {
      id: '4',
      caption: 'Session this Saturday! Join us for some tricks and good vibes. All skill levels welcome! 🛹🎵 Free entry for all skateboarders. #SNT4EVER #SkateSession #CommunityEvent 🛹',
      timestamp: '2025-01-18T16:00:00Z',
      likes: 45,
      comments: 8,
      isVideo: true
    },
    {
      id: '5',
      imageUrl: 'https://picsum.photos/seed/snt4ever/800/600.jpg?random=4',
      caption: 'Maintenance day success! ✨ Thanks to everyone who showed up today to help keep our plaza clean and beautiful. Community power in action! 💪 #SNT4EVER #CommunityLove #VolunteerAppreciation 🧹',
      timestamp: '2025-01-14T11:30:00Z',
      likes: 203,
      comments: 41,
      isVideo: false
    }
  ],
  hasMore: false
};

const InstagramFeed: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(mockInstagramData.data);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      // In real implementation, this would fetch more data
      setPosts(prev => [...prev, ...mockInstagramData.data]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow mb-2">Instagram Feed</h1>
          <p className="text-muted-foreground">Latest updates from our community</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow border-r-transparent border-l-transparent"></div>
          </div>
        )}

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg overflow-hidden border border border-gray-800 hover:border-yellow transition-all duration-300"
            >
              {/* Post Image */}
              <div className="relative aspect-square">
                {post.imageUrl ? (
                  <img 
                    src={post.imageUrl} 
                    alt={post.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : post.isVideo ? (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="w-16 h-16 bg-yellow/20 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-black" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                
                {/* Instagram Icon Overlay */}
                <div className="absolute top-4 left-4 bg-black/70 p-2 rounded-full">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                {/* Actions */}
                <div className="flex justify-between items-start mb-3">
                  <button className="flex items-center gap-2 text-white hover:text-yellow transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-white hover:text-yellow transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-white hover:text-yellow transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Caption */}
                <p className="text-white text-sm leading-relaxed">
                  {post.caption}
                </p>

                {/* Timestamp */}
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.timestamp).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</span>
                </div>
              </div>

              {/* Video Badge */}
              {post.isVideo && (
                <div className="absolute top-4 right-4 bg-yellow text-black px-3 py-1 rounded-full text-xs font-bold">
                  VIDEO
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {!loading && posts.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="flex items-center gap-2 bg-yellow text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow/90 transition-colors"
            >
              Load More Posts
            </button>
          </div>
        )}

        {/* Load More Spinner */}
        {loading && posts.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-yellow border-r-transparent border-l-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramFeed;