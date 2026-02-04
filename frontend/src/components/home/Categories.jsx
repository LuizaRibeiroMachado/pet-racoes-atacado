import { Link } from 'react-router-dom'
import { Dog, Cat, Package, ShoppingBag } from 'lucide-react'

const categories = [
  {
    id: 'caes',
    name: 'Cães',
    description: 'Rações e snacks',
    icon: Dog,
    color: 'bg-amber-100 text-amber-600',
    path: '/categoria/caes',
  },
  {
    id: 'gatos',
    name: 'Gatos',
    description: 'Rações e petiscos',
    icon: Cat,
    color: 'bg-purple-100 text-purple-600',
    path: '/categoria/gatos',
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    description: 'Brinquedos e mais',
    icon: Package,
    color: 'bg-green-100 text-green-600',
    path: '/categoria/acessorios',
  },
  {
    id: 'racoes',
    name: 'Todas Rações',
    description: 'Premium e standard',
    icon: ShoppingBag,
    color: 'bg-blue-100 text-blue-600',
    path: '/categoria/racoes',
  },
]

export default function Categories() {
  return (
    <section className="py-8 md:py-12">
      <div className="container-app">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Categorias
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                to={category.path}
                className="group p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
