import { motion } from 'framer-motion';

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
          <p className="text-gray-600">Glimpses of our state-of-the-art facilities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-lg bg-khaki-light aspect-video flex items-center justify-center border border-border group ${i === 1 || i === 4 ? 'md:col-span-2' : ''}`}
            >
              <span className="text-2xl opacity-50 group-hover:scale-110 transition-transform">📸 Image {i}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}