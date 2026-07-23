import * as repo from '../repositories/maintenanceRepository.js';
export const getAll = () => repo.findAll();
export const getById = (id) => repo.findById(id);
export const add = (data) => repo.create(data);
export const update = (id, data) => repo.update(id, data);
export const remove = (id) => repo.remove(id);
