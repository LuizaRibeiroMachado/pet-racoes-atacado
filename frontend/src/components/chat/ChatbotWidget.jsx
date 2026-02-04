import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 transition-all origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="bg-primary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Pet Rações</h3>
              <p className="text-xs text-white/80">Atendimento online</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-80 p-4 overflow-y-auto bg-gray-50">
          <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%]">
            <p className="text-sm text-gray-700">
              Olá! Bem-vindo ao Pet Rações Atacado. Como posso ajudá-lo hoje?
            </p>
            <p className="text-xs text-gray-400 mt-1">Agora</p>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500 text-center">
              Sugestões:
            </p>
            {['Horário de funcionamento', 'Formas de pagamento', 'Prazo de entrega'].map((suggestion) => (
              <button
                key={suggestion}
                className="block w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              className="w-10 h-10 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Chatbot em desenvolvimento
          </p>
        </div>
      </div>
    </>
  )
}
