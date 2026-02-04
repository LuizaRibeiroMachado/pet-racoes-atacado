const variants = {
  default: 'bg-white',
  elevated: 'bg-white shadow-md',
  bordered: 'bg-white border border-gray-200',
}

export default function Card({
  children,
  variant = 'bordered',
  padding = 'p-4',
  hoverable = false,
  className = '',
  ...props
}) {
  return (
    <div
      className={`
        rounded-lg
        ${variants[variant]}
        ${padding}
        ${hoverable ? 'transition-shadow duration-200 hover:shadow-lg cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
