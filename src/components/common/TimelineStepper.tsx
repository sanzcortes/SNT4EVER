import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface TimelineYear {
  year: number;
  title: string;
  subtitle?: string;
  isComplete: boolean;
}

interface TimelineStepperProps {
  years: TimelineYear[];
  activeYear: number | null;
  onYearChange?: (year: number) => void;
}

const TimelineStepper: React.FC<TimelineStepperProps> = ({ 
  years, 
  activeYear, 
  onYearChange 
}) => {
  const { t } = useTranslation();

  const handleYearClick = (year: number) => {
    onYearChange?.(year);

    const eventElements = Array.from(document.querySelectorAll('[data-timeline-year]'));
    const targetElement = eventElements.find(el => el.getAttribute('data-timeline-year') === year.toString());

    if (targetElement) {
      const isDesktop = window.innerWidth >= 768;
      const headerOffset = isDesktop ? 96 : 56;
      const totalOffset = headerOffset + 100; // rough stepper height

      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - totalOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full bg-black/95 backdrop-blur-md border-b border-white/10 rounded-xl overflow-hidden shadow-2xl relative z-40">
      <div className="container-snt py-2 px-0  md:py-3">

        {/* Horizontal Year Navigation */}
        <div className="relative">
          {years.length > 0 ? (
            <>
              {/* Desktop: Clean dropdown selector */}
              <div className="hidden md:block">
                <div className="flex items-center gap-4">
                  <Select
                    value={(activeYear || years[0]?.year || '').toString()}
                    onValueChange={(val) => handleYearClick(parseInt(val))}
                  >
                    <SelectTrigger className="flex-1 h-12 bg-black border-2 border-yellow rounded-lg px-4 text-white text-base focus:ring-1 focus:ring-yellow transition-colors">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-2 border-yellow text-white">
                      {years.map((yearData) => (
                        <SelectItem
                          key={yearData.year}
                          value={yearData.year.toString()}
                          className="focus:bg-yellow focus:text-black cursor-pointer pl-3"
                        >
                          {yearData.year} - {t(`timeline.${yearData.year}.title`, { defaultValue: yearData.title })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() => {
                      const currentIndex = years.findIndex(y => y.year === (activeYear || years[0]?.year));
                      const nextIndex = (currentIndex + 1) % years.length;
                      handleYearClick(years[nextIndex].year);
                    }}
                    className="bg-yellow text-black hover:bg-yellow/90 px-4 h-12"
                  >
                    {t('jsx_next')}</Button>
                </div>

                {/* Desktop year indicators */}
                <div className="flex justify-between mt-4 px-1">
                  {years.map((yearData) => {
                    const isActive = yearData.year === activeYear;
                    const isCompleted = yearData.isComplete;

                    return (
                      <div key={yearData.year} className="flex flex-col items-center gap-2">
                        <button
                          onClick={() => handleYearClick(yearData.year)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${isActive
                            ? 'bg-yellow shadow-lg shadow-yellow/50'
                            : isCompleted
                              ? 'bg-green-500/50 hover:bg-green-500/70'
                              : 'bg-white/20 hover:bg-white/30'
                            }`}
                          aria-label={`Go to ${yearData.year}`}
                        />
                        <span className={`text-xs transition-colors ${isActive
                          ? 'text-yellow font-bold'
                          : 'text-white/40'
                          }`}>
                          {yearData.year.toString().slice(-2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: Vertical dropdown */}
              <div className="md:hidden">
                <div className="flex items-center gap-2">
                  <Select
                    value={(activeYear || years[0]?.year || '').toString()}
                    onValueChange={(val) => handleYearClick(parseInt(val))}
                  >
                    <SelectTrigger className="flex-1 h-10 bg-black border-2 border-yellow rounded-lg px-3 text-white text-sm focus:ring-1 focus:ring-yellow transition-colors">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-2 border-yellow text-white">
                      {years.map((yearData) => (
                        <SelectItem
                          key={yearData.year}
                          value={yearData.year.toString()}
                          className="focus:bg-yellow focus:text-black cursor-pointer text-sm pl-2"
                        >
                          {yearData.year} - {t(`timeline.${yearData.year}.title`, { defaultValue: yearData.title })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() => {
                      const currentIndex = years.findIndex(y => y.year === (activeYear || years[0]?.year));
                      const nextIndex = (currentIndex + 1) % years.length;
                      handleYearClick(years[nextIndex].year);
                    }}
                    className="bg-yellow text-black hover:bg-yellow/90 px-3 py-2 text-sm"
                  >
                    →
                  </Button>
                </div>

                {/* Mobile year indicators */}
                <div className="flex justify-between mt-3 px-2">
                  {years.map((yearData) => {
                    const isActive = yearData.year === activeYear;
                    const isCompleted = yearData.isComplete;

                    return (
                      <div key={yearData.year} className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => handleYearClick(yearData.year)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${isActive
                            ? 'bg-yellow shadow-lg shadow-yellow/50'
                            : isCompleted
                              ? 'bg-green-500/50 hover:bg-green-500/70'
                              : 'bg-white/20 hover:bg-white/30'
                            }`}
                          aria-label={`Go to ${yearData.year}`}
                        />
                        <span className={`text-xs transition-colors ${isActive
                          ? 'text-yellow font-bold'
                          : 'text-white/40'
                          }`}>
                          {yearData.year.toString().slice(-2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-white/40 py-8">
              <p className="text-sm">{t('jsx_no_timeline_events_available')}</p>
            </div>
          )}


        </div>

        {/* Navigation hint - only show on desktop */}
        <div className="hidden md:block mt-4 text-center">
          <p className="text-xs text-white/40">
            {t('jsx_click_any_year_to_jump_to_that')}</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineStepper;