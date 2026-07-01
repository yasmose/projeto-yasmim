const express = require ('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importando a segurança

router.post('/register', authController.register);
router.post('/login', authController.login);

// Novas rotas protegidas pelo authMiddleware
router.get('/me', authMiddleware, authController.getUser);
router.put('/update', authMiddleware, authController.updateUser);

module.exports = router;