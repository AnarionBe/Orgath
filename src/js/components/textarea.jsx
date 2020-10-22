import React from 'react'

export const Textarea =  ({
  className,
  label,
  onChange,
  value,
  placeholder
}) => {
  return (
    <div className={`textarea ${className}`}>
      <label>{label}</label>
      <textarea
        className="textarea__field"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}