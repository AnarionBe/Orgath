import React from 'react'

export const Input = ({
  className = '',
  label,
  placeholder,
  value,
  onChange,
  type = 'text'
}) => {
  return (
    <div className={`input ${className} ${type}`}>
       <label className="input__label">{label}</label>
       <input
        className="input__field"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        type={type}
      />
    </div>
  );
}