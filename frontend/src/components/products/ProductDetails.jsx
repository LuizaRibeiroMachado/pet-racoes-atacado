import { useState } from 'react'
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import FreightCalculator from '../cart/FreightCalculator'
import { useCart } from '../../context/CartContext'

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image || `https://via.placeholder.com/600x600?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {hasDiscount && (
          <Badge variant="error" className="absolute top-4 left-4 text-base px-3 py-1">
            -{discountPercent}% OFF
          </Badge>
        )}
      </div>

      {/* Info */}
      <div>
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>

        <div className="flex items-end gap-3 mb-6">
          {hasDiscount && (
            <span className="text-xl text-gray-400 line-through">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-3xl font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 mb-6">
          {product.description}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium text-gray-700">Quantidade:</span>
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          fullWidth
          size="lg"
          icon={addedToCart ? Check : ShoppingCart}
          className={addedToCart ? 'bg-success hover:bg-success' : ''}
        >
          {addedToCart ? 'Adicionado!' : 'Adicionar ao Carrinho'}
        </Button>

        {/* Freight Calculator */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <FreightCalculator />
        </div>

        {/* Additional Info */}
        {product.weight && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Especificações</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {product.weight && <li>Peso: {product.weight}</li>}
              {product.category && <li>Categoria: {product.category}</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
