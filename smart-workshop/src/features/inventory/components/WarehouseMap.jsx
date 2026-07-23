import { motion } from 'framer-motion';

const zones = [
  { id: 'Zone A', name: 'Heavy Parts', capacity: 80, status: 'normal' },
  { id: 'Zone B', name: 'Electrical', capacity: 95, status: 'warning' },
  { id: 'Zone C', name: 'Hydraulics', capacity: 40, status: 'normal' },
  { id: 'Zone D', name: 'Consumables', capacity: 15, status: 'critical' },
];

export default function WarehouseMap() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-bold text-olive mb-4">Warehouse Capacity Map</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {zones.map((zone, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border-2 flex flex-col justify-between h-32 ${
              zone.status === 'warning' ? 'bg-orange-50 border-orange-200' :
              zone.status === 'critical' ? 'bg-red-50 border-red-200' :
              'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-800">{zone.id}</div>
                <div className="text-xs text-gray-500 font-semibold">{zone.name}</div>
              </div>
              <div className={`text-lg font-bold ${
                zone.status === 'warning' ? 'text-warning' :
                zone.status === 'critical' ? 'text-danger' :
                'text-primary'
              }`}>
                {zone.capacity}%
              </div>
            </div>
            
            <div className="w-full bg-white rounded-full h-2 shadow-inner border border-gray-100 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${zone.capacity}%` }}
                transition={{ duration: 1 }}
                className={`h-2 rounded-full ${
                  zone.status === 'warning' ? 'bg-warning' :
                  zone.status === 'critical' ? 'bg-danger' :
                  'bg-primary'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}