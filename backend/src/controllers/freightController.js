// Simulated freight calculation based on CEP ranges
// In production, integrate with Correios API or shipping providers

const freightTable = {
  // São Paulo (01000-19999)
  sp: { basePrice: 15.90, daysMin: 2, daysMax: 4 },
  // Rio de Janeiro, Minas Gerais, Espírito Santo (20000-39999)
  sudeste: { basePrice: 22.90, daysMin: 3, daysMax: 6 },
  // Sul (80000-99999)
  sul: { basePrice: 25.90, daysMin: 4, daysMax: 7 },
  // Centro-Oeste (70000-79999)
  centroOeste: { basePrice: 29.90, daysMin: 5, daysMax: 8 },
  // Nordeste (40000-69999)
  nordeste: { basePrice: 34.90, daysMin: 6, daysMax: 10 },
  // Norte (65000-69999, some ranges)
  norte: { basePrice: 39.90, daysMin: 8, daysMax: 15 },
}

function getRegion(cep) {
  const cepNum = parseInt(cep)

  if (cepNum >= 1000 && cepNum <= 19999) return 'sp'
  if (cepNum >= 20000 && cepNum <= 39999) return 'sudeste'
  if (cepNum >= 40000 && cepNum <= 65999) return 'nordeste'
  if (cepNum >= 66000 && cepNum <= 69999) return 'norte'
  if (cepNum >= 70000 && cepNum <= 76999) return 'centroOeste'
  if (cepNum >= 77000 && cepNum <= 77999) return 'norte'
  if (cepNum >= 78000 && cepNum <= 79999) return 'centroOeste'
  if (cepNum >= 80000 && cepNum <= 99999) return 'sul'

  return 'sudeste' // Default
}

// POST /api/freight/calculate
export function calculateFreight(req, res) {
  try {
    const { cep } = req.body

    if (!cep || cep.length !== 8) {
      return res.status(400).json({ message: 'CEP inválido' })
    }

    const region = getRegion(cep)
    const baseFreight = freightTable[region]

    // Calculate options
    const options = [
      {
        name: 'PAC',
        price: baseFreight.basePrice,
        days: `${baseFreight.daysMin} a ${baseFreight.daysMax}`,
      },
      {
        name: 'SEDEX',
        price: baseFreight.basePrice * 1.8,
        days: `${Math.max(1, baseFreight.daysMin - 1)} a ${baseFreight.daysMax - 2}`,
      },
    ]

    // Free shipping for orders above R$ 299 (only for PAC)
    const freeShippingThreshold = 299

    res.json({
      cep,
      options,
      freeShippingThreshold,
      message: `Frete grátis para compras acima de R$ ${freeShippingThreshold.toFixed(2)}`,
    })
  } catch (error) {
    console.error('Freight error:', error)
    res.status(500).json({ message: 'Erro ao calcular frete' })
  }
}
