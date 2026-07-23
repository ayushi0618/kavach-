import * as assetService from '../services/assetService.js';

export const getAll = async (req, res, next) => {
  try {
    const assets = await assetService.getAllAssets(req.query);
    res.json({ assets });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const assets = await assetService.getAllAssets({ id: req.params.id });
    if (assets.length === 0) return res.status(404).json({ error: 'Asset not found' });
    res.json({ asset: assets[0] });
  } catch (err) { next(err); }
};

export const register = async (req, res, next) => {
  try {
    const newAsset = await assetService.registerAsset(req.body);
    res.status(201).json({ asset: newAsset });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    await assetService.deleteAsset(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const updatedAsset = await assetService.updateAsset(req.params.id, req.body);
    res.json({ asset: updatedAsset });
  } catch (err) { next(err); }
};
