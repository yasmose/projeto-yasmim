const { verificarToken } = require('../services/tokenService');

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');

        req.user = verificarToken(token);
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = authMiddleware;