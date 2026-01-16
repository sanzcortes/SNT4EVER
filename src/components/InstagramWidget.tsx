import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Loader2, RefreshCw } from 'lucide-react';

interface InstagramPost {
  id: string;
  display_url: string;
  caption: string;
  taken_at: string;
  like_count: number;
  comment_count: number;
  video_url?: string;
  media_type: 'IMAGE' | 'VIDEO';
  owner: {
    username: string;
    profile_pic_url: string;
  };
}

interface InstagramAPIResponse {
  data: InstagramPost[];
  paging?: {
    has_next?: boolean;
    end_cursor?: string;
  };
}

const INSTAGRAM_API_URL = 'https://n548565f23b03f8-dot-2-dot-1-dot-api.instagrapi.com/v1/users/snt_4_ever/media';

const InstagramWidget: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${INSTAGRAM_API_URL}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.VITE_INSTAGRAM_API_KEY || '',
          'X-RapidAPI-Host': 'www.instagram.com',
        },
      });

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
      }

      const data: InstagramAPIResponse = await response.json();
      
      if (data.data && data.data.length > 0) {
        setPosts(data.data);
      } else {
        setError('No posts found on Instagram');
      }
    } catch (err) {
      console.error('Instagram fetch error:', err);
      setError('Failed to fetch Instagram posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow mb-4">Instagram Feed</h2>
          <p className="text-muted-foreground">
            Latest updates from our community
            {error && (
              <p className="text-red-400 mt-2">{error}</p>
            )}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-400/20 border border-red-400 rounded-lg p-6 text-center">
            <RefreshCw className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-100">Instagram API Error</h3>
            <p className="text-white">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading Instagram posts...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-yellow transition-all duration-300"
              >
                <a 
                  href={`https://www.instagram.com/p/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {post.media_type === 'VIDEO' ? (
                    <div className="relative aspect-[9/16] bg-black">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-yellow/20 rounded-full flex items-center justify-center">
                          <Camera className="w-8 h-8 text-black" />
                        </div>
                      </div>
                      {post.video_url && (
                        <video 
                          className="absolute inset-0 w-full h-full object-cover"
                          controls
                          muted
                        />
                      )}
                    </div>
                  ) : (
                    <div className="aspect-square bg-gray-800">
                      <img 
                        src={post.display_url} 
                        alt={post.caption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                </a>

                {/* Instagram UI Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-black" />
                      </div>
                      <div className="text-white">
                        <p className="font-semibold">snt_4_ever</p>
                        <p className="text-sm text-white/80">@snt_4_ever</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="text-white hover:text-yellow transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <span className="text-white font-semibold">{post.like_count}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="text-white hover:text-yellow transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <span className="text-white font-semibold">{post.comment_count}</span>
                    </div>
                  </div>
                </div>

                {/* Caption and Timestamp */}
                <div className="p-4 bg-black/80 backdrop-blur-sm">
                  <p className="text-white text-sm mb-2">{post.caption}</p>
                  <p className="text-white/60 text-xs">
                    {new Date(post.taken_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Instagram className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl text-white mb-4">No Instagram Posts Found</h3>
            <p className="text-muted-foreground">
              Make sure the Instagram API is configured correctly.
            </p>
          </div>
        )}

        {/* API Info */}
        {!loading && !error && (
          <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-yellow mb-2">API Information</h3>
            <p className="text-sm text-white mb-2">
              Using RapidAPI to fetch posts from @snt_4_ever
            </p>
            <p className="text-xs text-white/60">
              {posts.length} posts loaded
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InstagramWidget;