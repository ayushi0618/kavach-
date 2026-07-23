import * as repo from '../repositories/procurementRepository.js';

export const getAll = () => repo.findAll();
export const add = (data) => repo.create(data);

export const getAllVendors = () => repo.findAllVendors();
export const addVendor = (data) => repo.createVendor(data);
