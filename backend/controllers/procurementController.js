import * as service from '../services/procurementService.js';

// Procurement Orders
export const getAll = async (req, res, next) => {
  try { res.json({ orders: await service.getAll() }); } catch (e) { next(e); }
};
export const add = async (req, res, next) => {
  try { res.status(201).json({ order: await service.add(req.body) }); } catch (e) { next(e); }
};

// Vendors
export const getAllVendors = async (req, res, next) => {
  try { res.json({ vendors: await service.getAllVendors() }); } catch (e) { next(e); }
};
export const addVendor = async (req, res, next) => {
  try { res.status(201).json({ vendor: await service.addVendor(req.body) }); } catch (e) { next(e); }
};

// Tender Evaluations
export const submitEvaluation = async (req, res, next) => {
  try {
    const { tenderId, evaluationType, status, remarks } = req.body;
    res.json({
      success: true,
      message: `${evaluationType} Evaluation for ${tenderId || 'TNDR-045'} updated to ${status}`,
      evaluation: { tenderId, evaluationType, status, remarks, updatedAt: new Date().toISOString() }
    });
  } catch (e) { next(e); }
};
