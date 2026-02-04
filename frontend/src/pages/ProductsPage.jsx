import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductGrid from '../components/products/ProductGrid'
import api from '../services/api'

const sortOptions = [
  { value: 'name', label: 'Nome (A-Z)' },
  { value: '-name', label: 'Nome (Z-A)' },
  { value: 'price', label: 'Menor preço' },
  { value: '-price', label: 'Maior preço' },
]

const categories = [
  { value: '', label: 'Todas' },
  { value: 'caes', label: 'Cães' },
  { value: 'gatos', label: 'Gatos' },
  { value: 'acessorios', label: 'Acessórios' },
]

const priceRanges = [
  { value: '', label: 'Todos' },
  { value: '0-50', label: 'Até R$ 50' },
  { value: '50-100', label: 'R$ 50 - R$ 100' },
  { value: '100-200', label: 'R$ 100 - R$ 200' },
  { value: '200+', label: 'Acima de R$ 200' },
]

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sort: 'name',
  })

  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (searchQuery) params.append('q', searchQuery)
    if (filters.category) params.append('category', filters.category)
    if (filters.priceRange) params.append('price', filters.priceRange)
    if (filters.sort) params.append('sort', filters.sort)

    api.get(`/products?${params.toString()}`)
      .then(response => setProducts(response.data.products || response.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [searchQuery, filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ category: '', priceRange: '', sort: 'name' })
  }

  const hasActiveFilters = filters.category || filters.priceRange

  return (
    <div className="py-8">
      <div className="container-app">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os Produtos'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {products.length} produtos encontrados
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`
              fixed lg:static inset-0 z-50 lg:z-auto
              bg-white lg:bg-transparent
              w-full lg:w-64 flex-shrink-0
              transform lg:transform-none transition-transform duration-300
              ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="p-4 lg:p-0">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-lg font-semibold">Filtros</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Sort - Mobile */}
              <div className="mb-6 lg:hidden">
                <h3 className="font-medium text-gray-900 mb-3">Ordenar por</h3>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categoria</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category.value}
                        onChange={() => handleFilterChange('category', category.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Preço</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range.value}
                        onChange={() => handleFilterChange('priceRange', range.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Limpar filtros
                </button>
              )}

              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg font-medium"
              >
                Aplicar Filtros
              </button>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Sort - Desktop */}
            <div className="hidden lg:flex items-center justify-end mb-4">
              <label className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </div>

      {/* Overlay for mobile filters */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  )
}
