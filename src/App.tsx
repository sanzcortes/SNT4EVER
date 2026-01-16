import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import ImageGallery from './components/ImageGallery';
import { VideoGallery } from './components/YouTubePlayer';
import NewsEvents from './components/NewsEvents';
import Footer from './components/Footer';
import InstagramFeed from './components/InstagramFeed';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <TimelineSection />
        
        {/* Additional sections can be added here */}
        <section id="archive" className="section-padding bg-black">
          <div className="container-snt">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              Archive
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Explore our collection of historical photos, videos, and documents that tell the story of Sants Skate Plaza.
            </p>
            
            {/* Image Gallery */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8">Photo Archive</h3>
              <ImageGallery 
                images={[
                  { id: '1', src: '/images/archive1.jpg', alt: 'Early days of the plaza', caption: 'Original construction in 1983', year: 1983 },
                  { id: '2', src: '/images/archive2.jpg', alt: 'Skaters in the 90s', caption: 'First generation skaters', year: 1997 },
                  { id: '3', src: '/images/archive3.jpg', alt: 'Competition 2007', caption: 'International competition', year: 2007 },
                  { id: '4', src: '/images/archive4.jpg', alt: 'Plaza renovation', caption: 'Community repair efforts', year: 2018 },
                  { id: '5', src: '/images/archive5.jpg', alt: 'Recent events', caption: 'Annual skate jam', year: 2023 },
                  { id: '6', src: '/images/archive6.jpg', alt: 'Aerial view', caption: 'Plaza from above', year: 2022 },
                ]}
                layout="masonry"
                columns={3}
              />
            </div>
            
            {/* Video Gallery */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Video Archive</h3>
              <VideoGallery 
                videos={[
                  { id: 'dQw4w9WgXcQ', title: 'The Making of Sants Plaza', year: 1983 },
                  { id: 'dQw4w9WgXcQ', title: 'Barcelona Skate Scene 1997', year: 1997 },
                  { id: 'dQw4w9WgXcQ', title: 'International Skate Competition', year: 2007 },
                ]}
              />
            </div>
          </div>
        </section>

        <NewsEvents />

        <section id="instagram" className="section-padding bg-black">
          <div className="container-snt">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              Instagram Feed
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Latest updates from our community
            </p>
          </div>
        </section>
        <InstagramFeed />
        <section id="join" className="section-padding bg-black">
          <div className="container-snt">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              Join Us!
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Become a member of SNT and help us preserve the skate plaza for future generations.
            </p>
            <div className="text-center">
              <button className="btn-primary">Become a Member</button>
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding bg-gray-950">
          <div className="container-snt">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              Contact
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Get in touch with us for collaborations, donations, or any questions about the project.
            </p>
          </div>
        </section>
        
        <Footer />
        </main>
    </div>
  );
}

export default App;