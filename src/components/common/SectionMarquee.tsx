import React from 'react';
import { ArrowDown } from 'lucide-react';
import Marquee from '@/components/common/Marquee';

interface SectionMarqueeProps {
  text: string;
  className?: string;
}

const SectionMarquee: React.FC<SectionMarqueeProps> = ({ 
  text, 
  className = "hidden w-full bg-yellow py-1 md:py-2 mb-16 mt-8 md:mt-12 md:flex items-center overflow-hidden" 
}) => {
  const renderMarqueeItem = (index: number) => (
    <span key={index} className="inline-flex items-center gap-4 mx-4 text-black font-bold text-5xl md:text-6xl lg:text-6xl shrink-0 whitespace-nowrap leading-none tracking-tight">
      {text}
      <ArrowDown className="h-12 w-12 md:h-16 md:w-16 lg:h-18 lg:w-18" strokeWidth={3} />
    </span>
  );

  return (
    <div className={className}>
      <Marquee speed="slow" direction="right" pauseOnHover={false}>
        {Array(10).fill(null).map((_, i) => renderMarqueeItem(i))}
      </Marquee>
    </div>
  );
};

export default SectionMarquee;
