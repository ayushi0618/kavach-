import { motion } from 'framer-motion';

const steps = [
  "Arrival", "Inspection", "Assignment", "Repair", "QA", "QC", "Testing", "Dispatch"
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-olive mb-4"
          >
            Complete Workflow Timeline
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Every asset follows a strict, digitized path ensuring absolute transparency.
          </motion.p>
        </div>

        <div className="relative mt-20 hidden md:block">
          {/* Animated Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0"
          ></motion.div>

          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 + 0.5, type: 'spring' }}
                className="flex flex-col items-center"
              >
                <div className="w-8 h-8 rounded-full bg-white border-4 border-primary shadow flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-olive"></div>
                </div>
                <div className="mt-4 text-sm font-semibold text-olive uppercase tracking-wider">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden space-y-6 relative pl-4 border-l-2 border-primary/30 mt-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-white shadow"></div>
              <h3 className="font-bold text-olive text-lg">{step}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}