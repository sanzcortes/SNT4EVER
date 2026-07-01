import type { AssetPaths, TimelineEvent, VideoItem, GalleryImage, NavigationItem } from '@/types';

import sntBenchNewImg from '@/assets/images/snt_bench_new.png';
import santsNewImg from '@/assets/images/sants_new.png';
import sntLandscape1983Img from '@/assets/images/snt_landscape_1983.jpg';
import fuentesSantsImg from '@/assets/images/FuentesSants_rogerferrero_2004.jpg';
import selloSntImg from '@/assets/images/SELLO-SNT.png';
import logoImg from '@/assets/images/SNT4EVER_LOGO_BENCH.png';
import sntBenchImg from '@/assets/images/snt_bench.png';
import sntDestroyedImg from '@/assets/images/snt_destroyed.png';
import localsBuildingImg from '@/assets/images/localsBuilding.png';
import sntObresImg from '@/assets/images/snt-obres.png';
import sntReconstruccioTerraImg from '@/assets/images/snt-reconstruccio-terra.png';
import sntReconstruccioTerra3Img from '@/assets/images/snt-reconstruccio-terra-3.png';

import archive1 from '@/assets/images/archive-old-school-1.jpg';
import archive2 from '@/assets/images/archive-old-school-2.jpg';
import archive3 from '@/assets/images/archive-old-school-3.jpg';
import archive4 from '@/assets/images/archive-old-school-4.jpg';
import archive5 from '@/assets/images/archive-old-school-5.jpg';
import archive6 from '@/assets/images/archive-old-school-6.jpg';
import archive7 from '@/assets/images/archive-old-school-7.jpg';
import archive8 from '@/assets/images/archive-old-school-8.jpg';
import archive9 from '@/assets/images/archive-old-school-9.jpg';
import archive10 from '@/assets/images/archive-old-school-10.jpg';
import archive11 from '@/assets/images/archive-old-school-11.jpg';
import archive12 from '@/assets/images/archive-old-school-12.jpg';
import archive13 from '@/assets/images/archive-old-school-13.jpg';
import archive14 from '@/assets/images/archive-old-school-14.jpg';
import archive15 from '@/assets/images/archive-old-school-15.jpg';
import archive16 from '@/assets/images/archive-old-school-16.jpg';
import archive17 from '@/assets/images/archive-old-school-17.jpg';
import archive18 from '@/assets/images/archive-old-school-18.jpg';
import archive19 from '@/assets/images/archive-old-school-19.jpg';

export const ASSET_PATHS: AssetPaths = {
  images: {
    sntBenchNew: sntBenchNewImg,
    santsNew: santsNewImg,
    sntLandscape1983: sntLandscape1983Img,
    fuentesSants: fuentesSantsImg,
    selloSnt: selloSntImg,
    logo: logoImg,
    sntBench: sntBenchImg,
    sntDestroyed: sntDestroyedImg,
    localsBuilding: localsBuildingImg,
    sntObres: sntObresImg,
    sntReconstruccioTerra: sntReconstruccioTerraImg,
    sntReconstruccioTerra3: sntReconstruccioTerra3Img,
    // Placeholder images for timeline events (add actual images when available)
    deterioration2012: '/images/2012-deterioration.jpg',
    goldenEra: '/images/golden-era.jpg',
    diyMaintenance: '/images/diy-maintenance.jpg',
    snt4everFoundation: '/images/snt4ever-foundation.jpg',
  },
  videos: {
    // Add video paths when available
  }
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'The project', href: '#hero', id: 'hero' },
  { label: 'Our story', href: '#story', id: 'story' },
  { label: 'News/Events', href: '#news', id: 'news' },
  { label: 'Archive', href: '#archive', id: 'archive' },
  { label: 'Docs', href: '#docs', id: 'docs' },
  { label: 'Join us!', href: '#join', id: 'join', isSpecial: true },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1983',
    title: 'El Nacimiento de la "Plaza Dura"',
    content: 'Diseñada por los arquitectos Albert Viaplana y Helio Piñón, la plaza se presenta como una ruptura con el urbanismo tradicional. Ante la imposibilidad de plantar árboles sobre la losa ferroviaria, se crea una superficie mineral de granito y metal. En 1983 recibe el Premio FAD de Arquitectura, consolidándose como un referente internacional de la arquitectura moderna.',
    type: 'gallery',
    images: [
      ASSET_PATHS.images.sntLandscape1983,
      ASSET_PATHS.images.sntBenchNew,
      ASSET_PATHS.images.santsNew
    ]
  },
  {
    year: '1985',
    title: 'El Descubrimiento',
    content: 'Mientras Barcelona se preparaba para los Juegos Olímpicos, los primeros skaters locales descubrieron que el granito pulido y las formas abstractas de la plaza eran perfectas para patinar. Lo que fue diseñado como un espacio de tránsito se convirtió en un laboratorio de trucos, comenzando el uso de los bancos de granito originales.',
    type: 'events',
    image: ASSET_PATHS.images.fuentesSants,
    events: [
      'Apropiación del espacio arquitectónico',
      'Uso original de los bancos de granito',
    ]
  },


  {
    year: '2012',
    title: 'Deterioro y Olvido Institucional',
    content: 'Las obras de la llegada del AVE degradaron el entorno. Se realizaron parches de hormigón y se eliminaron elementos originales. Ante la falta de mantenimiento por parte del Ayuntamiento o Adif, los patinadores locales empezaron a cuidar el espacio de forma informal, limpiando y reparando lo que podían.',
    type: 'gallery',
    images: [
      ASSET_PATHS.images.sntBench,
      ASSET_PATHS.images.sntObres
    ]
  },
  {
    year: '2018',
    title: 'Mantenimiento DIY',
    content: 'Los locales de Sants llevaron cemento, masilla y herramientas para arreglar los bordillos de granito destrozados. Se recuperaron bancos que estaban fuera de uso. El spot ya no era solo un lugar para patinar, era un espacio autogestionado por la comunidad local.',
    type: 'events',
    images: [
      ASSET_PATHS.images.sntReconstruccioTerra,
      ASSET_PATHS.images.sntReconstruccioTerra3,
      ASSET_PATHS.images.localsBuilding
    ],
    events: [
      'Reparaciones con cemento y herramientas propias',
      'Limpieza y mantenimiento informal',
      'Construcción de comunidad autogestionada'
    ]
  },

];

export const ARCHIVE_IMAGES: GalleryImage[] = [
  { id: '1', src: archive1, alt: '' },
  { id: '2', src: archive2, alt: 'Archive Old School 2' },
  { id: '3', src: archive3, alt: 'Archive Old School 3' },
  { id: '4', src: archive4, alt: 'Archive Old School 4' },
  { id: '5', src: archive5, alt: 'Archive Old School 5' },
  { id: '6', src: archive6, alt: 'Archive Old School 6' },
  { id: '7', src: archive7, alt: 'Archive Old School 7' },
  { id: '8', src: archive8, alt: 'Archive Old School 8' },
  { id: '9', src: archive9, alt: 'Archive Old School 9' },
  { id: '10', src: archive10, alt: 'Archive Old School 10' },
  { id: '11', src: archive11, alt: 'Archive Old School 11' },
  { id: '12', src: archive12, alt: 'Archive Old School 12' },
  { id: '13', src: archive13, alt: 'Archive Old School 13' },
  { id: '14', src: archive14, alt: 'Archive Old School 14' },
  { id: '15', src: archive15, alt: 'Archive Old School 15' },
  { id: '16', src: archive16, alt: 'Archive Old School 16' },
  { id: '17', src: archive17, alt: 'Archive Old School 17' },
  { id: '18', src: archive18, alt: 'Archive Old School 18' },
  { id: '19', src: archive19, alt: 'Archive Old School 19' }
];

export const ARCHIVE_VIDEOS: VideoItem[] = [
  { id: '0', videoId: 'JVhNrgVgW2Q', title: 'Historia plaza y estación', year: 2024 },
  { id: '1', videoId: 'mZctJpnGNyI', title: 'Video Effort', year: 1997 },
  { id: '2', videoId: 'DmaWaH6wXVQ', title: 'La Era Dorada', year: 2000 },
  { id: '3', videoId: 'SYWISRok81g', title: 'Creación de la primera réplica de las mesas', year: 2018 },
  { id: '4', videoId: '_LtYmEHNkHQ', title: 'El Nacimiento de SNT4EVER', year: 2021 },
  { id: '5', videoId: 'bpNrTu-dQR8', title: 'Documentación del Legado', year: 2022 },
  { id: '6', videoId: 'egDfjgsWVnk', title: 'Remodelación y Compromiso', year: 2024 },
  { id: '7', videoId: 'sFjl62hYCm0', title: 'Inertia “Inertia” – The Rise and Legacy of Barcelona’s Iconic Sants Plaza', year: 2026 },
];

export const SOCIAL_LINKS = {
  changeOrg: 'https://www.change.org/p/salvemos-el-skate-plaza-de-sant-andreu',
  joinForm: 'https://docs.google.com/forms/d/e/1FAIpQLScQjiRwuNa9bBdWzGtUMNv9-FkAaWSpOGC4BLOCUPaQfjex8A/viewform?gxids=7628',
  instagram: '#',
  twitter: '#',
  youtube: '#',
};

export const CONTACT_INFO = {
  email: 'info@snt4ever.org',
  location: 'Sants Skate Plaza, Barcelona',
  phone: '+34 XXX XXX XXX',
};
