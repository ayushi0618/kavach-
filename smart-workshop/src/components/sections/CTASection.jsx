import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-khaki-light/30"></div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-olive mb-8 leading-tight"
        >
          Digitizing the Future of <br/> Army Workshop Management
        </motion.h2>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/login')}
          className="px-10 py-4 bg-primary hover:bg-olive text-white rounded shadow-lg hover:shadow-xl transition-all font-bold text-lg flex items-center gap-3 mx-auto"
        >
          Access Portal <ArrowRight size={20} />
        </motion.button>
      </div>
    </section>
  );
}