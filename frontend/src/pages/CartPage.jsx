import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import FreightCalculator from '../components/cart/FreightCalculator'
import Button from '../components/ui/Button'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, total, itemCount, clearCart } = useCart()
  const [freight, setFreight] = useState(0)

  const handleFreightCalculated = (price) => {
    setFreight(price)
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="py-16">
        <div className="container-app text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Seu carrinho está vazio
          </h1>
          <p className="text-gray-500 mb-6">
            Adicione produtos para continuar comprando
          </p>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
          >
            Ver Produtos
          </Link>
        </div>
      </div>
    )
  }

  const finalTotal = total + freight

  return (
    <div className="py-8">
      <div className="container-app">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Carrinho de Compras
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-error transition-colors"
          >
            Limpar carrinho
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary-dark"
            >
              <ArrowLeft className="w-4 h-4" />
              Continuar comprando
            </Link>
          </div>

          {/* Sidebar */}
          <div className="mt-8 lg:mt-0 space-y-6">
            {/* Freight */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
              <FreightCalculator onFreightCalculated={handleFreightCalculated} />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumo do Pedido
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({itemCount} itens)</span>
                  <span className="text-gray-900">R$ {total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-gray-900">
                    {freight > 0 ? `R$ ${freight.toFixed(2)}` : 'Calcule acima'}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-primary">
                      R$ {finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={handleCheckout}
                disabled={itemCount === 0}
                icon={ArrowRight}
              >
                Finalizar Compra
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Pagamento seguro com Pix, Cartão ou Boleto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
