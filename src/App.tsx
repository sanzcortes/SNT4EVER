import Navigation from './components/layout/Navigation';
import HeroSection from './components/sections/HeroSection';
import TimelineSection from './components/sections/TimelineSection';
import ImageGallery from './components/sections/ImageGallery';
import { VideoGallery } from './components/sections/YouTubePlayer';
import NewsEvents from './components/sections/NewsEvents';
import SectionMarquee from '@/components/common/SectionMarquee';
import DocsSection from '@/components/sections/DocsSection';
import Footer from './components/layout/Footer';
import joinUsImg from '@/assets/images/join-us-illustration.png';
import { ARCHIVE_IMAGES, ARCHIVE_VIDEOS, SOCIAL_LINKS } from '@/constants';
import { useTranslation } from "react-i18next";
import { AdminPage } from './pages/AdminPage';


function App() {
  const { t } = useTranslation();

  const base = import.meta.env.BASE_URL;
  const path = window.location.pathname;
  
  // Normalizar las rutas (quitar barras finales para comparar fácilmente)
  const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  const normalizedBase = base.endsWith('/') && base.length > 1 ? base.slice(0, -1) : base;
  
  const adminPath = normalizedBase === '/' ? '/presi' : `${normalizedBase}/presi`;
  
  // Ruta Admin
  if (normalizedPath === adminPath) {
    return <AdminPage />;
  }

  // Si la ruta no es la base (home) ni admin, redirigir visualmente a home
  if (normalizedPath !== normalizedBase) {
    window.history.replaceState(null, '', base);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <TimelineSection />
        
        <NewsEvents />

        {/* Additional sections can be added here */}
        <section id="archive" className="scroll-mt-14 md:scroll-mt-24 bg-black">
          <SectionMarquee 
            text={t('nav.archive')} 
            className="hidden w-full bg-yellow py-1 md:py-2 mb-4 mt-24 md:mt-32 md:flex items-center overflow-hidden"
          />
          <div className="container-snt pt-24 pb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-center">
              {t('jsx_archive')}</h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              {t('jsx_explore_our_collection_of_hist')}</p>
            
            {/* Image Gallery */}
            <div className="mb-16 min-h-[500px]">
              <h3 className="text-2xl font-bold text-white mb-8">{t('jsx_photo_archive')}</h3>
              <ImageGallery 
                images={ARCHIVE_IMAGES}
                layout="masonry"
                columns={3}
              />
            </div>
            
            {/* Video Gallery */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">{t('jsx_video_archive')}</h3>
              <VideoGallery 
                videos={ARCHIVE_VIDEOS}
              />
            </div>
          </div>
        </section>

        <DocsSection />

        <section id="join" className="scroll-mt-14 md:scroll-mt-24 bg-black">
          <SectionMarquee 
            text={t('nav.join')} 
            className="hidden w-full bg-yellow py-1 md:py-2 mb-4 mt-24 md:mt-32 md:flex items-center overflow-hidden"
          />
          <div className="container-snt pb-12 md:pb-24 pt-16 md:pt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-yellow mb-8 text-left">
                  {t('jsx_join_us')}</h2>
                <p className="text-xl text-muted-foreground text-left mb-8">
                  {t('jsx_become_a_member_of_snt_and_hel')}</p>
                <div className="hidden md:block text-left">
                  <button 
                    className="btn-primary"
                    onClick={() => window.open(SOCIAL_LINKS.joinForm, '_blank')}
                  >
                    {t('jsx__nete_a_la_asociaci_n')}</button>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end w-full">
                <button 
                  onClick={() => window.open(SOCIAL_LINKS.joinForm, '_blank')}
                  className="hover:opacity-80 transition-opacity focus:outline-none cursor-pointer w-full"
                >
                  <img src={joinUsImg} alt="Join Us" className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl mx-auto" />
                </button>
                <div className="md:hidden w-full mt-8">
                  <button 
                    className="btn-primary w-full"
                    onClick={() => window.open(SOCIAL_LINKS.joinForm, '_blank')}
                  >
                    {t('jsx__nete_a_la_asociaci_n')}</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-14 md:scroll-mt-24 bg-black">
          <SectionMarquee 
            text={t('nav.contact')} 
            className="hidden w-full bg-yellow py-1 md:py-2 mb-4 mt-24 md:mt-32 md:flex items-center overflow-hidden"
          />
          <div className="container-snt">
            <h2 className="text-4xl font-bold text-yellow mb-4 text-left md:hidden pt-8">
              {t('nav.contact')}
            </h2>
            <div className="flex flex-col space-y-16 pb-12 md:pb-24 pt-4 md:pt-12">
              {/* Write us block */}
              <div>
                <h3 className="text-3xl md:text-5xl font-bold text-yellow mb-2 tracking-tight">
                  {t('jsx_write_us')}
                </h3>
                <a 
                  href="mailto:sntfor4ever@gmail.com" 
                  className="text-2xl md:text-4xl text-white border-b border-white/30 pb-1 hover:border-yellow transition-colors inline-block font-bold tracking-tight mt-2"
                >
                  sntfor4ever@gmail.com
                </a>
              </div>

              {/* Follow us block */}
              <div>
                <h3 className="text-3xl md:text-5xl font-bold text-yellow mb-2 tracking-tight">
                  {t('jsx_follow_us')}
                </h3>
                <div className="flex flex-wrap gap-x-2 gap-y-4 text-2xl md:text-4xl text-white font-bold tracking-tight mt-2">
                  <a 
                    href="https://instagram.com/snt_4_ever" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="border-b border-white/30 pb-1 hover:border-yellow transition-colors"
                  >
                    Instagram
                  </a>
                  <span>, </span>
                  <a 
                    href="https://www.youtube.com/channel/UCm_p5i8W7lzInpSbE1FVP7w" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="border-b border-white/30 pb-1 hover:border-yellow transition-colors"
                  >
                    Youtube
                  </a>
                  <span>, </span>
                  <a 
                    href="https://vimeo.com/user53492644" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="border-b border-white/30 pb-1 hover:border-yellow transition-colors"
                  >
                    Vimeo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;