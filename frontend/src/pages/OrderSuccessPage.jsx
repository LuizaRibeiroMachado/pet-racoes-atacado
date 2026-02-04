import { useLocation, Link, Navigate } from 'react-router-dom'
import { CheckCircle, Package, Truck, Home, Copy, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/ui/Button'

const trackingSteps = [
  { id: 1, name: 'Pedido Confirmado', icon: CheckCircle, status: 'completed' },
  { id: 2, name: 'Preparando', icon: Package, status: 'current' },
  { id: 3, name: 'Em Transporte', icon: Truck, status: 'pending' },
  { id: 4, name: 'Entregue', icon: Home, status: 'pending' },
]

export default function OrderSuccessPage() {
  const location = useLocation()
  const { order } = location.state || {}
  const [copied, setCopied] = useState(false)

  if (!order) {
    return <Navigate to="/" replace />
  }

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(order.number)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white py-12">
      <div className="container-app">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Pedido Confirmado!
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Obrigado por comprar na Pet Rações Atacado. Seu pedido foi recebido e está sendo processado.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Order Number Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Número do Pedido</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">#{order.number}</span>
                  <button
                    onClick={copyOrderNumber}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copiar número"
                  >
                    <Copy className={`w-5 h-5 ${copied ? 'text-success' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Previsão de Entrega</p>
                <p className="text-lg font-semibold text-gray-900">
                  {estimatedDelivery.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Tracking Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Acompanhe seu Pedido</h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 hidden md:block">
                <div className="h-full bg-success w-1/4 transition-all duration-500" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = step.status === 'completed'
                  const isCurrent = step.status === 'current'

                  return (
                    <div key={step.id} className="flex flex-col items-center text-center relative">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all ${
                          isCompleted
                            ? 'bg-success text-white'
                            : isCurrent
                            ? 'bg-primary text-white animate-pulse'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {step.name}
                      </span>
                      {isCurrent && (
                        <span className="text-xs text-primary mt-1">Em andamento</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Products */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Itens do Pedido</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                      <p className="text-sm font-semibold text-primary">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>R$ {(order.total - order.freight).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete</span>
                  <span>R$ {order.freight.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-primary">R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Endereço de Entrega</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="font-medium text-gray-900">{order.address.name}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {order.address.street}, {order.address.number}
                  {order.address.complement && ` - ${order.address.complement}`}
                </p>
                <p className="text-gray-600 text-sm">
                  {order.address.neighborhood} - {order.address.city}/{order.address.state}
                </p>
                <p className="text-gray-600 text-sm">CEP: {order.address.cep}</p>
              </div>

              {order.address.deliveryInstructions && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-yellow-800 mb-1">Instruções de Entrega:</p>
                  <p className="text-sm text-yellow-700">{order.address.deliveryInstructions}</p>
                </div>
              )}

              <h3 className="font-semibold text-gray-900 mb-2">Forma de Pagamento</h3>
              <p className="text-gray-600 capitalize">
                {order.paymentMethod === 'pix' ? 'Pix' : order.paymentMethod === 'card' ? 'Cartão de Crédito' : 'Boleto Bancário'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" size="lg">
                Continuar Comprando
              </Button>
            </Link>
            <a
              href={`https://wa.me/556239011359?text=${encodeURIComponent(`Olá! Gostaria de informações sobre meu pedido #${order.number}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" icon={MessageCircle} className="bg-[#25D366] hover:bg-[#20BD5A]">
                Falar no WhatsApp
              </Button>
            </a>
          </div>

          {/* Email Notice */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Enviamos um email de confirmação para <strong>{order.address.email}</strong> com todos os detalhes do pedido.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
