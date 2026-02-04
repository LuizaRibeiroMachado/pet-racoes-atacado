import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import Badge from '../ui/Badge'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link
      to={`/produto/${product.id}`}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image || `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {hasDiscount && (
          <Badge variant="error" className="absolute top-2 left-2">
            -{discountPercent}%
          </Badge>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-end justify-between">
          <div>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-lg font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  )
}
