import { useState, useEffect, useRef } from 'react';

interface ScrollSpyOptions {
  rootMargin?: string;
}

export const useScrollSpy = (elementIds: string[], options: ScrollSpyOptions = {}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Usar refs para mantener los IDs y evitar que el efecto se regenere si elementIds cambia de referencia
  const elementIdsRef = useRef(elementIds);
  useEffect(() => {
    elementIdsRef.current = elementIds;
  }, [elementIds]);

  useEffect(() => {
    const visibilityMap = new Map<string, number>();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });
        
        let maxRatio = 0;
        let mostVisible: string | null = null;
        
        visibilityMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });
        
        if (mostVisible && maxRatio > 0) {
          setActiveId(mostVisible);
        }
      },
      { 
        // Generar un threshold array [0, 0.1, 0.2, ... 1] para que el observer se dispare frecuentemente y tengamos el ratio exacto
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
        rootMargin: options.rootMargin || '-10% 0px -10% 0px' 
      }
    );
    
    // Check elements after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const elements = elementIdsRef.current.map(id => document.getElementById(id)).filter(Boolean);
      elements.forEach(el => {
        if (el) observer.observe(el);
      });
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [options.rootMargin]); // Omitimos elementIds porque usamos el ref, esto evita parpadeos
  
  return activeId;
};