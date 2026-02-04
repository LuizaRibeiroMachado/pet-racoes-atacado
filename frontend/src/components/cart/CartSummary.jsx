import { useCart } from '../../context/CartContext'
import Button from '../ui/Button'

export default function CartSummary({ freight = 0 }) {
  const { total, itemCount } = useCart()

  const finalTotal = total + freight

  return (
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

      <Button fullWidth size="lg" disabled={itemCount === 0}>
        Finalizar Compra
      </Button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Pagamento seguro com Pix, Cartão ou Boleto
      </p>
    </div>
  )
}
