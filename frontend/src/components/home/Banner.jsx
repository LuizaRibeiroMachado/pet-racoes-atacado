import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const banners = [
  {
    id: 1,
    title: 'Rações Premium',
    subtitle: 'Até 30% OFF em rações selecionadas',
    description: 'Qualidade e nutrição para seu pet com os melhores preços do mercado.',
    buttonText: 'Ver Ofertas',
    buttonLink: '/categoria/racoes',
    bgImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&h=600&fit=crop',
    bgGradient: 'from-[#1E3A6E]/90 to-[#152C54]/90',
  },
  {
    id: 2,
    title: 'Acessórios para Pets',
    subtitle: 'Novidades chegando toda semana',
    description: 'Brinquedos, comedouros, caminhas e muito mais para seu amigo.',
    buttonText: 'Explorar',
    buttonLink: '/categoria/acessorios',
    bgImage: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1600&h=600&fit=crop',
    bgGradient: 'from-emerald-600/90 to-teal-700/90',
  },
  {
    id: 3,
    title: 'Compre no Atacado',
    subtitle: 'Preços especiais para revendedores',
    description: 'Cadastre-se e tenha acesso a preços exclusivos para compras em quantidade.',
    buttonText: 'Saiba Mais',
    buttonLink: '/produtos',
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=600&fit=crop',
    bgGradient: 'from-orange-500/90 to-red-600/90',
  },
]

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full relative"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.bgImage})` }}
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient}`} />

            {/* Content */}
            <div className="relative container-app py-16 md:py-24">
              <div className="max-w-2xl text-white">
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  {banner.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  {banner.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                  {banner.description}
                </p>
                <Link to={banner.buttonLink}>
                  <Button variant="secondary" size="lg" className="shadow-lg">
                    {banner.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        aria-label="Banner anterior"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        aria-label="Próximo banner"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir para banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
