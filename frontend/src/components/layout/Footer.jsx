import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="Pet Rações Atacado"
                className="h-12 w-auto object-contain rounded"
              />
              <div>
                <span className="block text-lg font-bold leading-tight">
                  <span className="text-green-400">Pet</span>
                  <span className="text-[#5B8BD4]">Rações</span>
                </span>
                <span className="block text-xs font-semibold text-gray-400 tracking-wider">
                  ATACADO
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              As melhores rações e acessórios para seu pet com preços de atacado.
              Qualidade e economia para quem ama seus animais.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categoria/caes" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Rações para Cães
                </Link>
              </li>
              <li>
                <Link to="/categoria/gatos" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Rações para Gatos
                </Link>
              </li>
              <li>
                <Link to="/categoria/acessorios" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Acessórios
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Todos os Produtos
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                (62) 3901-1359
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                petatacadoderacoes@gmail.com
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                Av. Padre Wendel, 1078<br />Setor São José - Goiânia/GO
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-semibold mb-4">Siga-nos</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/petracoes.atacado"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/556239011359"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Formas de Pagamento</h4>
              <div className="flex gap-2">
                <div className="bg-gray-800 px-3 py-1 rounded text-xs">Pix</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs">Cartão</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs">Boleto</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Pet Rações Atacado. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
