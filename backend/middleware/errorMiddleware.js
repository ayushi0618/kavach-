import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  if (err.name === 'ZodError') {
    return res.status(400).json({ error: 'Validation Error', details: err.errors });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};
