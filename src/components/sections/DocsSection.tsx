import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionMarquee from '@/components/common/SectionMarquee';

import saveSntImg from '@/assets/images/docs-snt4ever.png';
import gentDePlacaImg from '@/assets/images/docs-gent-de-plaza.png';

const DocsSection: React.FC = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(3);

  const documents = [
    {
      id: 'save_snt',
      title: 'Save SNT',
      image: saveSntImg,
      link: 'https://drive.google.com/file/d/1sCR9yXoNcA2w5O9UbGvynnp4tFivnHer/view',
      descriptionKey: 'docs_save_snt_desc',
      defaultDesc: 'Initial document of the association explaining what the association is, the benefits of skateboarding in Barcelona, the history of the square and other European examples of reference.'
    },
    {
      id: 'gent_de_placa',
      title: 'Gent de plaça',
      image: gentDePlacaImg,
      link: 'https://drive.google.com/file/d/17APMrLHHZS8FXCBF0N8ZM_yR8pBFO55N/view',
      descriptionKey: 'docs_gent_de_placa_desc',
      defaultDesc: 'Document that shows the variety of users that can be found in the square.'
    }
  ];

  return (
    <section id="docs" className="scroll-mt-14 md:scroll-mt-24 bg-black">
      <SectionMarquee 
        text={t('nav.docs')} 
        className="hidden w-full bg-yellow py-1 md:py-2 mb-4 mt-24 md:mt-32 md:flex items-center overflow-hidden"
      />
      <div className="container-snt pb-12 md:pb-24 md:pt-16">
        <h2 className="text-4xl font-bold text-yellow mb-8 text-left md:hidden pt-8">
          {t('nav.docs')}
        </h2>
        {/* Document container */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 md:overflow-x-auto pb-8 md:snap-x md:snap-mandatory scrollbar-hide">
          {documents.slice(0, visibleCount).map((doc) => (
            <div key={doc.id} className="flex flex-col h-full w-full md:w-[calc(50%-1.5rem)] flex-shrink-0 md:snap-start">
              <a 
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full transition-colors"
              >
                {/* Image Top */}
                <div className="w-full flex-shrink-0 mb-8">
                  <div className="aspect-[16/9] w-full overflow-hidden border border-white/20">
                    <img 
                      src={doc.image} 
                      alt={doc.title}
                      className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Text Bottom */}
                <div className="w-full flex flex-col flex-grow">
                  <div className="border-b border-white/20 pb-4 mb-6 flex items-center justify-between">
                    <h3 className="text-3xl md:text-4xl font-bold text-white transition-colors group-hover:text-yellow">
                      {doc.title}
                    </h3>
                    <span className="text-3xl md:text-4xl text-white transition-transform duration-300 group-hover:text-yellow group-hover:translate-x-2 group-hover:-translate-y-2">
                      ↗
                    </span>
                  </div>
                  <p className="text-white/80 text-lg md:text-xl font-mono leading-relaxed flex-grow">
                    {t(doc.descriptionKey, { defaultValue: doc.defaultDesc })}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {documents.length > visibleCount && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount(documents.length)}
              className="text-yellow border border-yellow px-8 py-3 rounded-full hover:bg-yellow hover:text-black transition-colors uppercase font-bold tracking-widest text-sm"
            >
              {t('docs_show_more', { defaultValue: 'Muestra más' })}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DocsSection;
