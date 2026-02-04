import express from 'express'
import { register, login, getMe } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// POST /api/auth/register - Cadastro
router.post('/register', register)

// POST /api/auth/login - Login
router.post('/login', login)

// GET /api/auth/me - Dados do usuário autenticado
router.get('/me', authMiddleware, getMe)

export default router
