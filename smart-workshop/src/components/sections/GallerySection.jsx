import { motion } from 'framer-motion';

const galleryItems = [
  { 
    id: 1, 
    src: '/images/gallery/gallery-1.png', 
    title: 'Heavy Overhaul & TATRA Vehicle Repair Bay', 
    dept: 'Vehicle Repair Group (WSG)', 
    span: 'md:col-span-2' 
  },
  { 
    id: 2, 
    src: '/images/gallery/gallery-2.png', 
    title: 'Armament & Turret Hydraulics Inspection', 
    dept: 'Armament Group', 
    span: '' 
  },
  { 
    id: 3, 
    src: '/images/gallery/gallery-3.png', 
    title: 'Electro-Optics & Sensors Calibration Lab', 
    dept: 'Equipment Repair Group (ERG)', 
    span: '' 
  },
  { 
    id: 4, 
    src: '/images/gallery/gallery-4.png', 
    title: '510 Army Base Workshop Main Headquarters', 
    dept: 'Command Complex', 
    span: 'md:col-span-2' 
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-olive mb-4"
          >
            Workshop Gallery
          </motion.h2>
          <p className="text-gray-600">Glimpses of our state-of-the-art facilities and repair bays.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-xl h-72 border border-border shadow-sm group ${item.span}`}
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-khaki-light bg-olive/80 px-2.5 py-1 rounded w-fit mb-1 border border-khaki/30">
                  {item.dept}
                </span>
                <h3 className="text-base font-bold text-white leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}