import * as assetService from '../services/assetService.js';

export const getMetrics = async (req, res, next) => {
  try {
    const metrics = await assetService.getMetrics();
    // Provide some mock values for inventory and technicians to fulfill UI requirements for now
    res.json({
      ...metrics,
      totalInventory: 1420,
      lowStock: 12,
      activeTechnicians: 18,
      pendingMaintenance: metrics.underRepair || 0
    });
  } catch (err) { next(err); }
};
