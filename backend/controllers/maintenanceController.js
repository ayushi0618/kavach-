import * as service from '../services/maintenanceService.js';
export const getAll = async (req, res, next) => {
  try { res.json({ jobs: await service.getAll() }); } catch (e) { next(e); }
};
export const getById = async (req, res, next) => {
  try {
    const job = await service.getById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ job });
  } catch (e) { next(e); }
};
export const add = async (req, res, next) => {
  try { res.status(201).json({ job: await service.add(req.body) }); } catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try { res.json({ job: await service.update(req.params.id, req.body) }); } catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try { await service.remove(req.params.id); res.status(204).send(); } catch (e) { next(e); }
};
