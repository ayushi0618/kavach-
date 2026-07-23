import * as assetRepo from '../repositories/assetRepository.js';

export const getMetrics = async () => {
  return await assetRepo.getDashboardMetrics();
};

export const getAllAssets = async (params) => {
  return await assetRepo.findAll(params);
};

export const registerAsset = async (data) => {
  return await assetRepo.create(data);
};

export const deleteAsset = async (id) => {
  return await assetRepo.deleteById(id);
};

export const updateAsset = async (id, data) => {
  return await assetRepo.updateById(id, data);
};

