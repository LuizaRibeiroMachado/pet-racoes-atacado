import { useState } from 'react'
import { Truck, Loader2 } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import api from '../../services/api'

export default function FreightCalculator({ onFreightCalculated }) {
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  const handleCepChange = (e) => {
    setCep(formatCep(e.target.value))
    setResult(null)
    setError('')
  }

  const handleCalculate = async () => {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8) {
      setError('CEP inválido')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await api.post('/freight/calculate', { cep: cleanCep })
      setResult(response.data)
      if (onFreightCalculated) {
        onFreightCalculated(response.data.price)
      }
    } catch (err) {
      setError(err.message || 'Erro ao calcular frete')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
        <Truck className="w-5 h-5 text-gray-600" />
        Calcular Frete
      </h4>

      <div className="flex gap-2">
        <Input
          placeholder="00000-000"
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
          error={error}
        />
        <Button
          onClick={handleCalculate}
          disabled={cep.replace(/\D/g, '').length !== 8}
          loading={loading}
        >
          Calcular
        </Button>
      </div>

      {result && (
        <div className="mt-4 space-y-2">
          {result.options?.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{option.name}</p>
                <p className="text-sm text-gray-500">{option.days} dias úteis</p>
              </div>
              <p className="font-bold text-primary">R$ {option.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      <a
        href="https://buscacepinter.correios.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-primary hover:underline mt-2 inline-block"
      >
        Não sei meu CEP
      </a>
    </div>
  )
}
