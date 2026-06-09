function Input({ label, value, onChange, type = 'text', placeholder = '', className = '' }) {
  return (
    <label className={`input-group ${className}`}>
      {label && <span className="input-label">{label}</span>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  )
}

export default Input
