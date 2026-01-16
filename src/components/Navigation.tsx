import { useState } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'The plans', href: '#plans' },
    { label: 'Our story', href: '#story' },
    { label: 'Archive', href: '#archive' },
    { label: 'News/Events', href: '#news' },
    { label: 'Instagram', href: '#instagram' },
    { label: 'Docs', href: '#docs' },
    { label: 'Join us!', href: '#join' },
    { label: 'Contact', href: '#contact' },
    { label: 'Shop', href: '#shop', isSpecial: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <nav className="container-snt h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-yellow rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">SNT</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link text-sm ${
                item.isSpecial ? 'bg-yellow text-black px-3 py-1 rounded-full hover:bg-yellow/90' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon */}
          <Button variant="ghost" size="icon" className="text-white hover:text-yellow">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          {/* Hamburger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-yellow">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-white/10 text-white">
              <div className="flex flex-col space-y-6 mt-8">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`text-lg font-medium hover:text-yellow transition-colors ${
                      item.isSpecial ? 'bg-yellow text-black px-3 py-2 rounded-lg text-center' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                
                {/* Language Toggle */}
                <div className="pt-4 border-t border-white/10">
                  <button className="text-sm text-muted-foreground hover:text-yellow transition-colors">
                    English
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;