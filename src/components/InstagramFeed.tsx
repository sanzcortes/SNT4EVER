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
      imageUrl: '',
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

        {/* Instagram Widget */}
        <InstagramWidget />
      </div>
    </div>
  );

export default InstagramFeed;