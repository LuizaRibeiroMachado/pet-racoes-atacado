import express from 'express'
import { getAllProducts, getProductById, getProductsByCategory, searchProducts } from '../controllers/productController.js'

const router = express.Router()

// GET /api/products - Listar todos (com filtros opcionais)
router.get('/', getAllProducts)

// GET /api/products/search - Busca
router.get('/search', searchProducts)

// GET /api/products/category/:category - Por categoria
router.get('/category/:category', getProductsByCategory)

// GET /api/products/:id - Produto específico
router.get('/:id', getProductById)

export default router
