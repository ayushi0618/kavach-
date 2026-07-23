import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

function Counter({ from, to }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary border-b-4 border-khaki text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-bold mb-2"><Counter from={0} to={8500} />+</div>
          <div className="text-sm font-medium text-khaki uppercase tracking-widest">Vehicles Serviced</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2"><Counter from={0} to={12450} /></div>
          <div className="text-sm font-medium text-khaki uppercase tracking-widest">Assets Tracked</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2"><Counter from={0} to={320} /></div>
          <div className="text-sm font-medium text-khaki uppercase tracking-widest">Expert Technicians</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2"><Counter from={0} to={50000} />+</div>
          <div className="text-sm font-medium text-khaki uppercase tracking-widest">Inventory Items</div>
        </div>
      </div>
    </section>
  );
}