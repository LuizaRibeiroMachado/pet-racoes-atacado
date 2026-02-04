import express from 'express'
import { calculateFreight } from '../controllers/freightController.js'

const router = express.Router()

// POST /api/freight/calculate - Calcular frete por CEP
router.post('/calculate', calculateFreight)

export default router
