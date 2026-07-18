import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, ArrowDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Marquee from '@/components/common/Marquee';
import { NAVIGATION_ITEMS } from '@/constants';
import { useScrollSpy } from '@/hooks';
import logo from '@/assets/images/ICON-SNT-HEADER.png';
import { LanguageSelector } from '@/components/common/LanguageSelector';

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProjectLink, setShowProjectLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const storyElement = document.getElementById('story');
      if (storyElement) {
        const rect = storyElement.getBoundingClientRect();
        // Show "The project" link as soon as we enter "Our story" (when its top crosses the lower-middle of the screen)
        setShowProjectLink(rect.top <= window.innerHeight * 0.6);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionIds = ['hero', ...NAVIGATION_ITEMS.map(item => item.id)];
  const activeSection = useScrollSpy(sectionIds, { rootMargin: '-20% 0px -20% 0px' });

  const getMarqueeText = () => {
    return t(`nav.${activeSection || 'hero'}`);
  };

  const marqueeText = getMarqueeText();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();

      if (isOpen) {
        setIsOpen(false);
      }

      const scrollToTarget = () => {
        const target = document.querySelector(href) as HTMLElement;
        if (!target) return;

        const headerOffset = window.innerWidth >= 768 ? 96 : 56;

        // Native scrollIntoView handles standard cases and some layout shifts
        target.scrollIntoView({ behavior: 'smooth' });

        // Fallback observer: continuously adjust scroll position for 800ms
        // This guarantees we arrive at the right spot even if heavy images/animations 
        // cause massive layout shifts during the scroll.
        let attempts = 0;
        const checkInterval = setInterval(() => {
          const rect = target.getBoundingClientRect();
          // If we are more than 5px away from the desired offset, adjust
          if (Math.abs(rect.top - headerOffset) > 5) {
            window.scrollBy({ top: rect.top - headerOffset, behavior: 'auto' });
          }

          attempts++;
          if (attempts > 16) { // 16 * 50ms = 800ms (duration of smooth scroll)
            clearInterval(checkInterval);
          }
        }, 50);

        // Update URL
        if (window.location.hash !== href) {
          window.history.pushState(null, '', href);
        }
      };

      if (isOpen) {
        setTimeout(scrollToTarget, 300);
      } else {
        scrollToTarget();
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 md:bg-black ${isScrolled ? 'md:bg-opacity-100' : 'md:bg-opacity-75'} bg-yellow font-mono`}>
      <nav className="w-full px-12 h-24 hidden md:flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={logo} alt="SNT4EVER Logo" className="h-20" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          {NAVIGATION_ITEMS.map((item) => {
            // Hide "The project" on desktop if we haven't scrolled past "Our story"
            if (item.id === 'hero' && !showProjectLink) {
              return null;
            }

            return (
              <a
                key={item.id}
                href={item.href}
                className={`${activeSection === item.id
                  ? 'text-yellow font-bold hover:text-yellow/80'
                  : 'text-white hover:text-gray-300'
                  } transition-colors cursor-pointer whitespace-nowrap`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {t(`nav.${item.id}`)}
              </a>
            );
          })}
          <LanguageSelector />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between h-14 w-full relative overflow-hidden border-b-2 border-black">
        <div className="flex-1 overflow-hidden h-full flex items-center">
          <Marquee speed="slow" direction="right" pauseOnHover={false}>
            {Array(10).fill(null).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-3 text-black font-bold text-3xl shrink-0 whitespace-nowrap leading-none tracking-tight">
                {marqueeText}
                <ArrowDown className="h-6 w-6" strokeWidth={3} />
              </span>
            ))}
          </Marquee>
        </div>

        <div className="h-14 w-14 bg-black flex-shrink-0 flex items-center justify-center z-10 border-l-2 border-black">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center justify-center w-full h-full text-yellow hover:text-white transition-colors focus:outline-none">
                <Plus className="h-8 w-8" strokeWidth={3} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black border-white/10 text-white flex flex-col h-full"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <div className="flex flex-col space-y-6 mt-8">
                {[...NAVIGATION_ITEMS].sort((a, b) => (a.isSpecial ? 1 : 0) - (b.isSpecial ? 1 : 0)).map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`text-4xl font-medium transition-all duration-300 relative cursor-pointer ${item.isSpecial
                      ? 'bg-yellow text-black px-3 py-2 rounded-lg text-center'
                      : activeSection === item.id
                        ? 'text-yellow font-semibold'
                        : 'text-white hover:text-yellow'
                      }`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {/* Active indicator */}
                    {activeSection === item.id && !item.isSpecial && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yellow rounded-full" />
                    )}
                    {t(`nav.${item.id}`)}
                  </a>
                ))}
              </div>

              <div className="mt-auto flex justify-center items-center gap-4 pb-2 text-sm font-sans">
                <button
                  onClick={() => i18n.changeLanguage('ca')}
                  className={`transition-colors ${i18n.language?.startsWith('ca') ? 'text-yellow font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  Català
                </button>
                <span className="text-gray-600">-</span>
                <button
                  onClick={() => i18n.changeLanguage('es')}
                  className={`transition-colors ${i18n.language?.startsWith('es') ? 'text-yellow font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  Español
                </button>
                <span className="text-gray-600">-</span>
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`transition-colors ${i18n.language?.startsWith('en') ? 'text-yellow font-bold' : 'text-gray-400 hover:text-white'}`}
                >
                  English
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;