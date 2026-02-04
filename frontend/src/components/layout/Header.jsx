import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import LoginModal from '../auth/LoginModal'
import RegisterModal from '../auth/RegisterModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const { itemCount } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/produtos?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  const categories = [
    { name: 'Cães', path: '/categoria/caes' },
    { name: 'Gatos', path: '/categoria/gatos' },
    { name: 'Acessórios', path: '/categoria/acessorios' },
    { name: 'Rações', path: '/categoria/racoes' },
  ]

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container-app">
          <div className="flex items-center justify-between h-16">
            {/* Menu Hamburger - Mobile */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="Pet Rações Atacado"
                className="h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <span className="block text-lg font-bold leading-tight">
                  <span className="text-green-600">Pet</span>
                  <span className="text-[#1E3A6E]">Rações</span>
                </span>
                <span className="block text-xs font-semibold text-gray-500 tracking-wider">
                  ATACADO
                </span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-lg mx-8"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Icon - Mobile */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-6 h-6 text-gray-700" />
              </button>

              {/* User */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="p-2 flex items-center gap-2">
                    <User className="w-6 h-6 text-gray-700" />
                    <span className="hidden lg:block text-sm text-gray-700">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="p-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  <User className="w-6 h-6 text-gray-700" />
                </button>
              )}

              {/* Cart */}
              <Link to="/carrinho" className="p-2 relative">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          {isSearchOpen && (
            <form onSubmit={handleSearch} className="md:hidden pb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>
          )}

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8 py-2 border-t border-gray-100">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden bg-white border-t border-gray-100">
            <div className="container-app py-4">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRegisterClick={() => {
          setShowLoginModal(false)
          setShowRegisterModal(true)
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onLoginClick={() => {
          setShowRegisterModal(false)
          setShowLoginModal(true)
        }}
      />
    </>
  )
}
