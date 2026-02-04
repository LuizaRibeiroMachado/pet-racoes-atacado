import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'pet-racoes-secret-key-2024'

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' })
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({ message: 'Token mal formatado' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: 'Token mal formatado' })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' })
    }
    return res.status(401).json({ message: 'Token inválido' })
  }
}
