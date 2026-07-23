import * as service from '../services/inventoryService.js';
export const getAll = async (req, res, next) => {
  try { res.json({ inventory: await service.getAll() }); } catch (e) { next(e); }
};
export const add = async (req, res, next) => {
  try { res.status(201).json({ item: await service.add(req.body) }); } catch (e) { next(e); }
};
