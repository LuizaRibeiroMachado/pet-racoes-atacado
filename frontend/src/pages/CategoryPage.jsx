import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import ProductGrid from '../components/products/ProductGrid'
import api from '../services/api'

const categoryNames = {
  caes: 'Cães',
  gatos: 'Gatos',
  acessorios: 'Acessórios',
  racoes: 'Rações',
}

const categoryDescriptions = {
  caes: 'Rações, snacks e produtos especiais para cães de todas as raças e idades.',
  gatos: 'Rações, petiscos e produtos desenvolvidos para a saúde felina.',
  acessorios: 'Brinquedos, comedouros, caminhas e muito mais para seu pet.',
  racoes: 'Todas as rações premium e standard para cães e gatos.',
}

export default function CategoryPage() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const categoryName = categoryNames[category] || category
  const categoryDescription = categoryDescriptions[category] || ''

  useEffect(() => {
    setLoading(true)
    api.get(`/products/category/${category}`)
      .then(response => setProducts(response.data.products || response.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="py-8">
      <div className="container-app">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{categoryName}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryName}
          </h1>
          {categoryDescription && (
            <p className="text-gray-600">{categoryDescription}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {products.length} produtos encontrados
          </p>
        </div>

        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  )
}
