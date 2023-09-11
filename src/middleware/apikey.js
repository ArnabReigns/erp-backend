const API_KEY = process.env.API_KEY;

function checkApiKey(req, res, next) {
  const providedApiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!providedApiKey || providedApiKey !== API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next();
}

module.exports = checkApiKey;