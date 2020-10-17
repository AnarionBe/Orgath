import React from 'react'

export const Input = ({
  className = '',
  label,
  placeholder,
  value,
  onChange
}) => {
  return (
    <div className={`input ${className}`}>
       <label className="input__label">{label}</label>
       <input
        className="input__field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}