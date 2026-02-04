import { Truck, ShieldCheck, CreditCard, Headphones } from 'lucide-react'
import Banner from '../components/home/Banner'
import Categories from '../components/home/Categories'
import FeaturedProducts from '../components/home/FeaturedProducts'

const benefits = [
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Entregamos para todo o Brasil',
  },
  {
    icon: ShieldCheck,
    title: 'Compra Segura',
    description: 'Seus dados protegidos',
  },
  {
    icon: CreditCard,
    title: 'Parcelamento',
    description: 'Em até 12x sem juros',
  },
  {
    icon: Headphones,
    title: 'Suporte',
    description: 'Atendimento especializado',
  },
]

export default function HomePage() {
  return (
    <div>
      <Banner />
      <Categories />
      <FeaturedProducts />

      {/* Benefits Section */}
      <section className="py-8 md:py-12">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="text-center p-4"
                >
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 md:py-12 bg-primary">
        <div className="container-app text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Receba ofertas exclusivas
          </h2>
          <p className="text-white/80 mb-6">
            Cadastre-se e receba promoções diretamente no seu email
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Seu email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
