import * as repo from '../repositories/inventoryRepository.js';
export const getAll = () => repo.findAll();
export const add = (data) => repo.create(data);
