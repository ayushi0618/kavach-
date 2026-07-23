import * as aiService from '../services/aiService.js';

export const chat = async (req, res, next) => {
  try {
    const result = await aiService.generateChatResponse(req.body.query);
    if (typeof result === 'string') {
      res.json({ response: result, records: [] });
    } else {
      res.json({ response: result.response, records: result.records || [] });
    }
  } catch (err) { next(err); }
};

export const predictMaintenance = async (req, res, next) => {
  try {
    const result = await aiService.predictMaintenanceRisk(req.body.assetData);
    res.json(result);
  } catch (err) { next(err); }
};

export const analyzeFailure = async (req, res, next) => {
  try {
    const result = await aiService.generateFailureAnalysis(req.body.failureData);
    res.json(result);
  } catch (err) { next(err); }
};

export const recommendParts = async (req, res, next) => {
  try {
    const result = await aiService.recommendSpareParts(req.body.ticketData);
    res.json({ recommendations: result });
  } catch (err) { next(err); }
};

export const nlSearch = async (req, res, next) => {
  try {
    const result = await aiService.parseNaturalLanguageSearch(req.body.query);
    res.json(result);
  } catch (err) { next(err); }
};
