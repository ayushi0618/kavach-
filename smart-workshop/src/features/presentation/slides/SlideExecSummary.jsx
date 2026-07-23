import { motion } from 'framer-motion';

export default function SlideExecSummary() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-12">
      <div className="w-full max-w-5xl bg-white shadow-2xl p-16 rounded-xl border border-gray-200">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b-4 border-olive pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-olive uppercase tracking-tight">Executive Summary</h1>
            <p className="text-gray-500 font-bold mt-2">Project Completion Report • 510 Army Base Workshop</p>
          </div>
          <img src="/placeholder-logo.png" alt="" className="w-16 h-16 bg-gray-200 rounded" />
        </motion.div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Modules Delivered</h3>
            <ul className="space-y-3 font-medium text-gray-600 list-disc pl-5">
              <li>Role-Based UI (Admin, Tech, Executive)</li>
              <li>QR Code Asset Management</li>
              <li>Live Maintenance Tracking</li>
              <li>Inventory & Procurement Lifecycles</li>
              <li>Gemini AI Insights & Predictors</li>
            </ul>
          </motion.div>
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Technical Infrastructure</h3>
            <ul className="space-y-3 font-medium text-gray-600 list-disc pl-5">
              <li>React 19 / Vite / Tailwind UI</li>
              <li>Node.js / Express Enterprise Backend</li>
              <li>PostgreSQL / Drizzle ORM</li>
              <li>Strict Zod Validation Pipelines</li>
              <li>Docker & CI/CD Pipeline Ready</li>
            </ul>
          </motion.div>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="flex justify-between items-end pt-12 border-t border-gray-200 mt-auto">
          <div className="text-center w-64">
            <div className="border-b border-gray-400 mb-2 h-12"></div>
            <p className="text-xs uppercase font-bold text-gray-500">Prepared By</p>
          </div>
          <div className="text-center w-64">
            <div className="border-b border-gray-400 mb-2 h-12"></div>
            <p className="text-xs uppercase font-bold text-gray-500">Reviewed By (Project Guide)</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
