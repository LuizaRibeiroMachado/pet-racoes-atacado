import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CreditCard, Barcode, QrCode, MapPin, Truck, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    cpf: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    deliveryInstructions: '',
  })

  const freight = 25.90 // Simulado
  const finalTotal = total + freight

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  const formatCpf = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simular processamento
    setTimeout(() => {
      const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase()
      clearCart()
      navigate(`/pedido-confirmado/${orderNumber}`, {
        state: {
          order: {
            number: orderNumber,
            items,
            total: finalTotal,
            freight,
            address: formData,
            paymentMethod,
            date: new Date().toISOString(),
          }
        }
      })
    }, 2000)
  }

  if (items.length === 0) {
    navigate('/carrinho')
    return null
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-app">
        <Link
          to="/carrinho"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao carrinho
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Finalizar Compra
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dados Pessoais */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Dados Pessoais
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Nome completo"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Telefone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    required
                  />
                  <Input
                    label="CPF"
                    name="cpf"
                    value={formData.cpf}
                    onChange={(e) => setFormData(prev => ({ ...prev, cpf: formatCpf(e.target.value) }))}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                  />
                </div>
              </div>

              {/* Endereço */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Endereço de Entrega
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    label="CEP"
                    name="cep"
                    value={formData.cep}
                    onChange={(e) => setFormData(prev => ({ ...prev, cep: formatCep(e.target.value) }))}
                    placeholder="00000-000"
                    maxLength={9}
                    required
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Rua"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    label="Número"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Complemento"
                    name="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                    placeholder="Apto, bloco, etc."
                  />
                  <Input
                    label="Bairro"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Cidade"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Estado"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="SP"
                    maxLength={2}
                    required
                  />
                </div>

                {/* Instruções de Entrega */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instruções de Entrega (opcional)
                  </label>
                  <textarea
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    placeholder="Ex: Deixar na portaria, cuidado com o cão, ligar antes de entregar..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Pagamento */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Forma de Pagamento
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <QrCode className={`w-8 h-8 ${paymentMethod === 'pix' ? 'text-primary' : 'text-gray-500'}`} />
                    <span className={`font-medium ${paymentMethod === 'pix' ? 'text-primary' : 'text-gray-700'}`}>
                      Pix
                    </span>
                    <span className="text-xs text-success font-medium">5% de desconto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-500'}`} />
                    <span className={`font-medium ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-700'}`}>
                      Cartão
                    </span>
                    <span className="text-xs text-gray-500">Até 12x sem juros</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'boleto'
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Barcode className={`w-8 h-8 ${paymentMethod === 'boleto' ? 'text-primary' : 'text-gray-500'}`} />
                    <span className={`font-medium ${paymentMethod === 'boleto' ? 'text-primary' : 'text-gray-700'}`}>
                      Boleto
                    </span>
                    <span className="text-xs text-gray-500">Vence em 3 dias</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumo do Pedido
                </h2>

                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frete</span>
                    <span>R$ {freight.toFixed(2)}</span>
                  </div>
                  {paymentMethod === 'pix' && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Desconto Pix (5%)</span>
                      <span>- R$ {(total * 0.05).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-primary">
                      R$ {(paymentMethod === 'pix' ? finalTotal * 0.95 : finalTotal).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                  className="mt-6"
                >
                  Confirmar Pedido
                </Button>

                {/* Security badges */}
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Compra Segura</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span>Entrega Garantida</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
