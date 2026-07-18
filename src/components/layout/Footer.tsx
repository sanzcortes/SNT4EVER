import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const specialThanks = [
    {
      col: 1,
      sections: [
        {
          title: 'JUNTA DIRECTIVA 📚',
          items: [
            { name: 'EDGAR TELLEZ', handle: '@corporationlover', role: 'por la ayuda con los papeles de formación de la asociación' },
            { name: 'JUAN GAMINDE,', role: 'tesorero de la asociación' },
            { name: 'MARCOS ÁLVAREZ WELTERS', role: 'secretario de la asociación y mano derecha' },
          ]
        }
      ]
    },
    {
      col: 2,
      sections: [
        {
          title: 'DESIGN & WEB 🎨',
          items: [
            { name: 'ROGER SNT & DAVID SUSKO', handle: 'https://github.com/sanzcortes / https://github.com/davidSusko', role: 'por la creación de la página web' },
            { name: 'MARINA GASOLINA', handle: '@marinagasolina', role: 'por los diseños para el instagram' },
            { name: 'DEBORA NUNES', handle: '@00debnf', role: 'por el diseño de los documentos oficiales y la paciencia' },
            { name: 'AGATHE VERDIER', handle: '@verdieragathe', role: 'por el diseño web' },
          ]
        },
        {
          title: 'RENDERS & MAPS 🗺️',
          items: [
            { name: 'DANIEL YABAR', handle: '@danielyabar', role: 'por el mapa de uso del monopatín en la plaza' },
            { name: 'ROGER SNT', handle: '@emedemoloch', role: 'por los renders 3D' },
            { name: 'VRIKO', handle: '@vriko__', role: 'por los renders 3D' },
            { name: 'IRVIN DIAZ', handle: '@irvinvcs', role: 'por los renders' },
          ]
        }
      ]
    },
    {
      col: 3,
      sections: [
        {
          title: 'PHOTOGRAPHERS 📸',
          items: [
            { name: 'DAVID SUSKO', handle: '@___susko', role: 'por las fotos' },
            { name: 'ROGER FERRERO', handle: '@rogerferrero', role: 'por las fotos' },
            { name: 'QUEL', handle: '@quelsunday', role: 'por las fotos' },
            { name: 'AXEL SERRAT', handle: '@agboton', role: 'por las fotos' },
          ]
        }
      ]
    },
    {
      col: 4,
      sections: [
        {
          title: 'COLLABORATORS 🤝',
          items: [
            { name: 'Pol', handle: '@p.t.q', role: 'por todo el diseño de los Sants Fest.' },
            { name: 'Rafa', handle: '@rrafffael', role: 'por la cobertura en todos los eventos.' },
            { name: 'Voilà Lab', handle: '@voila.filmlab', role: 'por el apoyo y las ganas de sumar, tanto dentro como fuera del skate.' },
            { name: 'PETSHOP', handle: '@petshopskateboards', role: 'for the support y la lanzadera para la asociación' },
            { name: 'JULIO ARNAU', handle: '@julioarnau', role: 'for the support' },
            { name: 'ALBERTO CASTOR', handle: '@albertokastor', role: 'por las rampas para la asociación' },
            { name: 'TONI LÓPEZ', role: 'por el apoyo, la construcción y hacer de speaker en los eventos' },
            { name: 'AL_UNO', handle: '@al_uno', role: 'por los graffittis para la plaza' },
            { name: 'SNT OG\'S', role: 'por enseñarnos todo lo que sabemos sobre la plaza' },
            { name: 'MARCOS GÓMEZ', handle: '@seniorgomez', role: 'por ser el ejemplo a seguir' },
            { name: 'SNTLOCALS', role: 'por ser las mejores personas con las que rodearse cada dia' },
          ]
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-neutral-900 border-t border-white/10 font-mono">
      <div className="w-full px-6 md:px-12 lg:px-12 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-xl md:text-2xl text-white mb-12">
            Special thanks to:
          </motion.h2>

          {/* Main Credits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-16">
            {specialThanks.map((column) => (
              <motion.div
                key={column.col}
                variants={itemVariants}
                className="flex flex-col gap-12"
              >
                {column.sections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
                      {section.title}
                    </h3>
                    <div className="space-y-4">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="text-xs md:text-sm leading-relaxed text-white/80">
                          {item.name && <strong className="text-white font-bold">{item.name} </strong>}
                          {item.handle && (
                            <span className="mr-1">
                              {item.handle.split(/(?: \/ )|(?:\/(?=@))/).map((h, i, arr) => {
                                const trimmed = h.trim();
                                const isUrl = trimmed.startsWith('http');
                                const href = isUrl ? trimmed : `https://instagram.com/${trimmed.replace('@', '')}`;

                                let displayText = trimmed;
                                if (isUrl && trimmed.includes('github.com/')) {
                                  displayText = `@${trimmed.split('github.com/')[1].replace(/\/$/, '')}`;
                                } else if (!isUrl && !trimmed.startsWith('@')) {
                                  displayText = `@${trimmed}`;
                                }

                                return (
                                  <span key={i}>
                                    <a
                                      href={href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-yellow hover:underline font-bold"
                                    >
                                      {displayText}
                                    </a>
                                    {i < arr.length - 1 && <span className="text-white/80 mx-1">/</span>}
                                  </span>
                                );
                              })}
                            </span>
                          )}
                          <span>{item.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* General Acknowledgments Text */}
          <motion.div variants={itemVariants} className="w-full text-center text-white mb-16 text-sm md:text-base leading-relaxed space-y-6">
            <p className="text-xl md:text-3xl text-white font-bold mb-12">
              {t('footer_thanks_general')}
            </p>
            <p>
              {t('footer_especially_to')} <strong className="text-yellow">Dolores Magazine</strong>,{' '}
              <strong className="text-yellow">Raisa</strong> {t('footer_raisa_role')},{' '}
              <strong className="text-yellow">08001</strong>,{' '}
              <strong className="text-yellow">Alcarrer</strong>,{' '}
              <strong className="text-yellow">Guiri Knows</strong>,{' '}
              <strong className="text-yellow">Mesa</strong>,{' '}
              <strong className="text-yellow">Quit</strong>,{' '}
              <strong className="text-yellow"> Pizza Raval</strong>,{' '}
              <strong className="text-yellow">Sour Solution</strong>,{' '}
              <strong className="text-yellow">Rackz</strong>,{' '}
              <strong className="text-yellow">Blai</strong> {t('footer_blai_role')},{' '}
              <strong className="text-yellow">Calling All Skaters</strong> {t('footer_cas_role')},{' '}
              <strong className="text-yellow">Vulcano</strong>,{' '}
              <strong className="text-yellow">Quax Goods</strong>,{' '}
              <strong className="text-yellow">Atelier_B1</strong>,{' '}
              <strong className="text-yellow">Escofet</strong>,{' '}
              <strong className="text-yellow">Ajuntament de Barcelona</strong>,{' '}
              <strong className="text-yellow">Districte de Sants-Montjuïc</strong>,{' '}
              <strong className="text-yellow">Urban Agenda</strong>, &{' '}
              <strong className="text-yellow">Oriol, de la Casa del Mig{t('footer_oriol_team')}</strong>.
            </p>
            <p>
              {t('footer_thanks_final')}
            </p>
          </motion.div>

          <Separator className="bg-white/10 mb-12" />

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="text-center">
              <Mail className="h-6 w-6 text-yellow mx-auto mb-3" />
              <p className="text-white font-medium mb-1">{t('jsx_contact')}</p>
              <a
                href="mailto:sntfor4ever@gmail.com"
                className="text-muted-foreground hover:text-yellow transition-colors"
              >
                sntfor4ever@gmail.com
              </a>
            </div>

            <div className="text-center">
              <MapPin className="h-6 w-6 text-yellow mx-auto mb-3" />
              <p className="text-white font-medium mb-1">{t('jsx_location')}</p>
              <p className="text-muted-foreground">
                Plaza dels països catalans<br />
                {t('jsx_barcelona_spain')}
              </p>
            </div>

            <div className="text-center">
              <Instagram className="h-6 w-6 text-yellow mx-auto mb-3" />
              <p className="text-white font-medium mb-1">{t('jsx_social')}</p>
              <a
                href="https://instagram.com/snt_4_ever"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-yellow transition-colors"
              >
                @snt_4_ever
              </a>
            </div>
          </motion.div>

          {/* Bottom Footer */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {t('jsx_snt4ever_all_rights_reserved')}</p>
              <div className="flex gap-6 text-sm">
                <p className="text-muted-foreground">
                  {t('jsx_made_with_in_barcelona_spain')}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;