import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load products data
const productsPath = join(__dirname, '../data/products.json')
const products = JSON.parse(readFileSync(productsPath, 'utf-8'))

// Helper function to filter and sort products
function filterProducts(items, query) {
  let result = [...items]

  // Filter by category
  if (query.category) {
    result = result.filter(p => p.category === query.category)
  }

  // Filter by search query
  if (query.q) {
    const searchLower = query.q.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    )
  }

  // Filter by featured
  if (query.featured === 'true') {
    result = result.filter(p => p.featured)
  }

  // Filter by price range
  if (query.price) {
    const [min, max] = query.price.split('-').map(Number)
    if (query.price.endsWith('+')) {
      const minPrice = parseInt(query.price)
      result = result.filter(p => p.price >= minPrice)
    } else if (min !== undefined && max !== undefined) {
      result = result.filter(p => p.price >= min && p.price <= max)
    }
  }

  // Sort
  if (query.sort) {
    const sortField = query.sort.startsWith('-') ? query.sort.slice(1) : query.sort
    const sortOrder = query.sort.startsWith('-') ? -1 : 1

    result.sort((a, b) => {
      if (sortField === 'price') {
        return (a.price - b.price) * sortOrder
      }
      if (sortField === 'name') {
        return a.name.localeCompare(b.name) * sortOrder
      }
      return 0
    })
  }

  // Limit
  if (query.limit) {
    result = result.slice(0, parseInt(query.limit))
  }

  return result
}

// GET /api/products
export function getAllProducts(req, res) {
  try {
    const filteredProducts = filterProducts(products, req.query)
    res.json({ products: filteredProducts, total: filteredProducts.length })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos' })
  }
}

// GET /api/products/:id
export function getProductById(req, res) {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id))
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto' })
  }
}

// GET /api/products/category/:category
export function getProductsByCategory(req, res) {
  try {
    const category = req.params.category
    const categoryMap = {
      'racoes': ['caes', 'gatos'],
    }

    let filtered
    if (categoryMap[category]) {
      filtered = products.filter(p => categoryMap[category].includes(p.category))
    } else {
      filtered = products.filter(p => p.category === category)
    }

    const sortedProducts = filterProducts(filtered, req.query)
    res.json({ products: sortedProducts, total: sortedProducts.length })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos da categoria' })
  }
}

// GET /api/products/search
export function searchProducts(req, res) {
  try {
    const { q } = req.query
    if (!q) {
      return res.json({ products: [], total: 0 })
    }

    const filtered = filterProducts(products, { q, ...req.query })
    res.json({ products: filtered, total: filtered.length })
  } catch (error) {
    res.status(500).json({ message: 'Erro na busca' })
  }
}
