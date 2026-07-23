import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] rounded-lg overflow-hidden bg-khaki-light flex items-center justify-center border border-border shadow-sm"
        >
          {/* Placeholder for missing image */}
          <div className="text-center p-8">
            <span className="block text-4xl mb-4">📸</span>
            <p className="text-olive font-medium">Workshop Front View</p>
            <p className="text-sm text-gray-500 mt-2">Replace with uploaded image</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-olive mb-6">About 510 Army Base Workshop</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The 510 Army Base Workshop in Meerut is a premier establishment dedicated to the overhaul, repair, and maintenance of critical military assets. This digital platform modernizes operations, ensuring complete visibility and efficiency across all departments.
          </p>
          
          <div className="space-y-6 mt-8">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-bold text-olive mb-2">Mission</h3>
              <p className="text-sm text-gray-600">To provide state-of-the-art repair and maintenance facilities ensuring the operational readiness of the Indian Army's vehicle and equipment fleet.</p>
            </div>
            <div className="border-l-4 border-khaki pl-4">
              <h3 className="text-lg font-bold text-olive mb-2">Vision</h3>
              <p className="text-sm text-gray-600">Pioneering digital transformation in military engineering through smart tracking, predictive maintenance, and seamless workflow management.</p>
            </div>
            <div className="border-l-4 border-gray-300 pl-4">
              <h3 className="text-lg font-bold text-olive mb-2">Objectives</h3>
              <p className="text-sm text-gray-600">Reduce turnaround time, optimize inventory management, and enforce strict quality control at every stage of the repair process.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}